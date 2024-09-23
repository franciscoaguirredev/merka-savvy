import { ApiProperty } from '@nestjs/swagger';
import { IMetaData } from '../interfaces';

export class ApiResponseDto<T> {
  @ApiProperty({ example: 200, description: 'The HTTP status code' })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;

}

export class ApiResponseWhitMetaDataDto<T> {
  @ApiProperty({ example: 200, description: 'The HTTP status code' })
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: T;

  @ApiProperty({
    required: false,
    description: 'Metadata related to pagination',
    example: {
      totalItems: 100,
      itemCount: 10,
      itemsPerPage: 10,
      totalPages: 10,
      currentPage: 1
    }
  })
  metadata?: IMetaData;

  @ApiProperty({ required: false, example: { message: 'Error occurred', statusCode: 400 } })
  error?: any;
}

export class ApiMessageDto {
  @ApiProperty({ example: "String", description: 'Message Success' })
  message: string
}

