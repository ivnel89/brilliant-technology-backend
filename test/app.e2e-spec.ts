import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'src/comment/comment.module';
import { ArticleModule } from 'src/article/article.module';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TestContainers } from './test-containers';
import { BullModule } from '@nestjs/bull';

jest.setTimeout(10000)

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let container: TestContainers;
  let dbConfig;
  let redisConfig;
  beforeAll(async () => {
    container = new TestContainers();
    await container.start();
    dbConfig = container.dbConfig;
    redisConfig = container.redisConfig;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          "type": "postgres",
          "host": dbConfig.DB_HOST,
          "port": dbConfig.DB_PORT,
          "username": dbConfig.DB_USERNAME,
          "password": dbConfig.DB_PASSWORD,
          "database": dbConfig.DB_NAME,
          "entities": ["src/**/*.entity{.ts,.js}"],
          "synchronize": false,
          "migrationsRun": true,
          "migrationsTableName": "migrations",
          "migrations": ["src/migrations/*{.ts,.js}"],
          logging:["query","error"]
        }),
        BullModule.forRoot({
          redis: {
            host: redisConfig.REDIS_HOST,
            port: Number(redisConfig.REDIS_PORT),
          },
        }),
        CommentModule,
        ArticleModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {

  });

  afterAll(async () => {
    await app.close();
    await container.stop();
  })
    let userId: string;
    let articleId: string;
    let commentId: string;
    it('/user (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send({
          firstName: "Foo",
          lastName: "Bar",
          displayPicture: "www.example.com/img.png"
        })
        .expect(201)
        expect(response.body).toStrictEqual({
          id: expect.any(String),
          displayPicture: 'www.example.com/img.png',
          firstName: 'Foo',
          lastName: 'Bar'
        });
        userId = response.body.id;
    });
    it('/user/:id (GET)', () => {
      return request(app.getHttpServer())
        .get(`/user/${userId}`)
        .expect(200)
        .expect({
          id: userId,
          displayPicture: 'www.example.com/img.png',
          firstName: 'Foo',
          lastName: 'Bar',
        });
    });
    it('/user/:id (PATCH)', () => {
      return request(app.getHttpServer())
        .patch(`/user/${userId}`)
        .send({
          firstName: "John",
          lastName: "McApple",
          displayPicture: "www.example.com/img2.png"
        })
        .expect(200)
        .expect({
          id: userId,
          firstName: "John",
          lastName: "McApple",
          displayPicture: "www.example.com/img2.png"
        });
    });
    it('/user (GET)', () => {
      return request(app.getHttpServer())
        .get('/user')
        .expect(200)
        .expect([{
          id: userId,
          firstName: "John",
          lastName: "McApple",
          displayPicture: "www.example.com/img2.png"
        }]);
    });
    it('/article (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/article')
        .send({
          content: "Lorem Ipsum",
          authorId: userId,
        })
        .expect(201)
        expect(response.body).toStrictEqual({
          id: expect.any(String),
          content: "Lorem Ipsum",
          author: {
            id: userId,
            firstName: "John",
            lastName: "McApple",
            displayPicture: "www.example.com/img2.png"
          },
          createdDate: expect.any(String),
        });
        articleId = response.body.id;
    })
    it('/article (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/article')
        .expect(200);

        expect(response.body).toStrictEqual([
          {
            id: articleId,
            content: 'Lorem Ipsum',
            author: {
              id: userId,
              displayPicture: 'www.example.com/img2.png',
              firstName: 'John',
              lastName: 'McApple',
            },
            createdDate: expect.any(String),
            comments: [],
          },
        ]);
    });
    it('/comment (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/comment')
        .send({
          content: "Comment Lorem Ipsum",
          authorId: userId,
          articleId
        })
        .expect(201)
        expect(response.body).toStrictEqual({
          id: expect.any(String),
          content: "Comment Lorem Ipsum",
          createdDate: expect.any(String),
          author: {
            id: userId,
            firstName: "John",
            lastName: "McApple",
            displayPicture: "www.example.com/img2.png"
          },
          replies:[]
        });
        commentId = response.body.id;
    })
    it('/comment/:id/upvote/add (PUT)', async () => {
      const response = await request(app.getHttpServer())
        .put(`/comment/${commentId}/upvote/add`)
        .send({
          userId,          
        })
        .expect(200)
        expect(response.body).toStrictEqual({
          id: expect.any(String),
          content: "Comment Lorem Ipsum",
          createdDate: expect.any(String),
          author: {
            id: userId,
            firstName: "John",
            lastName: "McApple",
            displayPicture: "www.example.com/img2.png"
          },
          replies:[],
          upVotes: expect.any(Number),
          upVoted: expect.any(Boolean)
        });
    })
    it('/article/:id (GET)', async () => {
      await new Promise(res=>setTimeout(() => res(true), 5000))
      const response = await request(app.getHttpServer())
        .get(`/article/${articleId}?requesterId=${userId}`)
        .expect(200);

        expect(response.body).toStrictEqual(
          {
            id: articleId,
            content: 'Lorem Ipsum',
            author: {
              id: userId,
              displayPicture: 'www.example.com/img2.png',
              firstName: 'John',
              lastName: 'McApple',
            },
            createdDate: expect.any(String),
            comments: [{
              id: expect.any(String),
              content: "Comment Lorem Ipsum",
              createdDate: expect.any(String),
              author: {
                id: userId,
                firstName: "John",
                lastName: "McApple",
                displayPicture: "www.example.com/img2.png"
              },
              replies:[],
              upVotes: expect.any(Number),
              upVoted: expect.any(Boolean)
            }
            ],
          },
        );
    });
    it('/comment/:id/upvote/remove (PUT)', async () => {
      const response = await request(app.getHttpServer())
        .put(`/comment/${commentId}/upvote/remove`)
        .send({
          userId,          
        })
        .expect(200)
        expect(response.body).toStrictEqual({
          id: expect.any(String),
          content: "Comment Lorem Ipsum",
          createdDate: expect.any(String),
          author: {
            id: userId,
            firstName: "John",
            lastName: "McApple",
            displayPicture: "www.example.com/img2.png"
          },
          replies:[],
          upVotes: expect.any(Number),
          upVoted: expect.any(Boolean)
        });
    })
    it('/user/:id (DELETE)', () => {
      return request(app.getHttpServer())
        .delete(`/user/${userId}`)
        .expect(200)
    });
    it('/user (GET)', () => {
      return request(app.getHttpServer())
        .get('/user')
        .expect(200)
        .expect([]);
    });
});
