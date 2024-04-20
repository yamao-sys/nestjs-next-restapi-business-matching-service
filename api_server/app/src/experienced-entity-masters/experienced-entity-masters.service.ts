import { Injectable } from '@nestjs/common';
import { Profession } from '../professions/entities/profession.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgrammingLanguage } from '../programming-languages/entities/programming-languages.entity';

@Injectable()
export class ExperiencedEntityMastersService {
  constructor(
    @InjectRepository(Profession)
    private readonly professionRepository: Repository<Profession>,
    @InjectRepository(ProgrammingLanguage)
    private readonly programmingLanguageRepository: Repository<ProgrammingLanguage>,
  ) {}

  async findAll() {
    const professions = await this.professionRepository.find();
    const programmingLanguages =
      await this.programmingLanguageRepository.find();
    return {
      professions: professions.map((p) => ({ id: p.id, name: p.name })),
      programmingLanguages: programmingLanguages.map((p) => ({
        id: p.id,
        name: p.name,
      })),
    };
  }
}
