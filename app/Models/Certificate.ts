import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  computed,
} from '@ioc:Adonis/Lucid/Orm';
import Drive from '@ioc:Adonis/Core/Drive';
import AcademicExperience from './AcademicExperience';

export default class Certificate extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: null })
  public path: string;

  @column()
  public academicExperienceId: number;

  @belongsTo(() => AcademicExperience, {
    localKey: 'id',
    foreignKey: 'academicExperienceId',
    serializeAs: 'academic_experience',
  })
  public academicExperience: BelongsTo<typeof AcademicExperience>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @computed()
  public url: string;

  public async getUrl() {
    const url = await Drive.getSignedUrl(this.path);
    this.url = url;

    return this;
  }
}
