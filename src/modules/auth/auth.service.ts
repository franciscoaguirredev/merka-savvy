import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload-interface';

import { LoginDto } from './dto/login.dto';
import { Customer } from '../customers/entities/customer.entity';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Customer) private readonly userRepository:Repository<Customer>,
        private readonly jwtService:JwtService,
    ){}



    async login(loginDto:LoginDto){
        const {password, email} = loginDto

        const user = await this.userRepository.createQueryBuilder("customer").leftJoinAndSelect("customer.role", "role").where("customer.email = :email", { email }).select(["customer.name", "customer.email", "customer.password", "role.name"]).getOne();
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException('Credentials are not valid');
        }

        return {
            name: user.name,
            email: user.email,
            role: user.role.name,
            token: this.getJwtToken({ email: user.email, role: user.role.name }),
        }
    }

    private getJwtToken(payload:JwtPayload){
        const token = this.jwtService.sign({
            email: payload.email,
            role: payload.role.toString()
        });
        return token
    }


}

