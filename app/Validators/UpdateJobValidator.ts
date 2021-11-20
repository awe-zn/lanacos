import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class UpdateJobValidator {
  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    description: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
    minimum_wage_claim: schema.number.optional(),
  });

  public messages = {};
}
