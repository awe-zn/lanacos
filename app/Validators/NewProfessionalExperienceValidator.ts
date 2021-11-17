import { rules, schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class NewProfessionalExperienceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    startDate: schema.date(),
    endDate: schema.date.optional({}, [rules.afterField('startDate')]),
    workplace: schema.string({ trim: true }),
    occupationId: schema.number([
      rules.exists({ table: 'occupations', column: 'id' }),
    ]),
  });

  public messages = {};
}
