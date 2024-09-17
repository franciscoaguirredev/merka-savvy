import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload-interface';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const { password, email } = loginDto;

        const user = await this.customerRepository.findOne({
            where: { email },
            select: ['email', 'password'],
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Credentials are not valid');
        }

        return {
            ...user,
            token: this.getJwtToken({ email: user.email }),
        };
    }

    private getJwtToken(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }
}
