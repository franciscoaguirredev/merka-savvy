import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { 
    ApiBadRequest,   
    ApiConflictError,
    ApiCreateResponses,
    ApiSuccessResponses,
    ApiSuccessResponsesArray, } from 'src/modules/common/docs';
import { CreateCustomerDto } from '../dto/create-customer.dto';

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

export function ApiDocGetOneCustomer<T>(entity: Type<T>) {
  const description =
    'This endpoint will return customer information by its email';
  return applyDecorators(
    ApiOperation({
      summary: 'Find one customer by email',
      description,
    }),
    ApiParam({
      name: 'email',
      required: true,
      description: 'Email of the customer to search for',
    }),
    ApiSuccessResponses(entity),
    ApiBadRequest()
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

