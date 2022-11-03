import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosRepository } from '../usuarios/usuarios.repository';
import { LoginDto } from './dto/login.dto';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsuariosRepository)
    private usuarioRepository: UsuariosRepository,
    private jwtService: JwtService,
  ) {}

  async login(datos: LoginDto): Promise<AuthDto> {
    const { usuario, password } = datos;
    const user = await this.usuarioRepository.findOneBy({ email: usuario });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payLoad: JwtPayLoad = { id: user.id, email: user.email };
      const accessToken: string = this.jwtService.sign(payLoad);
      return { accessToken, message: 'Bienvenido', statusCode: 200 };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
