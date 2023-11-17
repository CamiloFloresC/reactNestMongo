import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from 'src/schemas/applications.schemas';
import { Model } from 'mongoose';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { updateApplicationDto } from '../dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<Application>,
  ) {}

  findAll() {
    return this.applicationModel.find();
  }

  async create(createApplication: CreateApplicationDto) {
    const newApplication = new this.applicationModel(createApplication);
    await newApplication.save();
    return newApplication;
  }

  async findOne(id: string) {
    return this.applicationModel.findById(id);
  }

  async delete(id: string) {
    return this.applicationModel.findByIdAndDelete(id);
  }

  async update(id: string, application: updateApplicationDto) {
    return this.applicationModel.findByIdAndUpdate(id, application, {
      new: true,
    });
  }
}
