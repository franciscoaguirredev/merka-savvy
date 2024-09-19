import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

describe('JwtAuthGuard', () => {
    let guard: JwtAuthGuard;
    let jwtService: JwtService;

    beforeEach(() => {
        jwtService = { verifyAsync: jest.fn() } as any;
        guard = new JwtAuthGuard(jwtService);
    });

    describe('canActivate', () => {
        it('should throw UnauthorizedException if no token is provided', async () => {
            const context = {
                switchToHttp: () => ({
                    getRequest: () => ({
                        headers: {},
                    }),
                }),
            } as ExecutionContext;

            await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
        });

        it('should throw UnauthorizedException if token is invalid', async () => {
            const context = {
                switchToHttp: () => ({
                    getRequest: () => ({
                        headers: {
                            authorization: 'Bearer invalid-token',
                        },
                    }),
                }),
            } as ExecutionContext;

            jwtService.verifyAsync = jest.fn().mockRejectedValue(new Error('Invalid token'));

            await expect(guard.canActivate(context)).rejects.toThrow(UnauthorizedException);
        });

        it('should set the user on the request if the token is valid', async () => {
            const mockPayload = { userId: 1 };
            const request = {
                headers: {
                    authorization: 'Bearer valid-token',
                },
                user: undefined,
            };
            const context = {
                switchToHttp: () => ({
                    getRequest: () => request,
                }),
            } as ExecutionContext;

            jwtService.verifyAsync = jest.fn().mockResolvedValue(mockPayload);

            const result = await guard.canActivate(context);
            expect(result).toBe(true);
            expect(request.user).toEqual(mockPayload);
        });
    });

    describe('extractTokenFromHeader', () => {
        it('should extract token from Bearer token', () => {
            const request = {
                headers: {
                    authorization: 'Bearer test-token',
                },
            } as any;

            const token = guard['extractTokenFromHeader'](request);
            expect(token).toBe('test-token');
        });

        it('should return undefined if the authorization header is not a Bearer token', () => {
            const request = {
                headers: {
                    authorization: 'Basic test-token',
                },
            } as any;

            const token = guard['extractTokenFromHeader'](request);
            expect(token).toBeUndefined();
        });

        it('should return undefined if authorization header is missing', () => {
            const request = {
                headers: {},
            } as any;

            const token = guard['extractTokenFromHeader'](request);
            expect(token).toBeUndefined();
        });
    });
});
