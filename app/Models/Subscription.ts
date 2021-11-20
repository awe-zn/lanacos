import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Job from './Job';
import Resume from './Resume';

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public jobId: number;

  @belongsTo(() => Job)
  public job: BelongsTo<typeof Job>;

  @column()
  public resumeId: number;

  @belongsTo(() => Resume)
  public resume: BelongsTo<typeof Resume>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
