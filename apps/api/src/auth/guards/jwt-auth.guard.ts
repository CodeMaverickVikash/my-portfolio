import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { AuthService } from "../auth.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException({
        success: false,
        message: "Not authorized to access this route. Please login.",
        code: "NO_TOKEN",
      });
    }

    const token = authHeader.split(" ")[1];
    request.user = await this.authService.validateAccessToken(token);
    return true;
  }
}
