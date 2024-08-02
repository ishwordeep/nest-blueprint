import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { JwtGuard } from 'src/auth/guard';
import { CreateIntegrationDTO } from './dto';

@UseGuards(JwtGuard)
@Controller('integration')
export class IntegrationController {
    constructor(private integrationService:IntegrationService ) {}

    @Get('list') // http://localhost:3000/api/integration/list
    async getIntegrationList() {
        return this.integrationService.getIntegrationList();
    }

    @Get(':id') // http://localhost:3000/api/integration/1
    async getIntegrationById(@Param('id') id: string) {
        return this.integrationService.getIntegrationById(id);
    }

    @Post('create') // http://localhost:3000/api/integration/create
    async createIntegration(@Body() createIntegrationDTO: CreateIntegrationDTO) {
        return this.integrationService.createIntegration(createIntegrationDTO);
    }

    @Patch('update/:id') // http://localhost:3000/api/integration/update/1
    async updateIntegration(@Param('id') id: string, @Body() updateIntegrationDTO: CreateIntegrationDTO) {
        return this.integrationService.updateIntegration(id, updateIntegrationDTO);
    }

    @Delete('delete/:id') // http://localhost:3000/api/integration/delete/1
    async deleteIntegration(@Param('id') id: string) {
        return this.integrationService.deleteIntegration(id);
    }
}
