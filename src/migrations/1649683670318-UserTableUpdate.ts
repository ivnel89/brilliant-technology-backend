import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTableUpdate1649683670318 implements MigrationInterface {
    name = 'UserTableUpdate1649683670318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedDate" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedDate"`);
    }

}
