import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Engineer } from '../engineers/entities/engineer.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { putObject } from '../lib/awsService';
import { SkillSheet } from '../skillsheets/entities/skillsheet.entity';

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
    newEnginner.experiencedProgrammingLanguages = [];

    return newEnginner;
  }

  async assignAttributes(engineer: Engineer, params: Partial<Engineer>) {
    const assignedAttributesEngineer = this.engineerRepository.merge(
      engineer,
      params,
    );
    assignedAttributesEngineer.experiencedProfessions =
      params.experiencedProfessions;
    assignedAttributesEngineer.experiencedProgrammingLanguages =
      params.experiencedProgrammingLanguages;
    return assignedAttributesEngineer;
  }

  async validate(engineer: Engineer) {
    return validate(engineer);
  }

  async save(
    engineer: Engineer,
    skillsheetParams?: { skillsheetName: string; skillsheetData: string },
  ) {
    const savedEngineer = await this.engineerRepository.save(engineer);
    // スキルシートの更新がなければそのままreturn
    if (!skillsheetParams?.skillsheetName) {
      return savedEngineer;
    }
    if (
      savedEngineer.skillsheet?.fileName === skillsheetParams?.skillsheetName
    ) {
      return savedEngineer;
    }

    // ファイルアップロード
    const skillsheetPath = `${savedEngineer.userId}/skillsheet`;
    if (skillsheetParams.skillsheetData) {
      putObject(skillsheetPath, skillsheetParams.skillsheetData);
    }
    // S3のパス・ファイル名を保存
    if (!savedEngineer.skillsheet?.id) {
      savedEngineer.skillsheet = new SkillSheet();
    }
    savedEngineer.skillsheet.fileName = skillsheetParams.skillsheetName;
    savedEngineer.skillsheet.filePath = skillsheetPath;
    return await this.engineerRepository.save(savedEngineer);
  }

  async findOne(userId: string) {
    return await this.engineerRepository.findOne({
      where: { userId },
      loadEagerRelations: false,
      relationLoadStrategy: 'query', // JOINせず個別にSQL発行
      relations: [
        'experiencedProfessions',
        'experiencedProgrammingLanguages',
        'skillsheet',
      ],
    });
  }
}
