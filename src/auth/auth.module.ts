import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosRepository } from 'src/usuarios/usuarios.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Constants } from 'src/common/constants';
import { JWtStrategy } from './jwt.strategy';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(Constants.VARS_ENV.JWT.SECRET),
        signOptions: {
          expiresIn: 3600, // 1 hora
        },
      }),
    }),
    TypeOrmExModule.forCustomRepository([UsuariosRepository]),
  ],
  providers: [AuthService, JWtStrategy],
  controllers: [AuthController],
  exports: [JWtStrategy, PassportModule],
})
export class AuthModule {}
