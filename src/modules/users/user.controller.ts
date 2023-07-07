import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ObjectId, isValidObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
// @UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async index(
    @Req() req: any,
    @Query() query?: { filters: object; sort: object },
  ) {
    // console.log(req.user)
    return await this.userService.findAll(query.filters, query.sort);
  }

  @Post()
  async store(@Body() body: CreateUserDto) {
    // return 'asd'
    return await this.userService.store(body);
  }

  @Get('/:id')
  async show(
    @Param('id')
    id: ObjectId,
  ) {
    const isObjectId = isValidObjectId(id);
    if (isObjectId) {
      return await this.userService.findOneById(id);
    }

    throw new NotFoundException('Insira um id válido');
  }

  @Put('/:id')
  async update(
    @Param('id')
    id: ObjectId,
    @Body() body: UpdateUserDto,
  ) {
    const isObjectId = isValidObjectId(id);
    if (isObjectId) {
      return await this.userService.update(id, body);
    }

    throw new NotFoundException('Insira um id válido');
  }

  @Delete('/:id')
  async destroy(
    @Param('id')
    id: ObjectId,
  ) {
    const isObjectId = isValidObjectId(id);
    if (isObjectId) {
      return await this.userService.delete(id);
    }

    throw new NotFoundException('Insira um id válido');
  }
}
