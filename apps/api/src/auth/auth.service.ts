import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcryptjs";

import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateAccessToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("jwtSecret"),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        throw new UnauthorizedException({
          success: false,
          message: "User not found",
          code: "USER_NOT_FOUND",
        });
      }

      if (!user.isActive) {
        throw new UnauthorizedException({
          success: false,
          message: "User account is deactivated",
          code: "ACCOUNT_DEACTIVATED",
        });
      }

      return {
        userId: user.id,
        email: user.email,
        role: user.role,
      };
    } catch {
      throw new UnauthorizedException({
        success: false,
        message: "Access token expired. Please refresh your token.",
        code: "TOKEN_EXPIRED",
      });
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isActive) {
      throw new UnauthorizedException({
        success: false,
        message: "Account is deactivated",
      });
    }

    const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException({
        success: false,
        message: "Invalid credentials",
      });
    }

    const tokens = await this.generateTokens(user);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      success: true,
      message: "Login successful",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.toSafeUser(user),
    };
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException({
        success: false,
        message: "Refresh token is required",
      });
    }

    let payload: { id: string };

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>("jwtRefreshSecret"),
      });
    } catch {
      throw new UnauthorizedException({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException({
        success: false,
        message: "Invalid refresh token",
      });
    }

    if (!user.isActive) {
      throw new UnauthorizedException({
        success: false,
        message: "Account is deactivated",
      });
    }

    const tokens = await this.generateTokens(user);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      success: true,
      message: "Token refreshed successfully",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: "User not found",
      });
    }

    return {
      success: true,
      user: this.toSafeUser(user),
    };
  }

  async logout(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
      });
    }

    return {
      success: true,
      message: "Logged out successfully",
    };
  }

  private async generateTokens(user: {
    id: string;
    email: string;
    role: string;
  }) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("jwtSecret"),
      expiresIn: this.configService.get("jwtAccessTokenExpire") as any,
    } as any);

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("jwtRefreshSecret"),
      expiresIn: this.configService.get("jwtRefreshTokenExpire") as any,
    } as any);

    return { accessToken, refreshToken };
  }

  private toSafeUser(user: {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
  }) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
