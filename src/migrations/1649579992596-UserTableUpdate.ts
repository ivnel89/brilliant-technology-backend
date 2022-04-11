import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTableUpdate1649579992596 implements MigrationInterface {
    name = 'UserTableUpdate1649579992596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "lastModifiedDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastModifiedDate"`);
    }

}
