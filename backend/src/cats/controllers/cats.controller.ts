import { Cat } from '../cats.schema';
import { LoginRequestDto } from '../../auth/dto/login.request.dto';
import { SuccessInterceptor } from '../../common/interceptors/success.interceptor';
import { CatsService } from '../services/cats.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatRequestDto } from '../dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';
import { multerOptions } from 'src/common/utils/multer.options';


@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly CatsService: CatsService, private readonly authService: AuthService) { }


  @ApiOperation({ summary: '현재 고양이 가져 오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData
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

  @ApiOperation({ summary: "로그인" })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    // return 'login';
    return this.authService.jwtlogin(data);
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: "고양이 이미지 업로드" })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('upload/')
  uploadCatImg(@UploadedFiles() files: Array<Express.Multer.File>, @CurrentUser() cat: Cat) {
    console.log("file upload check !!!!!!!!!!!!!!!!!!!!! ")
    return this.CatsService.uploadImg(cat, files);
  }

  @ApiOperation({summary: '모든 고양이 가져 오기'})
  @Get('all')
  getAllCat() {
    return this.CatsService.getAllCat();
  }


}
