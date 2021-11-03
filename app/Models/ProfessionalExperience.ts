import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Occupation from './Occupation';
import Resume from './Resume';

export default class ProfessionalExperience extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public startDate: Date;

  @column()
  public endDate?: Date;

  @column()
  public workplace: string;

  @column({ serializeAs: null })
  public occupationId: number;

  @belongsTo(() => Occupation, { localKey: 'id', foreignKey: 'occupationId' })
  public occupation: BelongsTo<typeof Occupation>;

  @column({ serializeAs: null })
  public resumeId: number;

  @belongsTo(() => Resume, { localKey: 'id', foreignKey: 'resumeId' })
  public resume: BelongsTo<typeof Resume>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
