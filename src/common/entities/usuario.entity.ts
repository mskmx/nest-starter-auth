import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Auditoria } from './entities';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'tipo_usuario', nullable: true })
  tipoUsuario: number;

  @Column()
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_c' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_m', nullable: true })
  fechaModificacion: Date;

  auditorias: Auditoria[];

  public constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
  }
}
