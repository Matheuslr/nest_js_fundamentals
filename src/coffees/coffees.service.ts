import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './entities/coffees.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity/event.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeModel: Model<Coffee>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const coffee = await this.coffeModel.findOne({ _id: id }).exec();

    if (!coffee) {
      throw new NotFoundException(`coffee #${id} not found`);
    }

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = new this.coffeModel(createCoffeeDto);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: any) {
    const existingCoffee = await this.coffeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException(`coffee #${id} not found`);
    }

    return existingCoffee;
  }async remove(id: string) {
    const existingCoffee = await this.coffeModel
      .findOneAndDelete({ _id: id })
      .exec();
    return existingCoffee;
  }

  async recommendCoffee(coffee: Coffee) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new this.eventModel({
        name: 'recommend_coffee',
        type: 'coffee',
        payload: { coffeeId: coffee.id },
      });
      await recommendEvent.save({ session });
      await coffee.save({ session });

      await session.commitTransaction();
    } catch (err) {
      console.error(err)
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
}
