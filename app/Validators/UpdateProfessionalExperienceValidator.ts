import { rules, schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateProfessionalExperienceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    startDate: schema.date.optional(),
    endDate: schema.date.optional({}, [rules.afterField('startDate')]),
    workplace: schema.string.optional({ trim: true }),
    occupationId: schema.number.optional([
      rules.exists({ table: 'occupations', column: 'id' }),
    ]),
  });

  public messages = {};
}
