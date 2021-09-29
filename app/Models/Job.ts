import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';

import Company from './Company';

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public minimumWageClaim: number;

  @column()
  public companyId: number;

  @belongsTo(() => Company, {
    foreignKey: 'companyId',
    localKey: 'id',
  })
  public company: BelongsTo<typeof Company>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
