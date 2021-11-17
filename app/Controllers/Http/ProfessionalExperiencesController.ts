import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
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

    const professionalExperience = await ProfessionalExperience.query()
      .where('resumeId', user.resume.id)
      .where('id', id)
      .first();

    if (!professionalExperience)
      return response.notFound({
        errors: [{ message: 'Professional experience not found' }],
      });

    const updateProfessionalExperienceData = await request.validate(
      UpdateProfessionalExperienceValidator
    );

    professionalExperience!.merge({ ...updateProfessionalExperienceData });
    await professionalExperience!.save();

    return response.ok({ professional_experience: professionalExperience });
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const { id } = params;

    const user = auth.user!;
    await user.load('resume');

    const professionalExperience = await ProfessionalExperience.query()
      .where('resumeId', user.resume.id)
      .where('id', id)
      .first();

    if (!professionalExperience)
      return response.notFound({
        errors: [{ message: 'Professional experience not found' }],
      });

    await professionalExperience!.delete();

    return response.ok({ message: 'Professional experience with success' });
  }
}
