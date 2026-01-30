import { MigrationInterface, QueryRunner } from "typeorm";

export class MIG17697737548671769773760099 implements MigrationInterface {
    name = 'MIG17697737548671769773760099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_id" uuid NOT NULL, "index" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "media" jsonb NOT NULL, "conversation_id" uuid NOT NULL, "text" character varying NOT NULL, "created_by" uuid NOT NULL, "read_by" jsonb NOT NULL, CONSTRAINT "UQ_8ee54d64a867c8ad0a7535f0ee9" UNIQUE ("ref_id"), CONSTRAINT "UQ_27c24b206210e731ef6ab9d6701" UNIQUE ("index"), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_type_enum" AS ENUM('Client', 'Admins')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_id" uuid NOT NULL, "index" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "firstname" character varying NOT NULL, "surname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "avatar" character varying, "timezone" character varying NOT NULL, "username" character varying NOT NULL, "display_name" character varying NOT NULL, "type" "public"."users_type_enum" NOT NULL, "is_email_verified" boolean NOT NULL DEFAULT false, "has_password" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_a28b52ea8291c2c68f472d57e9f" UNIQUE ("ref_id"), CONSTRAINT "UQ_c9d080535db79bcaaf24931e551" UNIQUE ("index"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_id" uuid NOT NULL, "index" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "is_onboarded" boolean NOT NULL, "refresh_token" character varying, "last_login_date" TIMESTAMP, "dark_mode" boolean NOT NULL, CONSTRAINT "UQ_50dd1a7b03a42ef1c82c8d5a9ff" UNIQUE ("ref_id"), CONSTRAINT "UQ_e81f8bb92802737337d35c00981" UNIQUE ("index"), CONSTRAINT "UQ_4ed056b9344e6f7d8d46ec4b302" UNIQUE ("user_id"), CONSTRAINT "PK_00f004f5922a0744d174530d639" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_id" uuid NOT NULL, "index" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "ongoing_participants" character varying array NOT NULL, "members" character varying array NOT NULL, "created_by" uuid NOT NULL, "last_message_id" uuid, CONSTRAINT "UQ_c7d8aa1971684c87de7cfd5c754" UNIQUE ("ref_id"), CONSTRAINT "UQ_6459af38f36d522495f636ae454" UNIQUE ("index"), CONSTRAINT "REL_ba9e5fd8456128908d86c01c5b" UNIQUE ("last_message_id"), CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."otps_purpose_enum" AS ENUM('LOGIN', 'RECOVERY')`);
        await queryRunner.query(`CREATE TABLE "otps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_id" uuid NOT NULL, "index" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "value" character varying(6) NOT NULL, "email" character varying NOT NULL, "purpose" "public"."otps_purpose_enum" NOT NULL, "expires_at" TIMESTAMP NOT NULL, CONSTRAINT "UQ_2437a482a24102a8ee3ed5a9198" UNIQUE ("ref_id"), CONSTRAINT "UQ_f4e31ff1c6dd486903065317515" UNIQUE ("index"), CONSTRAINT "UQ_10b310ef149685965bc39b8cf74" UNIQUE ("value"), CONSTRAINT "PK_91fef5ed60605b854a2115d2410" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4d025b3431171ff016586ba81ad" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "FK_ba9e5fd8456128908d86c01c5b6" FOREIGN KEY ("last_message_id") REFERENCES "messages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "FK_ba9e5fd8456128908d86c01c5b6"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4d025b3431171ff016586ba81ad"`);
        await queryRunner.query(`DROP TABLE "otps"`);
        await queryRunner.query(`DROP TYPE "public"."otps_purpose_enum"`);
        await queryRunner.query(`DROP TABLE "conversation"`);
        await queryRunner.query(`DROP TABLE "user_settings"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_type_enum"`);
        await queryRunner.query(`DROP TABLE "messages"`);
    }

}
