import { Command, CommandRunner } from 'nest-commander';
import { Profession } from '../../professions/entities/profession.entity';
import { datasource } from '../../../data-source';

@Command({
  name: 'migrate-profiles',
  description: 'Initialize Profile Entities',
})
export class MigrateProfilesCommand extends CommandRunner {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(_passedParam: string[]): Promise<void> {
    await datasource.initialize();
    const profileRepository = datasource.getRepository(Profession);
    // Profileの初期データ投入
    const inputs = [
      { name: 'フルスタック' },
      { name: 'バックエンド' },
      { name: 'フロントエンド' },
      { name: 'インフラ' },
    ];

    await profileRepository.save(inputs);
  }
}
