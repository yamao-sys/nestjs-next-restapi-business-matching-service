import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DesiredConditionsService } from './desired-conditions.service';
import { DesiredConditionsController } from './desired-conditions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesiredCondition } from './entities/desired-condition.entity';
import * as OpenApiValidator from 'express-openapi-validator';
import { Engineer } from '../engineers/entities/engineer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DesiredCondition, Engineer])],
  controllers: [DesiredConditionsController],
  providers: [DesiredConditionsService],
})
export class DesiredConditionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ...OpenApiValidator.middleware({
          apiSpec: '/api_server/app/swagger/desired_conditions/swagger.yml',
          validateRequests: true,
          validateResponses: true,
        }),
      )
      .forRoutes('desiredConditions');
  }
}
