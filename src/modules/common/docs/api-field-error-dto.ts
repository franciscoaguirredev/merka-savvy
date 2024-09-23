import { ApiProperty } from '@nestjs/swagger';

export class ApiFieldErrorDto {
  @ApiProperty({ example: 'email', description: 'The field with an error' })
  field: string;

  @ApiProperty({ example: 'must be shorter than or equal to 255 characters', description: 'The error message for the field' })
  error: string;
}