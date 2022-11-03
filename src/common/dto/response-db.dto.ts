export class ResponseDB {
  readonly message: string;
  readonly success: boolean;
  readonly statusCode: number;

  public constructor(init?: Partial<ResponseDB>) {
    Object.assign(this, init);
  }
}
