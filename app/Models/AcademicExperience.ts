import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm';
import Institution from './Institution';
import AcademicLevel from './AcademicLevel';
import Resume from './Resume';
import Certificate from './Certificate';

export default class AcademicExperience extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column.date()
  public startDate: DateTime;

  @column.date()
  public endDate?: DateTime;

  @column({ serializeAs: null })
  public institutionId: number;

  @belongsTo(() => Institution, { localKey: 'id', foreignKey: 'institutionId' })
  public institution: BelongsTo<typeof Institution>;

  @column({ serializeAs: null })
  public academicLevelId: number;

  @hasOne(() => AcademicLevel, {
    localKey: 'academicLevelId',
    foreignKey: 'id',
    serializeAs: 'academic_level',
  })
  public academicLevel: HasOne<typeof AcademicLevel>;

  @hasOne(() => Certificate, {
    foreignKey: 'academicExperienceId',
    localKey: 'id',
  })
  public certificate: HasOne<typeof Certificate>;

  @column({ serializeAs: null })
  public resumeId: number;

  @belongsTo(() => Resume, { localKey: 'id', foreignKey: 'resumeId' })
  public resume: BelongsTo<typeof Resume>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
