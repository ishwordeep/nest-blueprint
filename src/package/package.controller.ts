import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PackageService } from './package.service';
import { CreatePackageDTO, UpdatePackageDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('package')
export class PackageController {
    constructor(private packageService: PackageService) {}

    @Get('list') // http://localhost:3000/api/package/list
    async getPackageList() {
        return this.packageService.getPackageList();
    }

    @Get(':id') // http://localhost:3000/api/package/1
    async getPackageById(@Param('id') id: string) {
        return this.packageService.getPackageById(id);
    }

    @Post('create') // http://localhost:3000/api/package/create
    async createPackage(@Body() createPackageDTO: CreatePackageDTO) {
        return this.packageService.createPackage(createPackageDTO);
    }

    @Patch('update/:id') // http://localhost:3000/api/package/update/1
    async updatePackage(@Param('id') id: string, @Body() updatePackageDTO: UpdatePackageDTO) {
        return this.packageService.updatePackage(id, updatePackageDTO);
    }

    @Delete('delete/:id') // http://localhost:3000/api/package/delete/1
    async deletePackage(@Param('id') id: string) {
        return this.packageService.deletePackage(id);
    }




}
