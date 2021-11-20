import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

import State from 'App/Models/State';

import states from '../json/states.json';

export default class StateSeeder extends BaseSeeder {
  public async run() {
    await State.truncate(true);
    await State.createMany(states);
  }
}
