import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateIntegrationDTO, UpdateIntegrationDto } from './dto';
import { formatResponse } from 'src/utils';

@Injectable()
export class IntegrationService {
    constructor(private database: DatabaseService) { }

    private async checkIntegrationExists(id: string) {
        const integrationData = await this.database.integration.findUnique({
            where: { id }
        });

        if (!integrationData) {
            throw new NotFoundException(`Integration with ID ${id} not found`);
        }

        return integrationData;
    }

    async getIntegrationList() {
        try {
            const integrationList = await this.database.integration.findMany();

            const filteredData = integrationList.map(item => {
                const { created_at, updated_at, ...rest } = item;
                return rest;
            });

            return formatResponse(true, filteredData, 'Integration list fetched successfully');
        } catch (e) {
            throw new Error(e);
        }
    }

    async getIntegrationById(id: string) {
        try {
            const integrationData = await this.checkIntegrationExists(id);

            const { created_at, updated_at, ...result } = integrationData;

            return formatResponse(true, result, `Integration with ID ${id} found`);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new BadRequestException(e.message);
        }
    }
    async createIntegration(dto: CreateIntegrationDTO) {
        try {
            const integrationData = await this.database.integration.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    is_active: dto.is_active
                }
            });

            return formatResponse(true, integrationData, 'Integration created successfully');
        } catch (e) {
            throw new Error(e);
        }
    }

    async updateIntegration(id: string, dto: UpdateIntegrationDto) {
        try {
            await this.checkIntegrationExists(id);

            const integrationData = await this.database.integration.update({
                where: { id },
                data: {...dto}
            });

            const {created_at,updated_at, ...result} = integrationData;

            return formatResponse(true, result, 'Integration updated successfully');
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new BadRequestException(e.message);
        }
    }

    async deleteIntegration(id: string) {
        try {
            await this.checkIntegrationExists(id);

            const integrationData=await this.database.integration.delete({
                where: { id }
            });

            const { created_at, updated_at, ...result } = integrationData;

            return formatResponse(true, result, 'Integration deleted successfully');
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new BadRequestException(e.message);
        }
    }
}
