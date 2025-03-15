import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";

import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ResponseDto } from "../dto/response.dto";
import { map } from "rxjs/operators";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return new ResponseDto(200, "Request successful", data);
      })
    );
  }
}
