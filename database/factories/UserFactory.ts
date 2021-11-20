import Factory from '@ioc:Adonis/Lucid/Factory';
import Faker from 'faker/locale/pt_BR';
import User from 'App/Models/User';

import { ResumeFactory } from './ResumeFactory';
import { CompanyFactory } from './CompanyFactory';

export const UserFactory = Factory.define(User, () => {
  const firstName = Faker.name.firstName();
  const lastName = Faker.name.lastName();

  return {
    username: Faker.internet.userName(firstName, lastName).slice(0, 16),
    fullname: `${firstName} ${Faker.name.middleName()} ${lastName}`,
    password: 'password',
    email: Faker.internet.email(firstName, lastName),
  };
})
  .relation('resume', () => ResumeFactory)
  .relation('company', () => CompanyFactory)
  .build();
