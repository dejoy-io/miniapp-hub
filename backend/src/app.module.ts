import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPlugin } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Context, Telegraf } from "telegraf";
import {
  DateTimeTypeDefinition,
  DateTimeResolver,
  JSONDefinition,
  JSONResolver,
} from "graphql-scalars";
import { GraphQLModule } from "@nestjs/graphql";
import { I18nModule, I18nYamlLoader } from "nestjs-i18n-telegraf";
import { Logger, LoggerModule } from "nestjs-pino";
import { Module } from "@nestjs/common";
import { NoSchemaIntrospectionCustomRule } from "graphql";
import { TelegrafModule } from "nestjs-telegraf";
import path, { join } from "path";
import { AppConfig, validateAppConfig } from "./app.config";
import { AuthModule } from "./auth/auth.module";
import { BotModule } from "./bot/bot.module";
import { TelegrafResolver } from "./i18n/i18n.resolver";
import { ThrottleModule } from "./throttle/throttle.module";
import { RedisModule, RedisModuleOptions} from 'nestjs-redis'

@Module({
  imports: [
    LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateAppConfig,
    }),
    /*
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const host = configService.get<AppConfig["REDIS_HOST"]>("REDIS_HOST", "127.0.0.1")
        const port = configService.get<AppConfig["REDIS_PORT"]>("REDIS_PORT", "6379") as unknown as number

        return {
          host,
          port,
        } as RedisModuleOptions;
      },
      //useFactory: async (configService: ConfigService) => configService.get('redis'),
      inject:[ConfigService],
    }),
    */
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        let plugins: ApolloServerPlugin<any>[] = [];

        if (
          configService.get<AppConfig["GRAPHQL_ENABLE_IDE"]>(
            "GRAPHQL_ENABLE_IDE",
          )
        ) {
          plugins.push(ApolloServerPluginLandingPageLocalDefault({}));
        }

        const validationRules: any[] = [];
        if (
          !configService.get<AppConfig["GRAPHQL_ENABLE_INTROSPECTION"]>(
            "GRAPHQL_ENABLE_INTROSPECTION",
          )
        ) {
          validationRules.push(NoSchemaIntrospectionCustomRule);
        }

        return {
          playground: false,
          autoSchemaFile: join(process.cwd(), "src/schema.gql"),
          sortSchema: true,
          plugins,
          validationRules,
          typeDefs: [DateTimeTypeDefinition, JSONDefinition],
          resolvers: { DateTime: DateTimeResolver, JSON: JSONResolver },
          cors: {
            credentials: true,
            origin: "*",
          },
          context: ({ req, res }) => ({ req, res }),
        };
      },
      inject: [ConfigService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: "en",
      loaderOptions: {
        path: path.join(__dirname, "/i18n/locales/"),
        watch: true,
      },
      logging: true,
      loader: I18nYamlLoader,
      resolvers: [TelegrafResolver],
      typesOutputPath: path.join(__dirname, "../src/i18n/i18n.generated.ts"),
      disableMiddleware: true,
    }),
    /*
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService, logger: Logger) => {
        const TELEGRAM_TEST_SERVER = configService.get<
          AppConfig["TELEGRAM_TEST_SERVER"]
        >("TELEGRAM_TEST_SERVER")!;
        const BOT_TOKEN =
          configService.get<AppConfig["BOT_TOKEN"]>("BOT_TOKEN")!;
        const BOT_WEBHOOK_DOMAIN =
          configService.get<AppConfig["BOT_WEBHOOK_DOMAIN"]>(
            "BOT_WEBHOOK_DOMAIN",
          );
        const BOT_WEBHOOK_PATH =
          configService.get<AppConfig["BOT_WEBHOOK_PATH"]>("BOT_WEBHOOK_PATH");
        const BOT_WEBHOOK_SECRET_TOKEN = configService.get<
          AppConfig["BOT_WEBHOOK_SECRET_TOKEN"]
        >("BOT_WEBHOOK_SECRET_TOKEN");

        const launchOptions: Telegraf.LaunchOptions = {
          dropPendingUpdates: true,
          allowedUpdates: ["message"],
        };

        if (BOT_WEBHOOK_DOMAIN && BOT_WEBHOOK_PATH) {
          launchOptions.webhook = {
            domain: BOT_WEBHOOK_DOMAIN,
            hookPath: BOT_WEBHOOK_PATH,
            secretToken: BOT_WEBHOOK_SECRET_TOKEN,
          };
        }

        return {
          token: BOT_TOKEN + (TELEGRAM_TEST_SERVER ? "/test" : ""),
          middlewares: [
            async (ctx: Context, next) => {
              if (
                ctx.chat === undefined ||
                ctx.chat.type === "group" ||
                ctx.chat.type === "supergroup"
              ) {
                return;
              }

              await next();
            },
            async (ctx: Context, next) => {
              const now = () => {
                const ts = process.hrtime();
                return ts[0] * 1e3 + ts[1] / 1e6;
              };
              const start = now();

              await next();

              const end = now();
              logger.log({
                update: ctx.update,
                responseTime: end - start,
              });
            },
          ],
          launchOptions: launchOptions,
        };
      },
      inject: [ConfigService, Logger],
    }),
    */
    ThrottleModule,
    AuthModule,
    BotModule,
  ],
})
export class AppModule {}
