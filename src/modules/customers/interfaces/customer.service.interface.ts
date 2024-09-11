import { CreateCustomerDto } from "../dto/create-customer.dto";
import { Customer } from "../entities/customer.entity";


export interface ICustomerService{
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
}