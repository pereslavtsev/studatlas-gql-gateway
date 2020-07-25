import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrabberModule } from './grabber/grabber.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: true,
      //playground: false,
    }),
    GrabberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
