import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm';

import User from './User';
import County from './County';

export default class Resume extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @belongsTo(() => User, { localKey: 'id' })
  public user: BelongsTo<typeof User>;

  @column()
  public countyId: number;

  @hasOne(() => County, { foreignKey: 'id', localKey: 'countyId' })
  public county: HasOne<typeof County>;

  @column()
  public district: string;

  @column()
  public cpf: string;

  @column()
  public autobiography: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
