import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DesiredConditionSelectValuesService } from './desired-condition-select-values.service';
import { DesiredConditionSelectValuesController } from './desired-condition-select-values.controller';
import * as OpenApiValidator from 'express-openapi-validator';

@Module({
  controllers: [DesiredConditionSelectValuesController],
  providers: [DesiredConditionSelectValuesService],
})
export class DesiredConditionSelectValuesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ...OpenApiValidator.middleware({
          apiSpec:
            '/api_server/app/swagger/desired_condition_select_values/swagger.yml',
          validateRequests: true,
          validateResponses: true,
        }),
      )
      .forRoutes('desiredConditionSelectValues');
  }
}
