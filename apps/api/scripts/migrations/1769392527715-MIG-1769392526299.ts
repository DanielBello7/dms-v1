import { MigrationInterface, QueryRunner } from "typeorm";

export class MIG17693925262991769392527715 implements MigrationInterface {
    name = 'MIG17693925262991769392527715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "timezone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "timezone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "timezone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "timezone" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
