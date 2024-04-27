import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DesiredCondition } from './entities/desired-condition.entity';
import { Repository } from 'typeorm';
import { UpdateDesiredConditionDto } from './dto/update-desired-condition.dto';
import { validate } from 'class-validator';
import { Engineer } from '../engineers/entities/engineer.entity';

@Injectable()
export class DesiredConditionsService {
  constructor(
    @InjectRepository(DesiredCondition)
    private readonly desiredConditionRepository: Repository<DesiredCondition>,
    @InjectRepository(Engineer)
    private readonly engineerRepository: Repository<Engineer>,
  ) {}

  async findOrInitialize(userId: string) {
    const desiredCondition = await this.findOne(userId);
    if (!!desiredCondition) return desiredCondition;

    const engineer = await this.engineerRepository.findOneBy({ userId });
    if (!engineer) {
      throw new NotFoundException();
    }
    const newDesiredCondition = new DesiredCondition(engineer.id);
    newDesiredCondition.desiredPriorityConditions = [];
    return newDesiredCondition;
  }

  async assignAttributes(
    desiredCondition: DesiredCondition,
    params: UpdateDesiredConditionDto,
  ) {
    const assignedAttributesDesiredCondition =
      this.desiredConditionRepository.merge(desiredCondition, params);
    assignedAttributesDesiredCondition.desiredPriorityConditions =
      params.desiredPriorityConditions;
    return assignedAttributesDesiredCondition;
  }

  async validate(desiredCondition: DesiredCondition) {
    return validate(desiredCondition);
  }

  async save(desiredCondition: DesiredCondition) {
    return await this.desiredConditionRepository.save(desiredCondition);
  }

  async findOne(userId: string) {
    const engineer = await this.engineerRepository.findOneBy({ userId });
    if (!engineer) {
      throw new NotFoundException();
    }

    return await this.desiredConditionRepository.findOne({
      where: { engineerId: engineer.id },
      loadEagerRelations: false,
      relationLoadStrategy: 'query', // JOINせず個別にSQL発行
      relations: ['desiredPriorityConditions'],
    });
  }
}
