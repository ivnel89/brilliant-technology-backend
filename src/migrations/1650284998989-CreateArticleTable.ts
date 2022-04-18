import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateArticleTable1650284998989 implements MigrationInterface {
    name = 'CreateArticleTable1650284998989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "lastModifiedDate" TIMESTAMP NOT NULL DEFAULT now(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "authorId" uuid, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "parentArticleId" uuid`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_9cc3d58f73b9a1a26d7f001b9b1" FOREIGN KEY ("parentArticleId") REFERENCES "article"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_9cc3d58f73b9a1a26d7f001b9b1"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "parentArticleId"`);
        await queryRunner.query(`DROP TABLE "article"`);
    }

}
