import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './app-config/app-config.module';
import { ForumModule } from './forum/forum.module';
import { Comments } from './typeorm/entity/Comments';
import { Discussions } from './typeorm/entity/Discussion';
import { Upvote } from './typeorm/entity/Upvote';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Comments, Discussions, Upvote],
      synchronize: process.env.DATABASE_SYNC === 'true',
    }),
    ForumModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
