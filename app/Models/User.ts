import { DateTime } from 'luxon';
import {
  BaseModel,
  beforeSave,
  column,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';
import ProfilePicture from './ProfilePicture';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public username: string;

  @column()
  public fullname: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public admin: boolean;

  @column()
  public profilePictureId: number;

  @hasOne(() => ProfilePicture, {
    localKey: 'profilePictureId',
    foreignKey: 'id',
    serializeAs: 'profile_picture',
  })
  public profilePicture: HasOne<typeof ProfilePicture>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
