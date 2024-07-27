import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { DatabaseService } from 'src/database/database.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { FileUploadService } from 'src/file-upload/file-upload.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly fileUploadService: FileUploadService,
        private database: DatabaseService,
        private jwtService: JwtService, //to sign token
        private config: ConfigService //to import JWT_SECRET,
    ) { }


    async login(dto: AuthDto) {
        //find user by email
        const user = await this.database.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (!user) {
            throw new ForbiddenException('Invalid credentials');
        }
        //compare password
        const valid = await argon2.verify(user.password, dto.password);
        if (!valid) {
            throw new ForbiddenException('Invalid credentials');
        }
        const token = await this.signToken(user.id, user.email); //return token
        return {
            ...token,
            user: this.sanitizeUser(user),
        };
    }

    async signup(dto: AuthDto,file: Express.Multer.File) {

        try {
            // Hash the password
            const hashedPassword = await argon2.hash(dto.password);

            // Create the user in the database
            const user = await this.database.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword,
                    name: dto.name,
                    image: ''
                }
            });

             // Save the file to the storage
             const savedFilename = await this.fileUploadService.saveFile(file, 'user-profile');
             const imagePath = `user-profile/${savedFilename}`;
             // Update user record with the actual filename
             await this.database.user.update({
                 where: { id: user.id },
                 data: { image: imagePath }
             });

              // Generate JWT token
            const token = await this.signToken(user.id, user.email); 

            // Return sanitized user data and token
            return {
                ...this.sanitizeUser(user),
                image: imagePath,
                ...token,

            };
           

        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already exists');
                }
            }
            throw error;


        }
    }

    //sign token,generates token
    async signToken(userId: String, email: String): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        };
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwtService.sign(payload, {
            secret: secret,
            expiresIn: this.config.get('JWT_EXPIRES_IN')
        });

        return {
            access_token: token
        };
    }

    private sanitizeUser(user: any) {
        const { password, ...result } = user;
        return result;
    }
}
