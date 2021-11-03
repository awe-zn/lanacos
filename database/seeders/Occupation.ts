import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

import Occupation from 'App/Models/Occupation';

import occupations from '../json/occupations.json';

export default class OccupationSeeder extends BaseSeeder {
  public async run() {
    await Occupation.truncate(true);

    const escapedOccupations = occupations.map(({ code, ...data }) => ({
      ...data,
      code: Number(code),
    }));

    await Occupation.createMany(escapedOccupations);
  }
}
