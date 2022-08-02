import { Expose } from "class-transformer";

export class ErrorResponse {
  @Expose()
  errorCode: string;

  @Expose()
  errorMessage: string;

  constructor(partial: Partial<ErrorResponse>) {
    Object.assign(this, partial);
  }
}
