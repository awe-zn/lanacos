import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import AcademicExperience from './AcademicExperience';

export default class Certificate extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public path: string;

  @column()
  public academicExperienceId: number;

  @belongsTo(() => AcademicExperience, {
    localKey: 'id',
    foreignKey: 'academicExperienceId',
    serializeAs: 'academic_experience',
  })
  public academicExperience: BelongsTo<typeof AcademicExperience>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
