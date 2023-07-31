import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDTO, UserStarMatchDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  createOneUser(createUserDTO: UserDTO) {
    return this.usersRepository.save(createUserDTO);
  }

  getUserList() {
    return this.usersRepository.find({});
  }

  async checkUserByEmail(userDTO: UserDTO) {
    const user = await this.usersRepository.findOne({
      where: {
        email: userDTO.email,
      },
    });
    if (!user) {
      const userCreated = await this.createUser(userDTO);
      return userCreated;
    } else {
      // const userId = user.entity_id;
      // await this.updateUser(userDTO, userId);
      const detailUser = await this.getDetailUser(user.entity_id);
      return detailUser;
    }
  }

  async getStarMatch(userStarMatchDTO: UserStarMatchDTO) {
    
  }

  async createUser(userDTO: UserDTO) {
    return await this.usersRepository.save(userDTO);
  }

  async updateUser(userDTO: UserDTO, id: number) {
    return await this.usersRepository.update(id, userDTO);
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  getDetailUser(entity_id: number): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ entity_id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
