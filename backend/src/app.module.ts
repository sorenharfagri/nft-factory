import { Module } from '@nestjs/common';
import { ProvidersService } from './services/providers.service';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events-controller';

@Module({
  providers: [
    ProvidersService,
    EventsService
  ],
  controllers: [
    EventsController
  ]
})
export class AppModule { }
