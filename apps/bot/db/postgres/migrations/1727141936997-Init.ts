import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1727141936997 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            create table "user" (
                id serial unique,
                first_name varchar(50),
                last_name varchar(50),
                username varchar(50),
                language_code varchar(5),
                created_at timestamptz default now()
            );

            create table "category" (
                id serial unique,
                title varchar(100),
                description text,
                color varchar(10)
            );

            create table "task" (
                id serial unique,
                category_id integer references "category"(id),
                user_id integer references "user"(id),
                period varchar(10),
                cron_period jsonb,
                title varchar(100),
                description text,
                "date" date,
                date_start date,
                date_end date,
                duration integer,
                deadline timestamptz,
                status varchar(20),
                is_notified boolean default false
            );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
           drop table "task";
           drop table "category";
           drop table "user";
   `);
  }
}
