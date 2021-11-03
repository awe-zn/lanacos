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
import Certificate from './Certificate';
import Resume from './Resume';

export default class AcademicExperience extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public startDate: Date;

  @column()
  public endDate?: Date;

  @column()
  public institutionId: number;

  @belongsTo(() => Institution, { localKey: 'id', foreignKey: 'institutionId' })
  public institution: BelongsTo<typeof Institution>;

  @column()
  public academicLevelId: number;

  @hasOne(() => AcademicLevel, {
    localKey: 'academicLevelId',
    foreignKey: 'id',
    serializeAs: 'academic_level',
  })
  public academicLevel: HasOne<typeof AcademicLevel>;

  @column()
  public certificateId: number;

  @hasOne(() => Certificate, {
    localKey: 'certificateId',
    foreignKey: 'id',
  })
  public certificate: HasOne<typeof Certificate>;

  @column()
  public resumeId: number;

  @belongsTo(() => Resume, { localKey: 'id', foreignKey: 'resumeId' })
  public resume: BelongsTo<typeof Resume>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
