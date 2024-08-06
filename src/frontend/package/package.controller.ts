import { Controller, Get, Param } from '@nestjs/common';
import { PackageService } from './package.service';

@Controller('frontend/package')
export class PackageController {
    constructor(private packageService:PackageService) {}

    @Get('') // http://localhost:3000/api/frontend/package
    async getPackageList() {
        return this.packageService.getPackageList();
    }

    @Get(':id') // http://localhost:3000/api/frontend/package/1
    async getPackageById(@Param('id') id: string) {
        return this.packageService.getPackageById(id);
    }
}
