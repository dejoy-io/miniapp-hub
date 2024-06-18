import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { GqlThrottlerGuard as ThrottlerGuard } from './guards/throttler.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import Redis from 'ioredis';
import { AppConfig } from 'src/app.config';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        let storage;
        if (configService.get<AppConfig["NODE_ENV"]>("NODE_ENV") !== "development") {
          const redisMode = configService.get<AppConfig["REDIS_MODE"]>("REDIS_MODE", "standalone")

          switch (redisMode) {
            case 'cluster': { 
              const host = configService.get<AppConfig["REDIS_HOST"]>("REDIS_HOST", "127.0.0.1")
              const password = configService.get<AppConfig["REDIS_PASSWORD"]>("REDIS_PASSWORD") 

              const nodes = host.split(',').map((node) => {
                const [host, port] = node.split(':');
                return {
                  host,
                  port: parseInt(port, 10),
                  password,
                }; 
              })

              storage = new ThrottlerStorageRedisService(
                new Redis.Cluster(nodes),
              );
              break;
            }
            default: {
              const host = configService.get<AppConfig["REDIS_HOST"]>("REDIS_HOST", "127.0.0.1")
              const port = configService.get<AppConfig["REDIS_PORT"]>("REDIS_PORT", 6379)
              const password = configService.get<AppConfig["REDIS_PASSWORD"]>("REDIS_PASSWORD")
              const db = configService.get<AppConfig["REDIS_DB"]>("REDIS_DB", 0)
        
              storage = new ThrottlerStorageRedisService(
                new Redis({
                  host: host,
                  port: port,
                  password: password,
                  db: db,
                }),
              );
              break;
            }
          }  
        }

        return {
          throttlers: [
            {
              ttl: +configService.get('throttler.ttl', 30 * 1000),
              limit: +configService.get('throttler.limit', 100),
            }
          ],
          storage,
        }
      },
    }),
  ],

  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class ThrottleModule {}