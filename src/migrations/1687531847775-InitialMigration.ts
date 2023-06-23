import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1687531847775 implements MigrationInterface {
    name = 'InitialMigration1687531847775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "REL_d25f1ea79e282cc8a42bd616aa"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "reset_token" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_217ba147c5de6c107f2fa7fa271" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_token"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "REL_d25f1ea79e282cc8a42bd616aa" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
