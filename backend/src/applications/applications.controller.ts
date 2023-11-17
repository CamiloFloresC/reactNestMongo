import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from 'src/dto/create-application.dto';
import { updateApplicationDto } from 'src/dto/update-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Get()
  findAll() {
    return this.applicationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const aplicacion = await this.applicationsService.findOne(id);
    if (!aplicacion) throw new NotFoundException('Task doesnt exist!');
    return aplicacion;
  }

  @Post()
  async create(@Body() body: CreateApplicationDto) {
    try {
      return await this.applicationsService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('App already exists');
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const application = await this.applicationsService.delete(id);
    if (!application)
      throw new NotFoundException('could not delete, App doesnt exist');
    return application;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: updateApplicationDto) {
    const application = await this.applicationsService.update(id, body);
    if (!application) throw new NotFoundException('App doesnt exist to update');
    return application;
  }
}
