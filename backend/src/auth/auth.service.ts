import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppConfig } from "../app.config";
import { InitData, createWebAppSecret, decodeInitData, verifyTelegramWebAppInitData, } from "./auth.utils";
import { JwtPayload, JwtSubject } from "./strategies/jwt.strategy";


@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}


  validateMiniAppInitData(raw: string): InitData {
    const token = this.configService.get<AppConfig["BOT_TOKEN"]>("BOT_TOKEN")!;
    const initData = decodeInitData(raw);
    const secretKey = createWebAppSecret(token);

    if (!verifyTelegramWebAppInitData(initData, secretKey)) {
      throw new Error("Invalid init data");
    }

    return initData;
  }

  async createAccessToken(user: JwtPayload["sub"]): Promise<string> {
    const payload: JwtPayload = { sub: user };
    return await this.jwtService.signAsync(payload);
  }

  async getOrCreateUser(user: JwtSubject) {
    console.log('getOrCreateUser user: ', user)

    if (this.configService.get<AppConfig["NODE_ENV"]>("NODE_ENV") ===
      "development"
    ) {
      return {
        id: 123,
        firstName: "mock",
        username: "mock",
        language_code: "zh",
        start_param: "start_param"
      }
    }

    return {}
    /*
    return await this.userModel.findOneAndUpdate({_id: user.id}, {
      $set: {
        firstName: user.firstName,
        lastName: user.last_name,
        username: user.username,
        isPremium: user.is_premium,
        languageCode: user.language_code,
      }
    }, {
      upsert: true,
    }).lean()
    */
  }
}
