import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, "kakao") {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>("KAKAO_CLIENT_ID"),
      clientSecret: configService.get<string>("KAKAO_CLIENT_SECRET"),
      callbackURL: configService.get<string>("KAKAO_CALLBACK_URL"),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any) => void,
  ) {
    try {
      const { id, username, _json } = profile;
      const user = {
        provider: "kakao",
        providerId: id,
        email: _json.kakao_account?.email,
        name: username,
        accessToken,
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
