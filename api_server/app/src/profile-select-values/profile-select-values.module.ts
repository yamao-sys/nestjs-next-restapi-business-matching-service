import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProfileSelectValuesService } from './profile-select-values.service';
import { ProfileSelectValuesController } from './profile-select-values.controller';
import * as OpenApiValidator from 'express-openapi-validator';

@Module({
  controllers: [ProfileSelectValuesController],
  providers: [ProfileSelectValuesService],
})
export class ProfileSelectValuesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ...OpenApiValidator.middleware({
          apiSpec: '/api_server/app/swagger/profile_select_values/swagger.yml',
          validateRequests: true,
          validateResponses: true,
        }),
      )
      .forRoutes('profileSelectValues');
  }
}
