import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import AcademicLevel from 'App/Models/AcademicLevel';
import NewAcademicLevelValidator from 'App/Validators/NewAcademicLevelValidator';
import UpdateAcademicLevelValidator from 'App/Validators/UpdateAcademicLevelValidator';

export default class AcademicLevelsController {
  public async index({ response }: HttpContextContract) {
    const academicLevels = await AcademicLevel.query();

    return response.ok({ academicLevels });
  }

  public async store({ request, response }: HttpContextContract) {
    const newAcademicLevel = await request.validate(NewAcademicLevelValidator);

    const academicLevelData = await AcademicLevel.create({
      ...newAcademicLevel,
    });

    return response.ok({ academicLevelData });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const academicLevel = await AcademicLevel.find(id);

    if (!academicLevel)
      return response.ok({ errors: [{ message: 'Academic level not found' }] });

    return response.ok({ academicLevel });
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;

    const academicLevel = await AcademicLevel.find(id);

    if (!academicLevel)
      return response.ok({ errors: [{ message: 'Academic level not found' }] });

    const updateAcademicLevelData = await request.validate(
      UpdateAcademicLevelValidator
    );

    academicLevel.merge({ ...updateAcademicLevelData });
    await academicLevel.save();

    return response.ok({ academicLevel });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const academicLevel = await AcademicLevel.find(id);

    if (!academicLevel)
      return response.ok({ errors: [{ message: 'Academic level not found' }] });

    await academicLevel.delete();

    return response.ok({
      message: 'Academic level deleted with success',
    });
  }
}
