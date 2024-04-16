import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitEngineers1712988739566 implements MigrationInterface {
  name = 'InitEngineers1712988739566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`engineers\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`user_id\` bigint NOT NULL, \`last_name\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`birthday\` date NOT NULL, \`current_employment\` enum ('fleelance', 'fulltime', 'other') NOT NULL DEFAULT 'fleelance', \`in_working_company_name\` varchar(255) NOT NULL, \`tel\` varchar(255) NOT NULL, \`latest_project\` varchar(255) NOT NULL, \`current_hourly_wage\` int NOT NULL, \`experienced_duration\` enum ('lessThanOneYear', 'junior', 'middle', 'senior', 'expert') NOT NULL DEFAULT 'lessThanOneYear', \`self_promotion\` varchar(255) NOT NULL, UNIQUE INDEX \`REL_8a7ada0719c1824c3f0cb74c63\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`engineers\` ADD CONSTRAINT \`FK_8a7ada0719c1824c3f0cb74c63d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`engineers\` DROP FOREIGN KEY \`FK_8a7ada0719c1824c3f0cb74c63d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_8a7ada0719c1824c3f0cb74c63\` ON \`engineers\``,
    );
    await queryRunner.query(`DROP TABLE \`engineers\``);
  }
}
