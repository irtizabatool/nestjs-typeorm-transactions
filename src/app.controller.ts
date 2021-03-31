import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Pet } from './pet.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers(): Promise<Pet[]> {
    return this.appService.getUsers();
  }

  @Post()
  createProfile(@Body() createChatDto: CreateUserDto) {
    return this.appService.createProfile(createChatDto);
  }
}
