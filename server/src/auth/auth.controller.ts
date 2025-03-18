import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { ChangePasswordDto } from "./dto/update-auth.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @ApiOperation({
    summary: "회원가입",
    description: "새로운 사용자를 생성합니다.",
  })
  @ApiResponse({ status: 201, description: "회원가입 성공" })
  @ApiResponse({ status: 400, description: "잘못된 요청 데이터" })
  @ApiBody({ type: CreateUserDto })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post("login")
  @ApiOperation({
    summary: "로그인",
    description: "사용자가 로그인을 시도합니다.",
  })
  @ApiResponse({ status: 200, description: "로그인 성공" })
  @ApiResponse({ status: 401, description: "인증 실패" })
  @ApiBody({ type: LoginDto })
  login(@Body() loginAuthDto: LoginDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post("password/change")
  @ApiOperation({
    summary: "비밀번호 변경",
    description: "사용자가 비밀번호 변경을 시도합니다.",
  })
  @ApiResponse({ status: 200, description: "비밀번호 변경 성공" })
  @ApiBody({ type: ChangePasswordDto })
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}
