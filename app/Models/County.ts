import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';

import State from './State';

export default class County extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public code: number;

  @column()
  public name: string;

  @column()
  public stateCode: number;

  @belongsTo(() => State, { foreignKey: 'stateCode', localKey: 'code' })
  public state: BelongsTo<typeof State>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
