import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1686141014468 implements MigrationInterface {
    name = 'InitialMigration1686141014468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "fipePrice"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "fipePrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "sellPrice"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "sellPrice" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "sellPrice"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "sellPrice" numeric(12,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "fipePrice"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "fipePrice" numeric(12,2) NOT NULL DEFAULT '0'`);
    }

}
