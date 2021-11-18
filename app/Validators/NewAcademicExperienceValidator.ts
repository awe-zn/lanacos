import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class NewAcademicExperienceValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }),
    startDate: schema.date(),
    endDate: schema.date.optional({}, [rules.afterField('startDate')]),
    institutionId: schema.number([
      rules.exists({ table: 'institutions', column: 'id' }),
    ]),
    academicLevelId: schema.number([
      rules.exists({ table: 'academic_levels', column: 'id' }),
    ]),
  });

  public messages = {};
}
