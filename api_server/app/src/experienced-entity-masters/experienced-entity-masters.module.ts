import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExperiencedEntityMastersService } from './experienced-entity-masters.service';
import { ExperiencedEntityMastersController } from './experienced-entity-masters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profession } from '../professions/entities/profession.entity';
import * as OpenApiValidator from 'express-openapi-validator';
import { ProgrammingLanguage } from '../programming-languages/entities/programming-languages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profession, ProgrammingLanguage])],
  controllers: [ExperiencedEntityMastersController],
  providers: [ExperiencedEntityMastersService],
})
export class ExperiencedEntityMastersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ...OpenApiValidator.middleware({
          apiSpec:
            '/api_server/app/swagger/experienced_entity_masters/swagger.yml',
          validateRequests: true,
          validateResponses: true,
        }),
      )
      .forRoutes('experiencedEntityMasters');
  }
}
