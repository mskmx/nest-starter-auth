import {
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from './entities';

export class Auditoria {
  @CreateDateColumn({ name: 'fecha_c' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_m', nullable: true })
  fechaModificacion: Date;

  @ManyToOne(() => Usuario, (userMod) => userMod.auditorias, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_usuario_c' })
  usuarioCreacion: Usuario;

  @ManyToOne(() => Usuario, (userMod) => userMod.auditorias, { nullable: true })
  @JoinColumn({ name: 'id_usuario_m' })
  usuarioModifacion: Usuario;
}
