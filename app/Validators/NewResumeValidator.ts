import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class NewResumeValidator {
  public schema = schema.create({
    countyId: schema.number([
      rules.exists({ table: 'counties', column: 'id' }),
    ]),
    district: schema.string({ trim: true }, [rules.minLength(3)]),
    cpf: schema.string({ trim: true }, [
      rules.cpf(),
      rules.unique({ column: 'cpf', table: 'resumes' }),
    ]),
    autobiography: schema.string({ trim: true }, [rules.maxLength(255)]),
  });

  public messages = {};
}
