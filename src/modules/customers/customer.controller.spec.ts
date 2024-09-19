import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Observable } from 'rxjs';

const mockCustomerRepository = {
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockResolvedValue({}),
} as unknown as Repository<Customer>;

class JwtAuthGuardMock implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        return true;
    }
}

describe('CustomerController', () => {
    let controller: CustomerController;
    let service: CustomerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CustomerController],
            providers: [
                CustomerService,
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockImplementation((payload: any, options?: any) => 'mocked-token'),
                        signAsync: jest.fn().mockResolvedValue('mocked-token'),
                        verify: jest.fn().mockImplementation((token: string, options?: any) => ({ userId: 1 })),
                        verifyAsync: jest.fn().mockResolvedValue({ userId: 1 }),
                        decode: jest.fn().mockImplementation((token: string, options?: any) => ({ userId: 1 })),
                    },
                },
                {
                    provide: 'CustomerRepository',
                    useValue: mockCustomerRepository,
                },
                {
                    provide: JwtAuthGuard,
                    useClass: JwtAuthGuardMock,
                },
            ],
        }).compile();

        controller = module.get<CustomerController>(CustomerController);
        service = module.get<CustomerService>(CustomerService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should create a customer', async () => {
        const createCustomerDto = { name: 'test example', email: 'test@example.com', password: 'test123' };
        jest.spyOn(service, 'create').mockResolvedValue(createCustomerDto as any);
        await controller.create(createCustomerDto);
        expect(service.create).toHaveBeenCalledWith(createCustomerDto);
    });
});
