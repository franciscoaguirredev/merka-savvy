import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { EnvConfig } from "src/modules/common/config/env.config";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: EnvConfig().jwtSecret
                });
            
            request.user = {
                id: payload.sub,
                username: payload.username,
                role: payload.role,
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
