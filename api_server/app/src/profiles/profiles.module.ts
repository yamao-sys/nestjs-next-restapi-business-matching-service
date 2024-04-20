import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Engineer } from '../engineers/entities/engineer.entity';
import * as OpenApiValidator from 'express-openapi-validator';

@Module({
  imports: [TypeOrmModule.forFeature([Engineer])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ...OpenApiValidator.middleware({
          apiSpec: '/api_server/app/swagger/profiles/swagger.yml',
          validateRequests: true,
          validateResponses: true,
        }),
      )
      .forRoutes('profiles');
  }
}
