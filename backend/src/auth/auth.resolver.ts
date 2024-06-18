import { ConfigService } from "@nestjs/config";
import { Resolver, Mutation, Args, Context, Query, GraphQLExecutionContext, } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import dayjs from "dayjs";
import { AppConfig } from "../app.config";
import { AuthenticateInput } from "./dto/authenticate.input";
import { AuthService } from "./auth.service";
import { InjectJwtSubject } from "./auth.decorators";
import { JwtAuthGuard } from "./auth.guard";
import { JwtSubject } from "./strategies/jwt.strategy";
import { User } from "./entities/user.entity";
import { AuthenticationResult } from "./entities/authentication.entity";


@Resolver()
export class AuthResolver {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: "user" })
  async getUser(@InjectJwtSubject() user: JwtSubject) {
    return await this.authService.getOrCreateUser(user);
  }

  @Mutation(() => AuthenticationResult)
  async authenticate(
    @Args("input") input: AuthenticateInput,
    @Context() context: GraphQLExecutionContext,
  ) {
    try {
      if (this.configService.get<AppConfig["NODE_ENV"]>("NODE_ENV") ===
          "development"
      ) {
        const user = {
          id: 123,
          firstName: "mock",
          username: "mock",
          language_code: "zh",
          start_param: "start_param"
        }

        const jwt = await this.authService.createAccessToken({
          id: user?.id,
          firstName: user?.firstName,
          username: user?.username,
          language_code: user?.language_code,
          start_param: user?.start_param,
        });
        const domain = this.configService.get<AppConfig["DOMAIN"]>("DOMAIN")!;
  
        // @ts-expect-error Response injects to context using `context: ({ req, res }) => ({ req, res })`
        // in GraphQLModule.forRootAsync<ApolloDriverConfig> configuration
        context?.res?.cookie("miniapp_jwt", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24,
          domain,
        });
        return {
          success: true,
          token: jwt,
        };
      }
      
      const { user, auth_date } = this.authService.validateMiniAppInitData(
        input.initDataRaw,
      );

      if (
        (auth_date == null ||
          dayjs.unix(auth_date).isAfter(dayjs().add(1, "minute"))) &&
        this.configService.get<AppConfig["NODE_ENV"]>("NODE_ENV") !==
          "development"
      ) {
        return {
          success: false,
        };
      }

      const jwt = await this.authService.createAccessToken({
        id: user?.id,
        firstName: user?.firstName,
        username: user?.username,
        is_premium: user?.is_premium,
        language_code: user?.language_code,
        start_param: user?.start_param,
      });
      const domain = this.configService.get<AppConfig["DOMAIN"]>("DOMAIN")!;

      // @ts-expect-error Response injects to context using `context: ({ req, res }) => ({ req, res })`
      // in GraphQLModule.forRootAsync<ApolloDriverConfig> configuration
      
      // XXX According to the Telegram miniapp specification, miniapps are not allowed to record cookies on the client side. 
      context?.res?.cookie("miniapp_jwt", jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 1,
        domain,
      });

      return {
        success: true,
        token: jwt,
      };
    } catch {
      return {
        success: false,
      };
    }
  }
}
