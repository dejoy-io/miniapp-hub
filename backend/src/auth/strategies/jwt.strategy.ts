import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Inject } from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';
import { PassportStrategy } from '@nestjs/passport';
import { AppConfig } from '../../app.config';

export interface JwtSubject {
  id: number;
  firstName: string
  last_name?: string
  username?: string
  is_premium?: boolean
  start_param?: string
  language_code: string
}

export type JwtPayload = {
  sub?: JwtSubject;
  exp?: number;
  iat?: number;
};

export function buildExtractorFromCookies(cookie_name: string) {
  return (request): string | null => {
    return request?.cookies[cookie_name] || null;
  };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    const publicKey = configService.get<AppConfig["JWT_PUBLICKEY"]>("JWT_PUBLICKEY")!;
    super({
      secretOrKey: publicKey,
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        buildExtractorFromCookies('miniapp_jwt'),
      ]),
    });
  }

  validate(payload: JwtPayload) {
    const { sub } = payload;
    if (sub === undefined) {
      throw new JsonWebTokenError('JsonWebTokenError: subject is undefined.');
    }

    return sub;
  }
}
