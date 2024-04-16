import { Injectable } from '@nestjs/common';
import { Profession } from '../professions/entities/profession.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExperiencedEntityMastersService {
  constructor(
    @InjectRepository(Profession)
    private readonly professionRepository: Repository<Profession>,
  ) {}

  async findAll() {
    const professions = await this.professionRepository.find();
    return {
      professions: professions.map((p) => ({ id: p.id, name: p.name })),
    };
  }
}
