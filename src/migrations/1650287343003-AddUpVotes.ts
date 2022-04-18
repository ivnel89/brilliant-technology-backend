import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUpVotes1650287343003 implements MigrationInterface {
    name = 'AddUpVotes1650287343003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment_up_voters_user" ("commentId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_8df404e2fd67b786cdeadcad030" PRIMARY KEY ("commentId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ec5e4b1d6bfa50875a923aaf99" ON "comment_up_voters_user" ("commentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8262da3b48b5c65efafb210f03" ON "comment_up_voters_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "comment_up_voters_user" ADD CONSTRAINT "FK_ec5e4b1d6bfa50875a923aaf992" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comment_up_voters_user" ADD CONSTRAINT "FK_8262da3b48b5c65efafb210f031" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_up_voters_user" DROP CONSTRAINT "FK_8262da3b48b5c65efafb210f031"`);
        await queryRunner.query(`ALTER TABLE "comment_up_voters_user" DROP CONSTRAINT "FK_ec5e4b1d6bfa50875a923aaf992"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8262da3b48b5c65efafb210f03"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ec5e4b1d6bfa50875a923aaf99"`);
        await queryRunner.query(`DROP TABLE "comment_up_voters_user"`);
    }

}
