import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Constants } from './common/constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        name: 'api-connection',
        type: 'postgres',
        host: configService.get(Constants.VARS_ENV.DATABASE.HOST),
        port: configService.get<number>(Constants.VARS_ENV.DATABASE.PORT),
        username: configService.get(Constants.VARS_ENV.DATABASE.USER),
        password: configService.get(Constants.VARS_ENV.DATABASE.PASS),
        database: configService.get(Constants.VARS_ENV.DATABASE.SCHEMA),
        entities: [__dirname + '/common/entities/*{.entity,.view}{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    AuthModule,
  ],
})
export class AppModule {}
