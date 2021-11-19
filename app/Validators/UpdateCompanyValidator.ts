import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class UpdateCompanyValidator {
  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.maxLength(64)]),
    description: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
  });

  public messages = {};
}
