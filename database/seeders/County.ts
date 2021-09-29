import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

import County from 'App/Models/County';

import counties from '../json/counties.json';

export default class CountySeeder extends BaseSeeder {
  public async run() {
    await County.truncate(true);

    await County.createMany(counties);
  }
}
