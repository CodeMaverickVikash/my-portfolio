export default () => ({
  port: Number(process.env.PORT || 3001),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtRefreshSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET || process.env.JWT_SECRET || "",
  jwtAccessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRE || "15m",
  jwtRefreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRE || "7d",
  clientUrl: process.env.CLIENT_URL || "",
});
