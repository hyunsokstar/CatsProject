import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';


// 추가
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';


@Module({
  // 추가
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],

  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
