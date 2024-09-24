import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTelegramIDColumn1727141943298 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "telegram_id" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "telegram_id"`);
  }
}
