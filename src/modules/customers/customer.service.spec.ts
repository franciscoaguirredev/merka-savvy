import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('CustomerService', () => {
    let service: CustomerService;
    let repository: Repository<Customer>;

    const mockCustomerRepository = {
        findOneBy: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
        find: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CustomerService,
                {
                    provide: getRepositoryToken(Customer),
                    useValue: mockCustomerRepository,
                },
            ],
        }).compile();

        service = module.get<CustomerService>(CustomerService);
        repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
    });

    describe('create', () => {
        it('should create a customer successfully', async () => {
            const createCustomerDto = { email: 'test@example.com', password: 'hashedPassword', name: 'test name' };
            const customer = { ...createCustomerDto, role: 2 };

            mockCustomerRepository.findOneBy.mockResolvedValue(null);
            mockCustomerRepository.create.mockReturnValue(customer);
            mockCustomerRepository.save.mockResolvedValue({ ...customer });

            jest.spyOn(bcrypt, 'hash').mockImplementation(async (password: string, saltOrRounds: string | number) => 'hashedPassword');

            const result = await service.create(createCustomerDto);

            expect(result).toEqual({ ...customer });
            expect(mockCustomerRepository.findOneBy).toHaveBeenCalledWith({ email: createCustomerDto.email });
            expect(mockCustomerRepository.create).toHaveBeenCalledWith({ ...createCustomerDto, role: 2 });
            expect(mockCustomerRepository.save).toHaveBeenCalledWith({ ...customer, password: 'hashedPassword' });
        });

        it('should throw ConflictException if customer already exists', async () => {
            mockCustomerRepository.findOneBy.mockResolvedValue({}); 

            await expect(service.create({ name: 'test name', email: 'test@example.com', password: 'password' }))
                .rejects
                .toThrow(InternalServerErrorException);
        });

        it('should throw InternalServerErrorException on error', async () => {
            jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
                throw new Error();
            });

            await expect(service.create({ name: "test name", email: 'test@example.com', password: 'password' })).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('update', () => {
        it('should update a customer successfully', async () => {
            const email = 'test@example.com';
            const updateCustomerDto = { password: 'newPassword' };
            const existingCustomer = { email, password: 'oldPassword', role: 2 };

            mockCustomerRepository.findOneBy.mockResolvedValue(existingCustomer);
            jest.spyOn(bcrypt, 'hash').mockImplementation(async (password: string, saltOrRounds: string | number) => 'hashedNewPassword');
            mockCustomerRepository.save.mockResolvedValue({ ...existingCustomer, ...updateCustomerDto, password: 'hashedNewPassword' });

            const result = await service.update(email, updateCustomerDto);

            expect(result).toEqual({ ...existingCustomer, ...updateCustomerDto, password: 'hashedNewPassword' });
        });

        it('should throw InternalServerErrorException on error', async () => {
            const email = 'test@example.com';
            const updateCustomerDto = { password: 'newPassword' };

            mockCustomerRepository.findOneBy.mockRejectedValue(new Error());

            await expect(service.update(email, updateCustomerDto)).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('remove', () => {
        it('should remove a customer successfully', async () => {
            const email = 'test@example.com';
            mockCustomerRepository.delete.mockResolvedValue({ affected: 1 });

            await service.remove(email);

            expect(mockCustomerRepository.delete).toHaveBeenCalledWith({ email });
        });

        it('should throw NotFoundException if customer does not exist', async () => {
            const email = 'test@example.com';
            mockCustomerRepository.delete.mockResolvedValue({ affected: 0 });

            await expect(service.remove(email)).rejects.toThrow(NotFoundException);
        });

        it('should throw InternalServerErrorException on error', async () => {
            const email = 'test@example.com';
            mockCustomerRepository.delete.mockRejectedValue(new Error());

            await expect(service.remove(email)).rejects.toThrow(NotFoundException);
        });
    });

    describe('getAllCustomers', () => {
        it('should return all customers', async () => {
            const customers = [{ email: 'test@example.com', password: 'password' }];
            mockCustomerRepository.find.mockResolvedValue(customers);

            const result = await service.getAllCustomers();

            expect(result).toEqual(customers);
        });

        it('should throw InternalServerErrorException on error', async () => {
            mockCustomerRepository.find.mockRejectedValue(new Error());

            await expect(service.getAllCustomers()).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('getByEmail', () => {
        it('should return a customer by email', async () => {
            const email = 'test@example.com';
            const customer = { email };
            mockCustomerRepository.findOneBy.mockResolvedValue(customer);

            const result = await service.getByEmail(email);

            expect(result).toEqual(customer);
        });

        it('should throw NotFoundException if customer does not exist', async () => {
            const email = 'test@example.com';
            mockCustomerRepository.findOneBy.mockResolvedValue(null);

            await expect(service.getByEmail(email)).rejects.toThrow(NotFoundException);
        });

        it('should throw InternalServerErrorException on error', async () => {
            const email = 'test@example.com';
            mockCustomerRepository.findOneBy.mockRejectedValue(new Error());

            await expect(service.getByEmail(email)).rejects.toThrow(NotFoundException);
        });
    });
});
