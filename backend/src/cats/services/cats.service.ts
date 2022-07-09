import { CatRequestDto } from '../dto/cats.request.dto';

// 추가
// HttpException
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../cats.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from '../cats.repository';


@Injectable()
export class CatsService {
  // constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) { }
  constructor(private readonly catsRepository: CatsRepository) { }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;

    console.log(fileName);

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    console.log("newCat : ", newCat);
    return newCat;
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    // const isCatExist = await this.catModel.exists({ email });
    const isCatExist = await this.catsRepository.existsByEmail(email);


    if (isCatExist) {
      throw new UnauthorizedException("해당하는 고양이는 이미 존재합니다");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const cat = await this.catModel.create({
    //   email,
    //   name,
    //   password: hashedPassword,
    // })
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData
  }

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat)=> cat.readOnlyData);
    return readOnlyCats;
  }

}
