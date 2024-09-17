import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload-interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Customer } from "src/modules/customers/entities/customer.entity";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(Customer) private readonly userRepository:Repository<Customer>,
        private readonly configService:ConfigService
    ){
        super({
            secretOrKey: configService.get<string>('JWT_SECRET'),
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        });

    }

    async validate(payload:JwtPayload):Promise<Customer>{

        const {email} = payload

        const customer = await this.userRepository.findOneBy({ email });

        if(!customer) throw new UnauthorizedException('Token not valid')

        return customer;
    }

}