import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import AcademicLevel from 'App/Models/AcademicLevel';

export default class AcademicLevelSeeder extends BaseSeeder {
  public static developmentOnly = true;

  public async run() {
    await AcademicLevel.truncate(true);

    await AcademicLevel.createMany([
      {
        name: 'Ensino Fundamental Incompleto',
      },
      {
        name: 'Ensino Fundamental Completo',
      },
      {
        name: 'Ensino Médio Incompleto',
      },
      {
        name: 'Ensino Médio Completo',
      },
      {
        name: 'Ensino Superior Incompleto',
      },
      {
        name: 'Ensino Superior Completo',
      },
      {
        name: 'Mestrado Incompleto',
      },
      {
        name: 'Mestrado Completo',
      },
      {
        name: 'Doutorado Incompleto',
      },
      {
        name: 'Doutorado Completo',
      },
    ]);
  }
}
