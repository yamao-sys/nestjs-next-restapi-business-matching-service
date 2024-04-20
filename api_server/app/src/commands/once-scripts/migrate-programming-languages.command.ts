import { Command, CommandRunner } from 'nest-commander';
import { datasource } from '../../../data-source';
import { ProgrammingLanguage } from '../../programming-languages/entities/programming-languages.entity';

@Command({
  name: 'migrate-programming-languages',
  description: 'Initialize Programming Language Entities',
})
export class MigrateProgrammingLanguagesCommand extends CommandRunner {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(_passedParam: string[]): Promise<void> {
    await datasource.initialize();
    const programmingLanguageRepository =
      datasource.getRepository(ProgrammingLanguage);
    // ProgrammingLanguageの初期データ投入
    const inputs = [
      { name: 'Go' },
      { name: 'Java' },
      { name: 'JavaScript' },
      { name: 'Kotlin' },
      { name: 'Objective-C' },
      { name: 'Perl' },
      { name: 'PHP' },
      { name: 'Python' },
      { name: 'Ruby' },
      { name: 'Rust' },
      { name: 'Scala' },
      { name: 'Swift' },
      { name: 'TypeScript' },
    ];

    await programmingLanguageRepository.save(inputs);
    console.log('complete migrating!!');
  }
}
