import { PickType } from '@nestjs/swagger';
import { Cat } from '../../cats/cats.schema';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}

// backend/src/auth/dto/login.request.dto.ts