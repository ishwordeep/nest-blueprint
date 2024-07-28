import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { ChangePasswordDTO, UpdateProfileDTO } from './dto';
import * as argon2 from 'argon2';


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
        return users.map(({ password, created_at, updated_at, ...user }) => user);
    }

    async changePassword(user: User, dto: ChangePasswordDTO) {
        // Here you would implement the password change logic. For now, we're just returning the user.
        const passwordMatch = await argon2.verify(user.password, dto.old_password);
        if (!passwordMatch) {
            return {
                status: HttpStatus.FORBIDDEN,
                success: false,
                message: 'Old Password is incorrect'
            };
        }
        if (dto.new_password !== dto.confirm_password) {
            return {
                status: HttpStatus.FORBIDDEN,
                success: false,
                message: 'Passwords do not match'
            };
        }

        if(dto.old_password === dto.new_password){
            return {
                status: HttpStatus.FORBIDDEN,
                success: false,
                message: 'New password cannot be the same as old password'
            };
        }

        const hashedPassword = await argon2.hash(dto.new_password);
        await this.databaseService.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
            },
        });
        return {
            status: HttpStatus.OK,
            success: true,
            message: 'Password changed successfully'
        };
    }

    async updateProfile(user: User, dto: UpdateProfileDTO) {
        // Here you would implement the profile update logic. For now, we're just returning the user.
        await this.databaseService.user.update({
            where: { id: user.id },
            data: {
                ...dto,
            },
        });
        return {
            status: HttpStatus.OK,
            success: true,
            message: 'Profile updated successfully'
        };
    }
    
}
