import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCommentTable1649941274357 implements MigrationInterface {
    name = 'CreateCommentTable1649941274357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "lastModifiedDate" TIMESTAMP NOT NULL DEFAULT now(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "authorId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
