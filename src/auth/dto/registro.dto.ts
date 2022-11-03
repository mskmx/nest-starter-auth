import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegistroDto {
  @IsString()
  @MinLength(4)
  readonly nombre: string;

  @IsString()
  @MinLength(4)
  readonly aPaterno: string;
  readonly aMaterno: string;

  @IsString()
  @MinLength(4)
  readonly email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too week',
  })
  readonly password: string;

  public constructor(init?: Partial<RegistroDto>) {
    Object.assign(this, init);
  }
}
