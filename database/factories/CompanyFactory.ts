import Factory from '@ioc:Adonis/Lucid/Factory';
import Faker from 'faker/locale/pt_BR';

import Company from 'App/Models/Company';
import { UserFactory } from './UserFactory';

export const CompanyFactory = Factory.define(Company, () => ({
  name: Faker.company.companyName(),
  description: Faker.company.bs(),
}))
  .relation('manager', () => UserFactory)
  .build();
