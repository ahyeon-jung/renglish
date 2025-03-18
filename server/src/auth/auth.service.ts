import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";

import { ChangePasswordDto } from "./dto/update-auth.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const isExistAccount = await this.userService.checkEmailExist(email);
    if (isExistAccount) {
      throw new BadRequestException("already account");
    }

    const user = new User();
    user.email = email;
    user.password = password;

    return this.userService.create(user);
  }

  async login(
    loginAuthDto: LoginDto
  ): Promise<{ token: string; email: string }> {
    const { email, password } = loginAuthDto;

    const isExistAccount = await this.userService.checkEmailExist(email);
    if (!isExistAccount) {
      throw new NotFoundException("no account");
    }

    const isVerifyAccount = this.verifyPassword({ email, password });
    if (!isVerifyAccount) {
      throw new UnauthorizedException("wrong password");
    }

    const token = "123456789";
    return { token, email };
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<string> {
    const { email, newPassword } = changePasswordDto;

    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException("no account");
    }

    await this.userService.updatePassword(user.id, newPassword);

    return "change password success";
  }

  async verifyPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> {
    console.log(email, password);
    return true;
  }
}
