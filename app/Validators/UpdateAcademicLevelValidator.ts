import { schema } from '@ioc:Adonis/Core/Validator';

export default class UpdateAcademicLevelValidator {
  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
  });

  public messages = {};
}
