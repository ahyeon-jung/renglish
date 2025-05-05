import * as bcrypt from "bcrypt";

import { Injectable, UnauthorizedException } from "@nestjs/common";

import { ConfigService } from "@nestjs/config";
import { ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("REFRESH_TOKEN_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    if (!token) {
      throw new UnauthorizedException("No token provided");
    }

    const user = await this.userService.findUserById(payload.sub);
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException("User not found or token not set");
    }

    const isMatch = await bcrypt.compare(token, user.hashedRefreshToken);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    return user;
  }
}
