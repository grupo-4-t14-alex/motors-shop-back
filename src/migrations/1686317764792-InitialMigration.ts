import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1686317764792 implements MigrationInterface {
    name = 'InitialMigration1686317764792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cars" ("id" SERIAL NOT NULL, "brand" character varying(50) NOT NULL, "model" character varying(120) NOT NULL, "year" integer NOT NULL, "fuel" integer NOT NULL, "km" integer NOT NULL, "color" character varying(50) NOT NULL, "fipePrice" integer NOT NULL, "sellPrice" integer NOT NULL, "description" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cars"`);
    }

}
