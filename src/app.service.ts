import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Pet } from './pet.entity';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getUsers(): Promise<User[]> {
    const profile = await this.userRepository.find({
      relations: ['pets'],
    });
    return profile;
  }

  async createProfile(createUserDto: CreateUserDto) {
    const { name, petType, petName } = createUserDto;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager.insert<User>(User, {
        name,
      });
      Logger.log(JSON.stringify(user), 'User data inserted');
      const ownerId = user.identifiers[0].id;
      await queryRunner.manager.insert<Pet>(Pet, {
        type: petType,
        name: petName,
        owner: ownerId,
      });
      await queryRunner.commitTransaction();
      return JSON.stringify(user);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Failed to create Profile');
    } finally {
      await queryRunner.release();
    }
  }
}
