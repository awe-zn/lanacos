import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm';

import User from './User';
import ProfilePicture from './ProfilePicture';
import Job from './Job';

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column({ serializeAs: null })
  public managerId: number;

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'managerId' })
  public manager: BelongsTo<typeof User>;

  @column({ serializeAs: null })
  public profilePictureId: number;

  @hasOne(() => ProfilePicture, {
    localKey: 'profilePictureId',
    foreignKey: 'id',
    serializeAs: 'profile_picture',
  })
  public profilePicture: HasOne<typeof ProfilePicture>;

  @hasMany(() => Job, { foreignKey: 'companyId', localKey: 'id' })
  public jobs: HasMany<typeof Job>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
