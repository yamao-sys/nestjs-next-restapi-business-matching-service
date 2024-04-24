import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSkillsheets1713956880801 implements MigrationInterface {
  name = 'InitSkillsheets1713956880801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`skillsheets\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`engineer_id\` bigint NOT NULL, \`file_name\` varchar(255) NOT NULL, \`file_path\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_ee79db12c1303c99fd34f99776\` (\`engineer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`skillsheets\` ADD CONSTRAINT \`FK_ee79db12c1303c99fd34f99776e\` FOREIGN KEY (\`engineer_id\`) REFERENCES \`engineers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`skillsheets\` DROP FOREIGN KEY \`FK_ee79db12c1303c99fd34f99776e\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_ee79db12c1303c99fd34f99776\` ON \`skillsheets\``,
    );
    await queryRunner.query(`DROP TABLE \`skillsheets\``);
  }
}
