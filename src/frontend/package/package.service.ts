import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { formatResponse } from 'src/utils';

@Injectable()
export class PackageService {
    constructor(private database: DatabaseService) { }

    async getPackageList() {
        const packageData = await this.database.package.findMany({
            where: { is_active: true }
        });

        const filteredData = packageData.map(item => {
            const { created_at, updated_at, ...rest } = item;
            return rest;
        });

        return formatResponse(true, filteredData, 'Package list found');
    }

    async getPackageById(id: string) {
        try {
            const packageData = await this.database.package.findUnique({ where: { id } });

            if (!packageData) {
                throw new NotFoundException(`Package with ID ${id} not found`);
            }

            const { created_at, updated_at, ...result } = packageData;

            return formatResponse(true, result, `Package with ID ${id} found`);
        }
        catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new BadRequestException(e.message);
        }
    }
}
