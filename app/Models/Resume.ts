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
import County from './County';
import AcademicExperience from './AcademicExperience';
import ProfessionalExperience from './ProfessionalExperience';

export default class Resume extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: null })
  public userId: number;

  @belongsTo(() => User, { localKey: 'id' })
  public user: BelongsTo<typeof User>;

  @column({ serializeAs: null })
  public countyId: number;

  @hasOne(() => County, { foreignKey: 'id', localKey: 'countyId' })
  public county: HasOne<typeof County>;

  @column()
  public district: string;

  @column()
  public cpf: string;

  @column()
  public autobiography: string;

  @hasMany(() => AcademicExperience, {
    foreignKey: 'resumeId',
    serializeAs: 'academic_experiences',
  })
  public academicExperiences: HasMany<typeof AcademicExperience>;

  @hasMany(() => ProfessionalExperience, {
    foreignKey: 'resumeId',
    serializeAs: 'professional_experiences',
  })
  public professionalExperiences: HasMany<typeof ProfessionalExperience>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
