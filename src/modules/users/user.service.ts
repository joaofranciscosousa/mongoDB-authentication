import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findAll(filters: object, sort: object) {
    let querySort: any;

    if (sort) {
      const [[campo, sortString]] = Object.entries(sort);

      const sortIndicator = sortString === 'asc' ? 1 : -1;

      const sortFormated = Object.fromEntries([[campo, sortIndicator]]);

      querySort = sortFormated as Record<
        string,
        1 | -1 | { $meta: 'textScore' }
      >;
    }

    return await this.userModel
      .find(filters, {
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      })
      .sort(querySort);
  }

  async findOneById(id: ObjectId) {
    return await this.userModel.findById(id, {
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    });
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async store(data: CreateUserDto) {
    const user = await this.userModel.create(data);
    return await this.findOneById(user._id); // return {email: user.email}
  }

  async update(id: ObjectId, data: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
      fields: ['name', 'email', 'createdAt', 'updatedAt'],
    });
  }

  async delete(id: ObjectId) {
    await this.userModel.deleteOne({ _id: id });
  }
}
