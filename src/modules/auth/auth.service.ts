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

        const user = await this.userRepository.findOne({where:{email}, select: {email:true, password:true}})
        console.log(user)

        if(!user || !bcrypt.compareSync(password, user.password))
            throw new UnauthorizedException('Credentials are not valid')
            console.log()
        return {
            ...user,
            token:this.getJwtToken({email: user.email})
        }
    }

    private getJwtToken(payload:JwtPayload){
        const token = this.jwtService.sign(payload);
        return token
    }


}

