import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { isSameDay } from 'date-fns';
import ProfessionalExperience from 'App/Models/ProfessionalExperience';
import NewProfessionalExperienceValidator from 'App/Validators/NewProfessionalExperienceValidator';
import UpdateProfessionalExperienceValidator from 'App/Validators/UpdateProfessionalExperienceValidator';

export default class ProfessionalExperiencesController {
  public async index({ response, auth }: HttpContextContract) {
    const user = auth.user!;
    await user.load('resume');

    const professionalExperiences = await ProfessionalExperience.query().where(
      'resumeId',
      user.resume.id
    );

    return response.ok({ professional_experiences: professionalExperiences });
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const user = auth.user!;
    await user.load('resume');

    const newProfessionalExperienceData = await request.validate(
      NewProfessionalExperienceValidator
    );

    const professionalExperience = await ProfessionalExperience.create({
      resumeId: user.resume.id,
      ...newProfessionalExperienceData,
    });

    return response.ok({ professional_experience: professionalExperience });
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

    const professionalExperience = await ProfessionalExperience.find(id);

    if (!professionalExperience)
      return response.notFound({
        errors: [{ message: 'Professional experience not found' }],
      });

    if (professionalExperience.resumeId !== user.resume.id)
      return response.unauthorized({
        errors: [
          {
            message: 'User unauthorized to access this professional experience',
          },
        ],
      });

    const updateProfessionalExperienceData = await request.validate(
      UpdateProfessionalExperienceValidator
    );

    if (updateProfessionalExperienceData.endDate) {
      const startDate =
        updateProfessionalExperienceData.startDate ||
        professionalExperience.startDate;

      const endDate =
        updateProfessionalExperienceData.endDate ||
        professionalExperience.endDate;

      if (
        isSameDay(endDate.valueOf(), startDate.valueOf()) ||
        endDate < startDate
      )
        return response.badRequest({
          errors: [{ message: 'Start date to end date interval invalid' }],
        });
    }

    professionalExperience.merge({ ...updateProfessionalExperienceData });
    await professionalExperience.save();

    return response.ok({ professional_experience: professionalExperience });
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const { id } = params;

    const user = auth.user!;
    await user.load('resume');

    const professionalExperience = await ProfessionalExperience.find(id);

    if (!professionalExperience)
      return response.notFound({
        errors: [{ message: 'Professional experience not found' }],
      });

    if (professionalExperience.resumeId !== user.resume.id)
      return response.unauthorized({
        errors: [
          {
            message: 'User unauthorized to access this professional experience',
          },
        ],
      });

    await professionalExperience.delete();

    return response.ok({
      message: 'Professional experience deleted with success',
    });
  }
}
