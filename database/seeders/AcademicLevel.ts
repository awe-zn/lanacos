import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import AcademicLevel from 'App/Models/AcademicLevel';

export default class AcademicLevelSeeder extends BaseSeeder {
  public static developmentOnly = true;

  public async run() {
    await AcademicLevel.truncate(true);

    await AcademicLevel.createMany([
      {
        name: 'Ensino Fundamental',
      },
      {
        name: 'Ensino Médio',
      },
      {
        name: 'Ensino Superior',
      },
      {
        name: 'Mestrado',
      },
      {
        name: 'Doutorado',
      },
    ]);
  }
}
