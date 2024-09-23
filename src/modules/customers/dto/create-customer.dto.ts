import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches, MinLength } from "class-validator";

export class CreateCustomerDto {
  
  @IsString()
  @MinLength(10, { message: 'Name must have at least 10 characters'})
  @IsNotEmpty()
  @ApiProperty({example: 'Pepito Perez', nullable: false})
  name: string;

  
  @IsString()
  @IsEmail({},{ message: 'Please enter a valid email address' })
  @IsNotEmpty()
  @ApiProperty({example: 'pepitoperez@correo.com'})
  email: string;

  
  @IsString()
  @MinLength(8, { message: 'Password must have at least 8 characters' })
  @IsNotEmpty()
  @IsStrongPassword()
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must include at least one uppercase letter, one lowercase letter, and one number or special character.'
  })
  @ApiProperty({ description: 'The password must have at least one uppercase letter, one lowercase letter, and one number or special character.', example: 'He110QW0lrs23$' })
  password: string;

}
