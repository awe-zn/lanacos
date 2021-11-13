import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Resume from 'App/Models/Resume';

export default class UpdateResumeValidator {
  constructor(protected resume: Resume) {
    this.resume = resume;
  }

  public schema = schema.create({
    countyId: schema.number.optional([
      rules.exists({ table: 'counties', column: 'id' }),
    ]),
    district: schema.string.optional({ trim: true }, [rules.minLength(3)]),
    cpf: schema.string.optional({ trim: true }, [
      rules.cpf(),
      rules.unique({ column: 'cpf', table: 'resumes' }),
      rules.notEqualTo(this.resume.cpf),
    ]),
    autobiography: schema.string.optional({ trim: true }, [
      rules.maxLength(255),
    ]),
  });

  public messages = {};
}
