import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDTO, UpdatePackageDTO } from './dto';
import { DatabaseService } from 'src/database/database.service';
import { formatResponse } from 'src/utils';

@Injectable()
export class PackageService {
    constructor(private database: DatabaseService) { }

    private async checkPackageExists(id: string) {
        const packageData = await this.database.package.findUnique({ where: { id } });
        if (!packageData) {
            throw new NotFoundException(`Package with ID ${id} not found`);
        }
        return packageData;
    }

    async getPackageList() {
        try {
            const packageData = await this.database.package.findMany();

            // Exclude 'created_at' and 'updated_at' from the results
            const filteredData = packageData.map(item => {
                const { created_at, updated_at, ...rest } = item;
                return rest;
            });

            return formatResponse(true, filteredData, 'Package list found');
        }
        catch (e) {
            return new Error(e);
        }
    }

    async getPackageById(id: string) {
        try {
            const packageData = await this.checkPackageExists(id); // Ensure the package exists

            const { created_at, updated_at, ...result } = packageData;

            return formatResponse(true, result, `Package with ID ${id} found`);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new BadRequestException(e.message);
        }
    }

    async createPackage(dto: CreatePackageDTO) {
        try {
            const packageData = await this.database.package.create({
                data: {
                    title: dto.title,
                    price: dto.price,
                    description: dto.description,
                    no_of_download: dto.no_of_download,
                    no_of_query: dto.no_of_query,
                    no_of_history_day: dto.no_of_history_day,
                    is_active: dto.is_active
                }
            });

            const { created_at, updated_at, ...result } = packageData;
            return formatResponse(true, result, 'Package created successfully');
        }
        catch (e) {
            throw new Error(e);
        }




    }

    async updatePackage(id: string, dto: UpdatePackageDTO) {
        try {
            await this.checkPackageExists(id);

            // Update the package
            const packageData = await this.database.package.update({
                where: { id },
                data: { ...dto }
            });

            const { created_at, updated_at, ...result } = packageData;

            return formatResponse(true, result, `Package with ID ${id} updated successfully`);

        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new BadRequestException(e.message);
        }
    }

    async deletePackage(id: string) {
        try {
            // Check if the package exists
            await this.checkPackageExists(id);

            // Delete the package
            const packageData = await this.database.package.delete({
                where: { id }
            });

            const { created_at, updated_at, ...result } = packageData;

            return formatResponse(true, result, `Package with ID ${id} deleted successfully`);

        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new BadRequestException(e.message);
        }
    }


}
