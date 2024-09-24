import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterDeadlineType1727154811047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "task" drop column deadline;
      ALTER table "task" add column deadline timestamptz;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "task" drop column deadline;
        ALTER table "task" add column deadline time;
      `);
  }
}
