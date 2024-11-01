import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1730501233526 implements MigrationInterface {
  name = 'SchemaSync1730501233526';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "description" TO "descriptions"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "descriptions" TO "description"`,
    );
  }
}
