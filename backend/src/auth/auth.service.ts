
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from './../cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';

// 추가
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
//////

@Injectable()
export class AuthService {

    constructor(private readonly catsRepository: CatsRepository,
        private jwtService: JwtService,
    ) { }

    // Cats Controlelr 에서 로그인 요청 응답을 위해 사용할 함수
    async jwtlogin(data: LoginRequestDto) {
        const { email, password } = data;

        // 추가
        //* 해당하는 email이 있는지
        const cat = await this.catsRepository.findCatByEmail(email);
        console.log("cat.id : ", cat.id);
        console.log("email ; ", email);
        

        if (!cat) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
        }

        //* password가 일치한지
        const isPasswordValidated: boolean = await bcrypt.compare(
            password,
            cat.password,
        );

            console.log("isPasswordValidated : ", isPasswordValidated);
            

        if (!isPasswordValidated) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
        }

        const payload = { email: email, sub: cat.id };

        return {
            token: this.jwtService.sign(payload),
        };

    }
}

// backend/src/auth/auth.service.ts