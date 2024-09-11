import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CustomerModule } from 'src/modules/customers';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';

@Module({
  imports: [CustomerModule,
    JwtModule.register({
      global: true, // Make the JWT module global
      secret: jwtConstants.secret, // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
