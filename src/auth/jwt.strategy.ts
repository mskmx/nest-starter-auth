import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Constants } from '../common/constants';
import { Usuario } from '../common/entities/usuario.entity';
import { UsuariosRepository } from '../usuarios/usuarios.repository';
import { JwtPayLoad } from './jwt-payload.interface';

@Injectable()
export class JWtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsuariosRepository)
    private usuarioRepository: UsuariosRepository,
    readonly config: ConfigService,
  ) {
    super({
      secretOrKey: config.get(Constants.VARS_ENV.JWT.SECRET, ''),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayLoad): Promise<Usuario> {
    const { id, email } = payload;
    const user: Usuario = await this.usuarioRepository.findOneBy({ id, email });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
