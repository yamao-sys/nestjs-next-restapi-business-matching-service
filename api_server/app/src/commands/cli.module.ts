import { Module } from '@nestjs/common';
import { DebugCommand } from './debug.command';
import { MigrateProfilesCommand } from './once-scripts/migrate-profiles.command';

@Module({
  imports: [],
  providers: [DebugCommand, MigrateProfilesCommand],
})
export class CliModule {}
