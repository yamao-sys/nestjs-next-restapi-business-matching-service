import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ExperiencedEntityMastersModule } from './experienced-entity-masters/experienced-entity-masters.module';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TodosModule,
    UsersModule,
    AuthModule,
    ProfilesModule,
    ExperiencedEntityMastersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
