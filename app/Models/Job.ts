import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasManyThrough,
  hasManyThrough,
} from '@ioc:Adonis/Lucid/Orm';

import Company from './Company';
import Subscription from './Subscription';
import Resume from './Resume';

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public minimumWageClaim: number;

  @column({ serializeAs: null })
  public companyId: number;

  @belongsTo(() => Company, {
    foreignKey: 'companyId',
    localKey: 'id',
  })
  public company: BelongsTo<typeof Company>;

  @hasManyThrough([() => Resume, () => Subscription], {
    foreignKey: 'jobId',
    throughLocalKey: 'resumeId',
    localKey: 'id',
    throughForeignKey: 'id',
  })
  public applications: HasManyThrough<typeof Resume>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
