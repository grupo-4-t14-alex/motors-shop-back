import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdd1686864109980 implements MigrationInterface {
    name = 'CreateAdd1686864109980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "cep" character varying(9) NOT NULL, "estate" character varying(50) NOT NULL, "city" character varying(50) NOT NULL, "street" character varying(50) NOT NULL, "number" character varying(7) NOT NULL, "complement" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "email" character varying(120) NOT NULL, "cpf" character varying(11) NOT NULL, "phone" character varying(11) NOT NULL, "birthDate" date NOT NULL, "description" character varying NOT NULL, "admin" boolean NOT NULL DEFAULT false, "password" character varying(120) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" SERIAL NOT NULL, "brand" character varying(50) NOT NULL, "model" character varying(120) NOT NULL, "year" integer NOT NULL, "fuel" integer NOT NULL, "km" integer NOT NULL, "color" character varying(50) NOT NULL, "fipePrice" integer NOT NULL, "sellPrice" integer NOT NULL, "description" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "userId" integer, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_6431b6fec12c4090bb357fba2c2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_6431b6fec12c4090bb357fba2c2"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
