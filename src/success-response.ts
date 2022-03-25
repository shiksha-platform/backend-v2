import { Expose } from "class-transformer";

export class SuccessResponse {
  @Expose()
  statusCode: number;

  @Expose()
  message: string;

  @Expose()
  data: object;

  constructor(partial: Partial<SuccessResponse>) {
    Object.assign(this, partial);
  }
}
