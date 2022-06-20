import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation , ApiResponse} from '@nestjs/swagger';

import { ReadOnlyCatDto } from './dto/cat.dto';


@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly CatsService: CatsService) { }

  @Get()
  getCurrentCat() {
    return 'current cat';
  }


  @ApiResponse({
    status: 500,
    description: 'server Errror'
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto
  })
  @ApiOperation({ summary: "회원 가입" })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log("body : ", body);
    return await this.CatsService.signUp(body);
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
