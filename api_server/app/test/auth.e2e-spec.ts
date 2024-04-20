import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { datasource } from '../data-source';
import { User } from '../src/users/entities/user.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // モジュールからインスタンスの作成
    app = moduleFixture.createNestApplication();

    // モジュールの初期化
    await app.init();
  });

  // テストで起動したNestアプリを終了しないとJestで警告が発生するため、以下のコードで終了
  afterAll(async () => {
    await app.close();
    await moduleFixture.close();
  });

  describe('/auth/validate_sign_up (POST)', () => {
    it('正常系', () => {
      return request(app.getHttpServer())
        .post('/auth/validate_sign_up')
        .send({
          email: 'test@example.com',
          password: 'password',
        })
        .expect(200)
        .expect({
          errors: {},
        });
    });

    it('異常系', () => {
      return request(app.getHttpServer())
        .post('/auth/validate_sign_up')
        .send({
          email: '',
          password: '',
        })
        .expect(200)
        .expect({
          errors: {
            email: [
              'メールアドレスの形式が不正です。',
              'メールアドレスは必須です。',
            ],
            password: [
              'パスワードは8文字以上で入力をお願いします。',
              'パスワードは必須です。',
            ],
          },
        });
    });
  });

  describe('/auth/sign_up (POST)', () => {
    it('正常系', () => {
      return request(app.getHttpServer())
        .post('/auth/sign_up')
        .send({
          email: 'test@example.com',
          password: 'password',
        })
        .expect(200)
        .expect({
          errors: {},
        });
    });

    it('異常系', () => {
      return request(app.getHttpServer())
        .post('/auth/sign_up')
        .send({
          email: '',
          password: '',
        })
        .expect(200)
        .expect({
          errors: {
            email: [
              'メールアドレスの形式が不正です。',
              'メールアドレスは必須です。',
            ],
            password: [
              'パスワードは8文字以上で入力をお願いします。',
              'パスワードは必須です。',
            ],
          },
        });
    });
  });

  describe('/auth/sign_in (POST)', () => {
    beforeAll(async () => {
      await datasource.initialize();
      const userRepository = datasource.getRepository(User);
      await userRepository.save({
        email: 'test@example.com',
        password: 'password',
      });
    });

    it('正常系', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/sign_in')
        .send({
          email: 'test@example.com',
          password: 'password',
        })
        .expect(200)
        .expect({
          errors: [],
        });
      const cookie = res.get('Set-Cookie')[0];
      const { body } = await request(app.getHttpServer())
        .get('/todos')
        .set('Cookie', cookie)
        .expect(200);

      expect(body.todos).toEqual([]);
    });

    it('異常系', () => {
      return request(app.getHttpServer())
        .post('/auth/sign_in')
        .send({
          email: 'test@example.comm',
          password: 'password',
        })
        .expect(200)
        .expect({
          errors: ['メールアドレス、またはパスワードが異なります。'],
        });
    });
  });
});
