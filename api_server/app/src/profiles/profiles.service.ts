import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Engineer } from '../engineers/entities/engineer.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Engineer)
    private readonly engineerRepository: Repository<Engineer>,
  ) {}

  async findOrInitialize(userId: string) {
    const engineer = await this.findOne(userId);
    if (!!engineer) return engineer;

    const newEnginner = new Engineer(userId);
    newEnginner.experiencedProfessions = [];
    return newEnginner;
  }

  async assignAttributes(engineer: Engineer, params: Partial<Engineer>) {
    const assignedAttributesEngineer = this.engineerRepository.merge(
      engineer,
      params,
    );
    assignedAttributesEngineer.experiencedProfessions =
      params.experiencedProfessions;
    return assignedAttributesEngineer;
  }

  async validate(engineer: Engineer) {
    return validate(engineer);
  }

  async save(engineer: Engineer) {
    return this.engineerRepository.save(engineer);
  }

  async findOne(userId: string) {
    return await this.engineerRepository.findOne({
      where: { userId },
      loadEagerRelations: false,
      relationLoadStrategy: 'query',
      relations: ['experiencedProfessions'],
    });
  }
}
