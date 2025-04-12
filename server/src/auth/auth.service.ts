import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  Redirect,
  UnauthorizedException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';
import { ChangePasswordDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { EncryptionService } from './encryption.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { ExcludedPasswordUser } from '../user/types/excluded-password-user';
import { PasswordResetDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email, password, nickname, how, provider } = createUserDto;

    const isExistAccount = await this.userService.checkEmailExist(email);
    if (isExistAccount) {
      throw new BadRequestException('already account');
    }
    if (provider === 'email') {
      const redisStatus = await this.cacheManager.get(email);
      if (redisStatus !== this.configService.get('EMAIL_VERIFICATION_PASS')) {
        throw new NotFoundException('not found verification email');
      }
    }

    const hashedPassword = await this.encryptionService.hashPassword(password);

    const user = new User();
    user.provider = provider ?? 'email';
    user.email = email;
    user.password = hashedPassword;
    user.nickname = nickname;
    user.how = how;

    return this.userService.create(user);
  }

  async generateTokens({
    id,
    email,
  }: {
    id: string;
    email: string;
  }): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: id, email: email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshToken(id, hashedRefreshToken);

    return { accessToken, refreshToken };
  }

  public async getAuthenticatedUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findUserByEmailWithPassword(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordMatched = await this.encryptionService.comparePassword(password, user.password);
    if (!isPasswordMatched) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<ExcludedPasswordUser> {
    const user = await this.userService.findUserByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException(`${email} not found`);
    }
    
    const isPasswordValid = await this.encryptionService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 일치하지 않습니다.');
    }

    return user;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const { accessToken, refreshToken } = await this.generateTokens({
      id: user.id,
      email: user.email,
    });
   
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateSocialUser(data: {
    provider: string;
    providerId: string;
    email: string;
    name: string;
  }): Promise<ExcludedPasswordUser | typeof Redirect> {
    const { provider, providerId, email, name } = data;
    let user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async googleLogin(req: any) {
    if (!req.user) {
      throw new UnauthorizedException('No user from Google');
    }

    const user = await this.userService.findUserByEmailWithPassword(req.user.email);
    if (user) {
      return this.login({ email: user.email, password: user.password });
    }

    const password = Math.random().toString(36).slice(-8);
    const newUser = await this.userService.create({
      provider: 'google',
      email: req.user.email,
      password: password,
      nickname: req.user.name,
    });

    return this.login({ email: newUser.email, password });
  }

  async signupSocial(createUserDto: CreateUserDto) {
    const user = await this.userService.findUserByEmail(createUserDto.email);
    if (!user) {
      throw new NotFoundException(`User with Email ${createUserDto.email} not found`);
    }

    const password = Math.random().toString(36).slice(-8);
    const newUser = await this.userService.create({
      provider: createUserDto.provider,
      email: createUserDto.email,
      password: password,
      nickname: createUserDto.nickname,
    });

    return this.login({ email: newUser.email, password });
  }

  async passwordReset(passwordResetDto: PasswordResetDto) {
    const { email, password } = passwordResetDto;

    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const hashedPassword = await this.encryptionService.hashPassword(password);
    await this.userService.updatePassword(user.id, hashedPassword);
   
    return "Password reset successfully";
  }
}
