import { ApiProperty } from '@nestjs/swagger';
import { ApiFieldErrorDto } from './api-field-error-dto';

export class ApiErrorResponseDto {
  @ApiProperty({ example: 400, description: 'The HTTP status code' })
  statusCode: number;

  @ApiProperty({ type: [ApiFieldErrorDto], description: 'An array of field error messages' })
  message: ApiFieldErrorDto[];

  @ApiProperty({ example: 'Bad Request', description: 'The type of error' })
  error: string;

  @ApiProperty({ example: '2024-06-26T02:52:56.698Z', description: 'The timestamp of the error' })
  timestamp: string;

}
