import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class NewCompanyValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(64)]),
    description: schema.string({ trim: true }, [rules.maxLength(255)]),
  });

  public messages = {};
}
