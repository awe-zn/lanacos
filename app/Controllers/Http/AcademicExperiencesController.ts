import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { isSameDay } from 'date-fns';
import AcademicExperience from 'App/Models/AcademicExperience';
import NewAcademicExperienceValidator from 'App/Validators/NewAcademicExperienceValidator';
import UpdateAcademicExperienceValidator from 'App/Validators/UpdateAcademicExperienceValidator';

export default class AcademicExperiencesController {
  public async index({ response, auth, request }: HttpContextContract) {
    const user = auth.user!;
    await user.load('resume');

    const certificates = !!Number(request.qs().certificates);

    const academicExperiences = await AcademicExperience.query().where(
      'resumeId',
      user.resume.id
    );

    for (const academicExperience of academicExperiences) {
      if (certificates) {
        await academicExperience.load('certificate');

        if (academicExperience.certificate)
          await academicExperience.certificate.getUrl();
      }
    }

    return response.ok({ academic_experiences: academicExperiences });
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const user = auth.user!;
    await user.load('resume');

    const newAcademicExperienceData = await request.validate(
      NewAcademicExperienceValidator
    );

    const academicExperience = await AcademicExperience.create({
      resumeId: user.resume.id,
      ...newAcademicExperienceData,
    });

    await academicExperience.load('academicLevel');
    await academicExperience.load('institution');

    return response.ok({ academic_experience: academicExperience });
  }

  public async show({ auth, response, params, request }: HttpContextContract) {
    const { id } = params;

    const user = auth.user!;
    await user.load('resume');

    const certificates = !!Number(request.qs().certificates);

    const academicExperience = await AcademicExperience.find(id);

    if (!academicExperience)
      return response.notFound({
        errors: [{ message: 'Academic experience not found' }],
      });

    if (academicExperience.resumeId !== user.resume.id)
      return response.unauthorized({
        errors: [
          {
            message: 'User unauthorized to access this academic experience',
          },
        ],
      });

    if (certificates) {
      await academicExperience.load('certificate');

      if (academicExperience.certificate)
        await academicExperience.certificate.getUrl();
    }

    return response.ok({ academic_experience: academicExperience });
  }

  public async update({
    auth,
    params,
    response,
    request,
  }: HttpContextContract) {
    const { id } = params;

    const user = auth.user!;
    await user.load('resume');

    const academicExperience = await AcademicExperience.find(id);

    if (!academicExperience)
      return response.notFound({
        errors: [{ message: 'Academic experience not found' }],
      });

    if (academicExperience.resumeId !== user.resume.id)
      return response.unauthorized({
        errors: [
          {
            message: 'User unauthorized to access this academic experience',
          },
        ],
      });

    const updateAcademicExperienceData = await request.validate(
      UpdateAcademicExperienceValidator
    );

    if (updateAcademicExperienceData.endDate) {
      const startDate =
        updateAcademicExperienceData.startDate || academicExperience.startDate;

      const endDate =
        updateAcademicExperienceData.endDate || academicExperience.endDate;

      if (
        isSameDay(endDate.valueOf(), startDate.valueOf()) ||
        endDate < startDate
      )
        return response.badRequest({
          errors: [{ message: 'Start date to end date interval invalid' }],
        });
    }

    academicExperience.merge({ ...updateAcademicExperienceData });
    await academicExperience.save();

    await academicExperience.load('academicLevel');
    await academicExperience.load('institution');
    await academicExperience.load('certificate');

    if (academicExperience.certificate)
      await academicExperience.certificate.getUrl();

    return response.ok({ academic_experience: academicExperience });
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const { id } = params;

    const user = auth.user!;
    await user.load('resume');

    const academicExperience = await AcademicExperience.find(id);

    if (!academicExperience)
      return response.notFound({
        errors: [{ message: 'Academic experience not found' }],
      });

    if (academicExperience.resumeId !== user.resume.id)
      return response.unauthorized({
        errors: [
          {
            message: 'User unauthorized to access this academic experience',
          },
        ],
      });

    await academicExperience.delete();

    return response.ok({
      message: 'Academic experience deleted with success',
    });
  }
}
