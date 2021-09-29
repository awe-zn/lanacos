import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class ProfilePicture extends BaseModel {
  public static table = 'profiles_pictures';

  @column({ isPrimary: true })
  public id: number;

  @column()
  public path: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
