import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class NewJobValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(255)]),
    description: schema.string({ trim: true }, [rules.maxLength(255)]),
    minimum_wage_claim: schema.number(),
    company_id: schema.number([
      rules.exists({ table: 'companies', column: 'id' }),
    ]),
  });

  public messages = {};
}
