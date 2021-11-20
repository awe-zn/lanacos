import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Resume from 'App/Models/Resume';
import NewResumeValidator from 'App/Validators/NewResumeValidator';
import UpdateResumeValidator from 'App/Validators/UpdateResumeValidator';

export default class ResumesController {
  public async index({ response, auth, request }: HttpContextContract) {
    const user = auth.user!;

    const resume = (await Resume.findBy('userId', user.id))!;

    const county = !!Number(request.qs().county);
    const state = !!Number(request.qs().state);
    const professionalExperiences = !!Number(
      request.qs().professional_experiences
    );
    const academicExperiences = !!Number(request.qs().academic_experiences);
    const certificates = !!Number(request.qs().certificates);
    const academicLevel = !!Number(request.qs().academic_level);
    const institution = !!Number(request.qs().institution);

    if (county) {
      await resume.load('county', (query) => {
        if (state) query.preload('state');
      });
    }
    if (professionalExperiences)
      await resume.load('professionalExperiences', (query) =>
        query.preload('occupation')
      );
    if (academicExperiences) {
      await resume.load('academicExperiences', async (query) => {
        if (certificates) await query.preload('certificate');
      });

      for (const academicExperience of resume.academicExperiences) {
        if (academicExperience.certificate)
          await academicExperience.certificate.getUrl();

        if (academicLevel) await academicExperience.load('academicLevel');

        if (institution) await academicExperience.load('institution');
      }
    }

    return response.ok({ resume });
  }

  public async store({ auth, response, request }: HttpContextContract) {
    const user = auth.user!;
    await user.load('resume');

    if (user.resume)
      return response.unauthorized({
        error: [{ message: 'User already has resume' }],
      });

    const newResumeData = await request.validate(NewResumeValidator);

    const resume = await Resume.create({ userId: user.id, ...newResumeData });
    await resume.load('county', (query) => query.preload('state'));

    return response.ok({ resume });
  }

  public async update({ request, auth, response }: HttpContextContract) {
    const user = auth.user!;

    const resume = await Resume.findBy('userId', user.id);

    const updateResumeData = await request.validate(
      new UpdateResumeValidator(resume!)
    );

    resume!.merge({ ...updateResumeData });
    await resume!.save();

    return response.ok({ resume });
  }
}
