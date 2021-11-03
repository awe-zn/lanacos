import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

import Institution from 'App/Models/Institution';

export default class InstitutionSeeder extends BaseSeeder {
  public async run() {
    await Institution.truncate(true);

    await Institution.createMany([
      {
        name: 'Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Norte - IFRN',
      },
      {
        name: 'Universidade Federal do Rio Grande do Norte - UFRN',
      },
    ]);
  }
}
