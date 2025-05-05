import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OptionalTokenGuard extends AuthGuard("jwt") {
  handleRequest(_: any, user: any) {
    return user ?? null;
  }
}
