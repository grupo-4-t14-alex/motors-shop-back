import { MigrationInterface, QueryRunner } from "typeorm";

export class S21686164531173 implements MigrationInterface {
    name = 'S21686164531173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_f011a88b8b052ffd0db75c1ad44"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "fuel"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "fuel" integer NOT NULL`);
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
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "fuel"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "fuel" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "ownerId" integer`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_f011a88b8b052ffd0db75c1ad44" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
