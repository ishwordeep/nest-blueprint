import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { formatResponse } from 'src/utils';

@Injectable()
export class SubscriptionService {
    constructor(private database:DatabaseService) {}

    private async checkSubscriptionExists(id: string) {
        const subscriptionData = await this.database.subscription.findUnique({ where: { id } });
        if (!subscriptionData) {
            throw new NotFoundException(`Subscription with ID ${id} not found`);
        }
        return subscriptionData;
    }

    async getSubscriptionList() {
        try {
            const subscriptionData = await this.database.subscription.findMany();

            const filteredData = subscriptionData.map(item => {
                const { created_at, updated_at, ...rest } = item;
                return rest;
            });
            return formatResponse(true, filteredData, 'Subscription list found');
        } catch (e) {
            return new Error(e);
        }
    }

    async getSubscriptionById(id: string) {
        try {
            const subscriptionData = await this.checkSubscriptionExists(id);

            const { created_at, updated_at, ...result } = subscriptionData;

            return formatResponse(true, result, `Subscription with ID ${id} found`);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new Error(e.message);
        }
    }

    
}
