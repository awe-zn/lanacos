import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class UpdateAcademicExperienceValidator {
  public schema = schema.create({
    name: schema.string.optional({ trim: true }),
    startDate: schema.date.optional(),
    endDate: schema.date.optional(),
    institutionId: schema.number.optional([
      rules.exists({ table: 'institutions', column: 'id' }),
    ]),
    academicLevelId: schema.number.optional([
      rules.exists({ table: 'academic_levels', column: 'id' }),
    ]),
  });

  public messages = {};
}
