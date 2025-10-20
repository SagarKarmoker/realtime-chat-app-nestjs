import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

    async login(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if(user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            const payload = { username: user.email, sub: user.userId };

            return {
                access_token: this.jwtService.sign(payload),
                user: result
            };
        }

        return null;
    }
}
