import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1687373763428 implements MigrationInterface {
    name = 'InitialMigration1687373763428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "UQ_d25f1ea79e282cc8a42bd616aa3" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "UQ_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "userId"`);
    }

}
