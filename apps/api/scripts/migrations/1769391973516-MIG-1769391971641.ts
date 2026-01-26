import { MigrationInterface, QueryRunner } from "typeorm";

export class MIG17693919716411769391973516 implements MigrationInterface {
    name = 'MIG17693919716411769391973516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_id" uuid NOT NULL, "index" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "firstname" character varying NOT NULL, "surname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "avatar" character varying, "timezone" TIMESTAMP WITH TIME ZONE NOT NULL, "username" character varying NOT NULL, "display_name" character varying NOT NULL, CONSTRAINT "UQ_a28b52ea8291c2c68f472d57e9f" UNIQUE ("ref_id"), CONSTRAINT "UQ_c9d080535db79bcaaf24931e551" UNIQUE ("index"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_id" uuid NOT NULL, "index" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "is_onboarded" boolean NOT NULL, "refresh_token" character varying, "last_login_date" TIMESTAMP, "dark_mode" boolean NOT NULL, CONSTRAINT "UQ_50dd1a7b03a42ef1c82c8d5a9ff" UNIQUE ("ref_id"), CONSTRAINT "UQ_e81f8bb92802737337d35c00981" UNIQUE ("index"), CONSTRAINT "UQ_4ed056b9344e6f7d8d46ec4b302" UNIQUE ("user_id"), CONSTRAINT "PK_00f004f5922a0744d174530d639" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_id" uuid NOT NULL, "index" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "media" jsonb NOT NULL, "conversation_id" uuid NOT NULL, "text" character varying NOT NULL, "created_by" uuid NOT NULL, "read_by" jsonb NOT NULL, CONSTRAINT "UQ_8ee54d64a867c8ad0a7535f0ee9" UNIQUE ("ref_id"), CONSTRAINT "UQ_27c24b206210e731ef6ab9d6701" UNIQUE ("index"), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_id" uuid NOT NULL, "index" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "ongoing_participants" character varying array NOT NULL, "members" character varying array NOT NULL, "created_by" uuid NOT NULL, CONSTRAINT "UQ_c7d8aa1971684c87de7cfd5c754" UNIQUE ("ref_id"), CONSTRAINT "UQ_6459af38f36d522495f636ae454" UNIQUE ("index"), CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "conversation"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "user_settings"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
