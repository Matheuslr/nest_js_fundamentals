import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeSchema } from './entities/coffees.entity';
import { EventSchema } from 'src/events/entities/event.entity/event.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coffee.name, schema: CoffeSchema }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
