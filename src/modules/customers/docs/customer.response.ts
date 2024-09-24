import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiParam, ApiProperty, ApiQuery, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';

export function ApiDocPostCustomer(){
    return applyDecorators(
    ApiCreatedResponse({
        status: 201,
        description: 'The record has been successfully created.',
    }),
    
    ApiForbiddenResponse({ 
        status: 403,
        description: 'Forbidden.' })
    )
}

export function ApiGetCustomerByEmail() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a customer by email' }),
    ApiParam({
      name: 'email',
      description: 'Email of the customer',
      required: true,
      type: String,
    }),
    ApiResponse({
      status: 200,
      description: 'Customer found',
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

export function ApiGetAllCustomers() {
  return applyDecorators(
    ApiOperation({ summary: 'Get all customers' }),
    ApiResponse({
      status: 200,
      description: 'List of all customers',
      type: [Customer], 
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
}

export function ApiDeleteCustomer() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a customer by email' }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: 'Customer deleted successfully',
      schema: {
        example: { message: 'Customer with email example@example.com deleted successfully' },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Customer not found',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
}




