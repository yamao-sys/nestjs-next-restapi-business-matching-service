import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { datasource } from '../data-source';
import { User } from '../src/users/entities/user.entity';
import { Engineer } from '../src/engineers/entities/engineer.entity';
import { ExperiencedDuration } from '../src/experiences/entities/base';
import {
  DesiredCondition,
  ExpectedStartTimings,
  JobSeekingStatus,
  RemortWork,
  WorkingTimeZones,
  WorkingTimes,
} from '../src/desired-conditions/entities/desired-condition.entity';
import { PriorityCondition } from '../src/desired-priority-conditions/entities/desired-priority-condition.entity';
import { CurrentEmployment } from 'src/engineers/enums';

describe('DesiredConditionsController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let cookie: string;
  let user: User;
  let engineer: Engineer;

  beforeAll(async () => {
    await datasource.initialize();
  });

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // モジュールからインスタンスの作成
    app = moduleFixture.createNestApplication();
    // モジュールの初期化
    await app.init();
  });

  // テストで起動したNestアプリを終了しないとJestで警告が発生するため、以下のコードで終了
  afterEach(async () => {
    await app.close();
    await moduleFixture.close();

    // テスト毎に、テーブル内のデータを削除する。
    await datasource.synchronize(true);
  });

  describe('/desiredConditions/ (GET)', () => {
    describe('正常系', () => {
      beforeEach(async () => {
        await request(app.getHttpServer()).post('/auth/sign_up').send({
          email: 'test@example.com',
          password: 'password',
        });
        const userRepository = datasource.getRepository(User);
        user = await userRepository.findOneBy({ email: 'test@example.com' });

        const engineerRepository = datasource.getRepository(Engineer);
        engineer = await engineerRepository.save({
          userId: user.id,
          lastName: 'test_last_name',
          firstName: 'test_first_name',
          birthday: '1111-01-01',
          currentEmployment: CurrentEmployment.FLEELANCE,
          inWorkingCompanyName: 'test_in_working_company_name',
          tel: 'test_tel',
          latestProject: 'test_latest_project',
          currentHourlyWage: 6000,
          experiencedDuration: ExperiencedDuration.LESS_THAN_ONE_YEAR,
          selfPromotion: 'test_self_promotion',
        });

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
        cookie = res.get('Set-Cookie')[0];
      });

      it('正常系(未登録時)', async () => {
        return await request(app.getHttpServer())
          .get('/desiredConditions')
          .set('Cookie', cookie)
          .expect(200)
          .expect({
            engineerId: engineer.id,
            jobSeekingStatus: JobSeekingStatus.SEEKING,
            expectedStartTimings: ExpectedStartTimings.NOT_SETTED,
            minWorkingTimes: WorkingTimes.NOT_SETTED,
            maxWorkingTimes: WorkingTimes.NOT_SETTED,
            workingTimeZone: WorkingTimeZones.NOT_SETTED,
            remortWork: RemortWork.NOT_SETTED,
            remarks: '',
            desiredPriorityConditions: [],
          });
      });

      it('正常系(登録済み)', async () => {
        const desiredConditionRepository =
          datasource.getRepository(DesiredCondition);
        await desiredConditionRepository.save({
          engineerId: engineer.id,
          jobSeekingStatus: JobSeekingStatus.SEEKING,
          expectedStartTimings: ExpectedStartTimings.WITHIN_NEXT_MONTH,
          minWorkingTimes: WorkingTimes.ONE_DAY_TO_A_WEEK,
          maxWorkingTimes: WorkingTimes.TWO_DAYS_TO_A_WEEK,
          workingTimeZone: WorkingTimeZones.MORNING_NIGHT_WORKDAY_OR_HOLIDAY,
          remortWork: RemortWork.FULL_REMORT,
          remarks: 'test_remark',
          desiredPriorityConditions: [
            {
              priority: 1,
              condition: PriorityCondition.REVENUE,
            },
            {
              priority: 2,
              condition: PriorityCondition.WANT_TO_ACQUIRE_SKILL,
            },
          ],
        });

        const { body } = await request(app.getHttpServer())
          .get('/desiredConditions')
          .set('Cookie', cookie)
          .expect(200);
        expect(body.jobSeekingStatus).toBe(JobSeekingStatus.SEEKING);
        expect(body.expectedStartTimings).toBe(
          ExpectedStartTimings.WITHIN_NEXT_MONTH,
        );
        expect(body.minWorkingTimes).toBe(WorkingTimes.ONE_DAY_TO_A_WEEK);
        expect(body.maxWorkingTimes).toBe(WorkingTimes.TWO_DAYS_TO_A_WEEK);
        expect(body.workingTimeZone).toBe(
          WorkingTimeZones.MORNING_NIGHT_WORKDAY_OR_HOLIDAY,
        );
        expect(body.remortWork).toBe(RemortWork.FULL_REMORT);
        expect(body.remarks).toBe('test_remark');
        expect(body.desiredPriorityConditions[0].priority).toBe(1);
        expect(body.desiredPriorityConditions[0].condition).toBe(
          PriorityCondition.REVENUE,
        );
      });
    });

    describe('異常系', () => {
      it('未ログインの時、401が返ること', async () => {
        return request(app.getHttpServer()).get('/profiles').expect(401);
      });
    });
  });

  describe('/desiredConditions/ (POST)', () => {
    describe('正常系', () => {
      beforeEach(async () => {
        await request(app.getHttpServer()).post('/auth/sign_up').send({
          email: 'test@example.com',
          password: 'password',
        });
        const userRepository = datasource.getRepository(User);
        user = await userRepository.findOneBy({ email: 'test@example.com' });

        const engineerRepository = datasource.getRepository(Engineer);
        engineer = await engineerRepository.save({
          userId: user.id,
          lastName: 'test_last_name',
          firstName: 'test_first_name',
          birthday: '1111-01-01',
          currentEmployment: CurrentEmployment.FLEELANCE,
          inWorkingCompanyName: 'test_in_working_company_name',
          tel: 'test_tel',
          latestProject: 'test_latest_project',
          currentHourlyWage: 6000,
          experiencedDuration: ExperiencedDuration.LESS_THAN_ONE_YEAR,
          selfPromotion: 'test_self_promotion',
        });

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
        cookie = res.get('Set-Cookie')[0];
      });

      it('正常系(未登録時に登録できること)', async () => {
        const desiredConditionRepository =
          datasource.getRepository(DesiredCondition);
        expect(
          await desiredConditionRepository.findOneBy({
            engineerId: engineer.id,
          }),
        ).toBeFalsy();

        await request(app.getHttpServer())
          .post('/desiredConditions')
          .set('Cookie', cookie)
          .send({
            jobSeekingStatus: JobSeekingStatus.SEEKING,
            expectedStartTimings: ExpectedStartTimings.WITHIN_NEXT_MONTH,
            minWorkingTimes: WorkingTimes.ONE_DAY_TO_A_WEEK,
            maxWorkingTimes: WorkingTimes.TWO_DAYS_TO_A_WEEK,
            workingTimeZone: WorkingTimeZones.MORNING_NIGHT_WORKDAY_OR_HOLIDAY,
            remortWork: RemortWork.FULL_REMORT,
            remarks: 'test_remark',
            desiredPriorityConditions: [
              {
                priority: 1,
                condition: PriorityCondition.REVENUE,
              },
              {
                priority: 2,
                condition: PriorityCondition.WANT_TO_ACQUIRE_SKILL,
              },
            ],
          })
          .expect(201);
        const createdDesiredCondition =
          await desiredConditionRepository.findOne({
            where: { engineerId: engineer.id },
            loadEagerRelations: false,
            relationLoadStrategy: 'query', // JOINせず個別にSQL発行
            relations: ['desiredPriorityConditions'],
          });
        expect(createdDesiredCondition.jobSeekingStatus).toBe(
          JobSeekingStatus.SEEKING,
        );
        expect(createdDesiredCondition.expectedStartTimings).toBe(
          ExpectedStartTimings.WITHIN_NEXT_MONTH,
        );
        expect(createdDesiredCondition.minWorkingTimes).toBe(
          WorkingTimes.ONE_DAY_TO_A_WEEK,
        );
        expect(createdDesiredCondition.maxWorkingTimes).toBe(
          WorkingTimes.TWO_DAYS_TO_A_WEEK,
        );
        expect(createdDesiredCondition.workingTimeZone).toBe(
          WorkingTimeZones.MORNING_NIGHT_WORKDAY_OR_HOLIDAY,
        );
        expect(createdDesiredCondition.remortWork).toBe(RemortWork.FULL_REMORT);
        expect(createdDesiredCondition.remarks).toBe('test_remark');
        expect(
          createdDesiredCondition.desiredPriorityConditions[0].priority,
        ).toBe(1);
        expect(
          createdDesiredCondition.desiredPriorityConditions[0].condition,
        ).toBe(PriorityCondition.REVENUE);
        expect(
          createdDesiredCondition.desiredPriorityConditions[1].priority,
        ).toBe(2);
        expect(
          createdDesiredCondition.desiredPriorityConditions[1].condition,
        ).toBe(PriorityCondition.WANT_TO_ACQUIRE_SKILL);
      });

      it('正常系(登録済みのプロフィールが更新できること)', async () => {
        const desiredConditionRepository =
          datasource.getRepository(DesiredCondition);
        await desiredConditionRepository.save({
          engineerId: engineer.id,
          jobSeekingStatus: JobSeekingStatus.SEEKING,
          expectedStartTimings: ExpectedStartTimings.WITHIN_NEXT_MONTH,
          minWorkingTimes: WorkingTimes.ONE_DAY_TO_A_WEEK,
          maxWorkingTimes: WorkingTimes.TWO_DAYS_TO_A_WEEK,
          workingTimeZone: WorkingTimeZones.MORNING_NIGHT_WORKDAY_OR_HOLIDAY,
          remortWork: RemortWork.FULL_REMORT,
          remarks: 'test_remark',
          desiredPriorityConditions: [
            {
              priority: 1,
              condition: PriorityCondition.REVENUE,
            },
            {
              priority: 2,
              condition: PriorityCondition.WANT_TO_ACQUIRE_SKILL,
            },
          ],
        });

        await request(app.getHttpServer())
          .post('/desiredConditions')
          .set('Cookie', cookie)
          .send({
            jobSeekingStatus: JobSeekingStatus.NOT_SEEKING,
            expectedStartTimings: ExpectedStartTimings.WITHIN_MONTH,
            minWorkingTimes: WorkingTimes.TWO_DAYS_TO_A_WEEK,
            maxWorkingTimes: WorkingTimes.THREE_DAYS_TO_A_WEEK,
            workingTimeZone: WorkingTimeZones.DAYTIME_WORKDAY,
            remortWork: RemortWork.NO_DETAILED,
            remarks: 'test_remark_edited',
            desiredPriorityConditions: [
              {
                priority: 1,
                condition: PriorityCondition.REMORT,
              },
            ],
          })
          .expect(201);
        const updatedDesiredCondition =
          await desiredConditionRepository.findOne({
            where: { engineerId: engineer.id },
            loadEagerRelations: false,
            relationLoadStrategy: 'query', // JOINせず個別にSQL発行
            relations: ['desiredPriorityConditions'],
          });
        expect(updatedDesiredCondition.jobSeekingStatus).toBe(
          JobSeekingStatus.NOT_SEEKING,
        );
        expect(updatedDesiredCondition.expectedStartTimings).toBe(
          ExpectedStartTimings.WITHIN_MONTH,
        );
        expect(updatedDesiredCondition.minWorkingTimes).toBe(
          WorkingTimes.TWO_DAYS_TO_A_WEEK,
        );
        expect(updatedDesiredCondition.maxWorkingTimes).toBe(
          WorkingTimes.THREE_DAYS_TO_A_WEEK,
        );
        expect(updatedDesiredCondition.workingTimeZone).toBe(
          WorkingTimeZones.DAYTIME_WORKDAY,
        );
        expect(updatedDesiredCondition.remortWork).toBe(RemortWork.NO_DETAILED);
        expect(updatedDesiredCondition.remarks).toBe('test_remark_edited');
        expect(updatedDesiredCondition.desiredPriorityConditions.length).toBe(
          1,
        );
        expect(
          updatedDesiredCondition.desiredPriorityConditions[0].priority,
        ).toBe(1);
        expect(
          updatedDesiredCondition.desiredPriorityConditions[0].condition,
        ).toBe(PriorityCondition.REMORT);
      });
    });

    describe('異常系', () => {
      it('未ログインの時、401が返ること', async () => {
        return request(app.getHttpServer())
          .post('/desiredConditions')
          .send({
            jobSeekingStatus: JobSeekingStatus.SEEKING,
            expectedStartTimings: ExpectedStartTimings.WITHIN_NEXT_MONTH,
            minWorkingTimes: WorkingTimes.ONE_DAY_TO_A_WEEK,
            maxWorkingTimes: WorkingTimes.TWO_DAYS_TO_A_WEEK,
            workingTimeZone: WorkingTimeZones.MORNING_NIGHT_WORKDAY_OR_HOLIDAY,
            remortWork: RemortWork.FULL_REMORT,
            remarks: 'test_remark',
            desiredPriorityConditions: [
              {
                priority: 1,
                condition: PriorityCondition.REVENUE,
              },
              {
                priority: 2,
                condition: PriorityCondition.WANT_TO_ACQUIRE_SKILL,
              },
            ],
          })
          .expect(401);
      });
    });
  });
});
