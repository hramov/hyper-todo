import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdToCategory1727234935196 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" ADD column "user_id" integer references "user"(id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" drop column "user_id"`);
  }
}
