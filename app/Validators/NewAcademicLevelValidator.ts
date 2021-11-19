import { schema } from '@ioc:Adonis/Core/Validator';

export default class NewAcademicLevelValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }),
  });

  public messages = {};
}
