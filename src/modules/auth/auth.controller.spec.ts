import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn(),
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    describe('login', () => {
        it('should call authService.login with the correct parameters', async () => {
            // Arrange
            const loginDto: LoginDto = { email: 'test email', password: 'testpass' };
            const result = { accessToken: 'mockAccessToken' };
            jest.spyOn(authService, 'login').mockResolvedValue({name: 'customer name', email: 'customeremail@email.com', role: 2, token: 'token'});

            // Act
            const response = await authController.login(loginDto);

            // Assert
            expect(authService.login).toHaveBeenCalledWith(loginDto);
            expect(response).toEqual({name: 'customer name', email: 'customeremail@email.com', role: 2, token: 'token'});
        });
    });
});
