import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import User from 'App/Models/User';
import { UserFactory } from 'Database/factories/UserFactory';

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true;

  public async run() {
    await User.truncate(true);

    await UserFactory.with('resume').with('company').createMany(20);
  }
}
