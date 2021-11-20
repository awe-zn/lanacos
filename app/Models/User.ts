import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import {
  BaseModel,
  beforeSave,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm';
import Hash from '@ioc:Adonis/Core/Hash';
import NewUser from 'App/Mailers/NewUser';

import ProfilePicture from './ProfilePicture';
import Resume from './Resume';
import Company from './Company';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: null })
  public uuid: string;

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
  public emailConfirmed: boolean;

  @column({ serializeAs: null })
  public profilePictureId: number;

  @hasOne(() => ProfilePicture, {
    localKey: 'profilePictureId',
    foreignKey: 'id',
    serializeAs: 'profile_picture',
  })
  public profilePicture: HasOne<typeof ProfilePicture>;

  @hasOne(() => Resume, { foreignKey: 'userId' })
  public resume: HasOne<typeof Resume>;

  @hasMany(() => Company, { foreignKey: 'managerId' })
  public company: HasMany<typeof Company>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }

    user.uuid = uuidv4();

    if (user.$dirty.email) {
      await new NewUser(user).sendLater();
      user.emailConfirmed = false;
    }
  }

  public hasCompany() {
    return !!this.company.length;
  }
}
