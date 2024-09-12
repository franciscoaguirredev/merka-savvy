import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCustomerDto {
  @IsString()
  @MinLength(10, { message: 'Name must have at least 10 characters'})
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail(null, { message: 'Please enter a valid email address'})
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must have at least 8 characters'})
  @IsNotEmpty()
  password: string;

}
