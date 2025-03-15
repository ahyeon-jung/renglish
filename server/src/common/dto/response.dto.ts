export class ResponseDto<T> {
  statusCode: number;
  message: string;
  data?: T;
  error?: any;

  constructor(statusCode: number, message: string, data?: T, error?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
