import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    async findByEmail(email: string): Promise<any> {
        // Implement your logic to find a user by email
    }
}
