import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegistroDto } from '../auth/dto/registro.dto';
import { Usuario } from '../common/entities/usuario.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from '../database/typeorm-ex.decorator';

@CustomRepository(Usuario)
export class UsuariosRepository extends Repository<Usuario> {
  async createUser(
    registro: RegistroDto,
    tipoUsuario: number,
  ): Promise<Usuario> {
    const { email, password } = registro;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const usuario: Usuario = new Usuario({
      email,
      password: hashedPassword,
      tipoUsuario,
      activo: true,
    });

    try {
      return await this.save(usuario);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
