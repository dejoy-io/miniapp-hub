import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { AppConfig } from "../app.config";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<AppConfig["JWT_SECRET"]>("JWT_SECRET")!;
        const algorithm =
          configService.get<AppConfig["JWT_ALGORITHM"]>("JWT_ALGORITHM")!;
        const expiresIn =
          configService.get<AppConfig["JWT_EXPIRES_IN"]>("JWT_EXPIRES_IN")!;

        return {
          secret: secret,
          signOptions: {
            algorithm,
            expiresIn,
          },
          verifyOptions: {
            algorithms: [algorithm],
            ignoreExpiration: false,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, AuthResolver, AuthService],
})
export class AuthModule {}
