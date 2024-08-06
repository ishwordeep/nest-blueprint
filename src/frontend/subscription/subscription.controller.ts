import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { JwtGuard } from 'src/auth/guard';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('frontend/subscription')
export class SubscriptionController {
    constructor(private subscriptionService:SubscriptionService) {}

    @Get('') // http://localhost:3000/api/frontend/subscription
    async getSubscriptionListOfUser(@GetUser() user:User) {
        return this.subscriptionService.getSubscriptionListOfUser(user);
    }

    @Get(':id') // http://localhost:3000/api/frontend/subscription/1
    async getSubscriptionById(@GetUser() user:User,@Param('id') id: string) {
        return this.subscriptionService.getSubscriptionById(user,id);
    }



    @Post('') // http://localhost:3000/api/frontend/subscription
    async createSubscription(@GetUser() user:User, @Body() createSubscriptionDTO: CreateSubscriptionDto) {
        return this.subscriptionService.createSubscription(user,createSubscriptionDTO);
    }

    @Patch(':id') // http://localhost:3000/api/frontend/subscription/1
    async updateSubscription(@GetUser() user:User,@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
        return this.subscriptionService.updateSubscription(user,id,updateSubscriptionDto);
    }

    @Delete(':id') // http://localhost:3000/api/frontend/subscription/1
    async deleteSubscription(@GetUser() user:User,@Param('id') id: string) {
        return this.subscriptionService.deleteSubscription(user,id);
    }

    
}
