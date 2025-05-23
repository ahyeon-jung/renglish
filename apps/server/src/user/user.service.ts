import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { findAllWithPagination, PaginationResponse } from 'src/common/utils/pagination.util';
import { PaginationParams } from 'src/common/dto/pagination-params.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExcludedPasswordUser } from './types/excluded-password-user';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async checkIsSocialAccountByEmail(email: string, provider: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email, provider },
    });
    return user ?? null;
  }

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.userRepository.save(createUserDto);
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const result = await this.userRepository.update(userId, {
      password: newPassword,
    });

    if (result.affected === 0) {
      throw new NotFoundException('User not found or password update failed');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ExcludedPasswordUser> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.update(id, updateUserDto);
    return this.findUserById(id);
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const result = await this.userRepository.update(userId, {
      hashedRefreshToken: refreshToken,
    });

    if (result.affected === 0) {
      throw new NotFoundException('User not found or password update failed');
    }
  }

  async findAll(params: PaginationParams): Promise<PaginationResponse<ExcludedPasswordUser>> {
    const { offset, limit } = params;

    const response = await findAllWithPagination(this.userRepository, {}, [], { offset, limit });

    return {
      ...response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      data: response.data.map(({ password, ...rest }) => rest),
    };
  }

  async findUserById(id: string): Promise<ExcludedPasswordUser> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async checkEmailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return !!user;
  }

  async findUserByEmail(email: string): Promise<ExcludedPasswordUser> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findUserByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }
}
