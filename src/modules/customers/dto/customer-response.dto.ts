import { ApiProperty } from "@nestjs/swagger";

export class CustomerResponse {

    @ApiProperty({ example: 70 })
    id: number;

    @ApiProperty({ example: 'jhondoeexample@gmail.com' })
    email: string;

    @ApiProperty({ example: 'Jhon Doe' })
    name: string;
}