import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { SubscriptionService } from './subscription.service';


@UseGuards(JwtGuard)
@Controller('subscription')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) {}

    
   @Get('list') 
   async getSubscriptionList() {
         return this.subscriptionService.getSubscriptionList();
    }

    @Get(':id')
    async getSubscriptionById(@Param('id') id: string) {
        return this.subscriptionService.getSubscriptionById(id);
    }


}
