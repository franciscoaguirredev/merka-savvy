import { ApiProperty } from "@nestjs/swagger";

export class ApiErrorConflictDto {
    @ApiProperty({ example: 409, description: 'The HTTP status code' })
    statusCode: number;
  
    @ApiProperty({ example: 'Entity duplicated', description: 'An array of field error messages' })
    message: string;
  
    @ApiProperty({ example: 'Conflict', description: 'The type of error' })
    error: string;
}
  