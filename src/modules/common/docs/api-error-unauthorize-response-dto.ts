import { ApiProperty } from "@nestjs/swagger";

export class ApiErrorUnauthorizeDto {
    @ApiProperty({ example: 401, description: 'The HTTP status code' })
    statusCode: number;
  
    @ApiProperty({ example: 'Entity duplicated', description: 'Invalid token' })
    message: string;
  
    @ApiProperty({ example: 'Unauthorized', description: 'Unauthorized' })
    error: string;
}