import { JwtStrategy } from './jwt.strategy';
import { JwtPayload } from '../interfaces/jwt-payload-interface';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
    let jwtStrategy: JwtStrategy;
    let userRepository: Repository<Customer>;
    let configService: ConfigService;

    beforeEach(() => {
        userRepository = { findOneBy: jest.fn() } as any; // Mock del Repository
        configService = { get: jest.fn().mockReturnValue('secret') } as any; // Mock del ConfigService
        jwtStrategy = new JwtStrategy(userRepository, configService);
    });

    describe('validate', () => {
        it('should return the customer if the token is valid', async () => {
            const mockPayload: JwtPayload = { email: 'test@example.com' };
            const mockCustomer = new Customer();
            mockCustomer.email = 'test@example.com';

            userRepository.findOneBy = jest.fn().mockResolvedValue(mockCustomer);

            const result = await jwtStrategy.validate(mockPayload);
            expect(result).toEqual(mockCustomer);
            expect(userRepository.findOneBy).toHaveBeenCalledWith({ email: mockPayload.email });
        });

        it('should throw UnauthorizedException if the customer is not found', async () => {
            const mockPayload: JwtPayload = { email: 'invalid@example.com' };
            userRepository.findOneBy = jest.fn().mockResolvedValue(null);

            await expect(jwtStrategy.validate(mockPayload)).rejects.toThrow(UnauthorizedException);
            await expect(jwtStrategy.validate(mockPayload)).rejects.toThrow('Token not valid');
        });
    });
});
