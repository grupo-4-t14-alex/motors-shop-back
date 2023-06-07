import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1686099877530 implements MigrationInterface {
    name = 'InitialMigration1686099877530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "email" character varying(120) NOT NULL, "cpf" character varying(11) NOT NULL, "phone" character varying(11) NOT NULL, "birthDate" date NOT NULL, "description" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "password" character varying(120) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" SERIAL NOT NULL, "brand" character varying(50) NOT NULL, "model" character varying(120) NOT NULL, "year" integer NOT NULL, "fuel" character varying(50) NOT NULL, "km" character varying(7) NOT NULL, "color" character varying(50) NOT NULL, "fipePrice" numeric(12,2) NOT NULL DEFAULT '0', "sellPrice" numeric(12,2) NOT NULL DEFAULT '0', "description" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "ownerId" integer, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_f011a88b8b052ffd0db75c1ad44" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_f011a88b8b052ffd0db75c1ad44"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
