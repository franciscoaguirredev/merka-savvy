import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerService } from 'src/modules/customers';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly CustomerService: CustomerService,
        private readonly jwtService: JwtService,
    ){}

    async login({email,password}:LoginDto) {

        const customer = await this.CustomerService.findOneByEmail(email);
        if(!customer){
            throw new UnauthorizedException('Email is Wrong');} 
        
            const isPasswordValid = await bcrypt.compare (password, customer.password)

            if(!isPasswordValid){
                throw new UnauthorizedException('Password is Wrong');
            }


            const payload = {email: customer.email, role: customer.role};

            const token = await this.jwtService.signAsync(payload);

            return {
                token,
                email
            }; 
    }
    
}

