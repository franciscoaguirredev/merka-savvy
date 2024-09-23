import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { 
    ApiBadRequest,   
    ApiConflictError,
    ApiCreateResponses,
    ApiSuccessResponses,
    ApiSuccessResponsesArray, } from 'src/modules/common/docs';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { Customer } from '../entities/customer.entity';

export function ApiDocPostCustomer<T>(entity: Type<T>) {
  const description =
    'You must specify the type of user. The personalType field will determine whether you need to provide the fields for the natural-client or company-client entity.';
  return applyDecorators(
    ApiOperation({
      summary: '',
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest(),
    ApiConflictError()
  );
}

export function ApiDocGetCustomers<T>(entity: Type<T>) {
  const description =
    'This endpoint will return all customers registered in the system.';
  return applyDecorators(
    ApiOperation({
      summary: 'Get all customers',
      description,
    }),
    ApiSuccessResponsesArray(entity),
    ApiBadRequest(),
    ApiConflictError()
  );
}

export function ApiDocGetOneCustomer<T>() {
return applyDecorators(
    ApiOperation({ summary: 'Find customer by email' }),
    ApiBody({
      required: true,
      description: 'The email of the customer to be retrieved',
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'The customer has been successfully retrieved',
      type: Customer,
    }),
    ApiResponse({
      status: 404,
      description: 'Customer not found',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
}

export function ApiDocUpdateCustomer<T>(entity: Type<T>) {
  const description = 'This endpoint allows you to update the user information';
  return applyDecorators(
    ApiBody({
      description: "Update customer's information",
      type: CreateCustomerDto,
    }),
    ApiOperation({
      summary: "Update customer's information",
      description,
    }),
    ApiCreateResponses(entity),
    ApiBadRequest(),
    ApiConflictError()
  );
}

