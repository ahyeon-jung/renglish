import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';
import { ChangePasswordDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { EncryptionService } from './encryption.service';
import * as bcrypt from 'bcrypt';

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
    const { email, password } = createUserDto;

    const isExistAccount = await this.userService.checkEmailExist(email);
    if (isExistAccount) {
      throw new BadRequestException('already account');
    }

    const redisStatus = await this.cacheManager.get(email);
    if (redisStatus !== this.configService.get('EMAIL_VERIFICATION_PASS')) {
      throw new NotFoundException('not found verification email');
    }

    const hashedPassword = await this.encryptionService.hashPassword(password);

    const user = new User();
    user.email = email;
    user.password = hashedPassword;

    return this.userService.create(user);
  }

  async login(loginAuthDto: LoginDto) {
    const { email, password } = loginAuthDto;
    const user = await this.userService.findUserByEmailWithPassword(email);
    if (!user) {
      throw new NotFoundException('no account');
    }

    const isVerifyAccount = await this.encryptionService.comparePassword(password, user.password);
    if (!isVerifyAccount) {
      throw new UnauthorizedException('wrong password');
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);

    return { accessToken, refreshToken, email };
  }

  async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '30s',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshToken(user.id, hashedRefreshToken);

    return { accessToken, refreshToken };
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<string> {
    const { email, newPassword } = changePasswordDto;

    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('no account');
    }

    const hashedNewPassword = await this.encryptionService.hashPassword(newPassword);

    await this.userService.updatePassword(user.id, hashedNewPassword);

    return 'change password success';
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

  async validateToken(token: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.sub;

      const user = await this.userService.findUserById(userId);
      return !!user;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async getUserFromToken(token: string): Promise<Omit<User, 'password'>> {
    try {
      const decoded = this.jwtService.verify(token);
      const userId = decoded.sub;

      const user = await this.userService.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
