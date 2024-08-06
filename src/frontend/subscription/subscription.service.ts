import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from './dto';
import { formatResponse } from 'src/utils';
import { User } from '@prisma/client';

@Injectable()
export class SubscriptionService {
    constructor(private database: DatabaseService) { }

    async createSubscription(user: User, dto: CreateSubscriptionDto) {
        try {
            const subscriptionData = await this.database.subscription.create({
                data: {
                    user_id: user.id,
                    package_id: dto.package_id,
                    start_date: dto.start_date,
                    end_date: dto.end_date,
                    price: dto.price,
                    is_active: dto.is_active
                }
            });

            const { created_at, updated_at, ...result } = subscriptionData;

            return formatResponse(true, result, 'Subscription created successfully');
        }
        catch (e) {
            throw new Error(e);
        }

    }

    async getSubscriptionListOfUser(user: User) {
        try {
            const subscriptionData = await this.database.subscription.findMany({
                where: { user_id: user.id }
            });

            const filteredData = subscriptionData.map(item => {
                const { created_at, updated_at, ...rest } = item;
                return rest;
            });

            return formatResponse(true, filteredData, 'Subscription list found');
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async getSubscriptionById(user: User, id: string) {
        try {
            const subscriptionData = await this.database.subscription.findFirst({
                where: {
                    id: id,
                    user_id: user.id
                }
            });

            if (!subscriptionData) {
                throw new NotFoundException(`Subscription with ID ${id} not found`);
            }

            const { created_at, updated_at, ...result } = subscriptionData;

            return formatResponse(true, result, `Subscription with ID ${id} found`);
        }
        catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new Error(e);
        }
    }

    async updateSubscription(user: User, id: string, dto: UpdateSubscriptionDto) {
        try {
            const subscriptionData = await this.database.subscription.update({
                where: {
                    id: id,
                    user_id: user.id
                },
                data: {
                    ...dto
                }
            });

            const { created_at, updated_at, ...result } = subscriptionData;

            return formatResponse(true, result, `Subscription with ID ${id} updated successfully`);
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async deleteSubscription(user: User, id: string) {
        try {
            const subscriptionData = await this.database.subscription.delete({
                where: {
                    id: id,
                    user_id: user.id
                }
            });

            return formatResponse(true, subscriptionData, `Subscription with ID ${id} deleted successfully`);
        }
        catch (e) {
            throw new Error(e);
        }
    }


}
