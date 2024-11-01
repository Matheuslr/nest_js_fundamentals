import { Coffee } from 'src/coffees/entities/coffees.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { CoffeRefactor1730500622348 } from 'src/migrations/1730500622348-CoffeRefactor';
import { SchemaSync1730501233526 } from 'src/migrations/1730501233526-SchemaSync';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [CoffeRefactor1730500622348, SchemaSync1730501233526],
});
