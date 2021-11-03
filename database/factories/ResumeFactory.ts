import Factory from '@ioc:Adonis/Lucid/Factory';
import Faker from 'faker/locale/pt_BR';
import FakerBR from 'faker-br';
import County from 'App/Models/County';
import Resume from 'App/Models/Resume';

import counties from '../json/counties.json';
import { UserFactory } from './UserFactory';

export const ResumeFactory = Factory.define(Resume, async () => {
  const county = await County.find(Math.round(Math.random() * counties.length));

  return {
    cpf: FakerBR.br.cpf(),
    countyId: county?.id,
    autobiography: Faker.lorem.paragraph().slice(0, 255).replace(/.$/, '.'),
    district: Faker.address.cityName(),
  };
})
  .relation('user', () => UserFactory)
  .build();
