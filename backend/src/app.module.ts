import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './app/core/core.module';
import { mongoConfig } from './config/mongo.config';
import { Connection } from 'mongoose';
import { VideoModule } from './app/video/video.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.url, {
      onConnectionCreate: (connection: Connection) => {
        connection.on('connected', () => console.log('MongoDB connected'));
        connection.on('open', () => console.log('MongoDB connection open'));
        connection.on('disconnected', () => console.log('MongoDB disconnected'));
        connection.on('disconnecting', () => console.log('MongoDB disconnecting'));
        connection.on('reconnected', () => console.log('MongoDB reconnected'));
    
        return connection;
      },
    }),
    CoreModule,
    VideoModule
  ],
})
export class AppModule {}
