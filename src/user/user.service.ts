import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) { }


    async getUser(user: User) {
        // Here you might want to fetch more detailed user data from the database
        // using the user information. For now, we're just returning the user.
        return user;
    }

    async getAllUsers() {
        const users = await this.databaseService.user.findMany();
        return users.map(({ password,created_at,updated_at, ...user }) => user);
    }
}
