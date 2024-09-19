import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const mockCustomer = {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password', 10),
    role: { name: 'user' },
};

const mockCustomerRepository = {
    createQueryBuilder: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getOne: jest.fn(),
};

const mockJwtService = {
    sign: jest.fn().mockReturnValue('jwt-token'),
};

describe('AuthService', () => {
    let authService: AuthService;
    let customerRepository: Repository<Customer>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(Customer),
                    useValue: mockCustomerRepository,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        customerRepository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('login', () => {
        it('should return user data and token on successful login', async () => {
            mockCustomerRepository.getOne.mockResolvedValue(mockCustomer);
            const loginDto: LoginDto = { email: 'john@example.com', password: 'password' };

            const result = await authService.login(loginDto);

            expect(result).toEqual({
                name: mockCustomer.name,
                email: mockCustomer.email,
                role: mockCustomer.role,
                token: 'jwt-token',
            });
            expect(mockJwtService.sign).toHaveBeenCalledWith({ email: mockCustomer.email });
        });

        it('should throw UnauthorizedException for invalid email', async () => {
            mockCustomerRepository.getOne.mockResolvedValue(null);
            const loginDto: LoginDto = { email: 'invalid@example.com', password: 'password' };

            await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });

        it('should throw UnauthorizedException for invalid password', async () => {
            mockCustomerRepository.getOne.mockResolvedValue(mockCustomer);
            const loginDto: LoginDto = { email: 'john@example.com', password: 'wrongpassword' };

            await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
        });
    });
});
