import { Module } from '@nestjs/common';
import { DebugCommand } from './debug.command';
import { MigrateProfilesCommand } from './once-scripts/migrate-profiles.command';
import { MigrateProgrammingLanguagesCommand } from './once-scripts/migrate-programming-languages.command';

@Module({
  imports: [],
  providers: [
    DebugCommand,
    MigrateProfilesCommand,
    MigrateProgrammingLanguagesCommand,
  ],
})
export class CliModule {}
