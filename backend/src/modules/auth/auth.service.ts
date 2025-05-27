import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: AuthRepository,
    private readonly jwt: JwtService,
  ) {}


  async register(dto: RegisterDto) {
    console.log('Register DTO:', dto);
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.repo.createUser(dto.email, dto.name, hashedPassword);
    return { message: 'Usuário registrado com sucesso', userId: user.id };
    }


  async login(dto: LoginDto) {
    const user = await this.repo.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwt.signAsync(payload);

    return { access_token: token };
  }
}
