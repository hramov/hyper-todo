import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterDurationType1727154641668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "task" drop column "duration";
      ALTER TABLE "task" add column "duration" integer;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "task" drop column "duration";
      ALTER TABLE "task" add column "duration" time;
    `);
  }
}
