import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Resume from 'App/Models/Resume';
import NewResumeValidator from 'App/Validators/NewResumeValidator';
import UpdateResumeValidator from 'App/Validators/UpdateResumeValidator';

export default class ResumesController {
  public async index({ response, auth, request }: HttpContextContract) {
    const user = auth.user!;

    const resume = await Resume.findBy('userId', user.id);

    if (!resume)
      return response.notFound({
        errors: [{ message: 'User has no resume' }],
      });

    const county = !!Number(request.qs().county);
    const state = !!Number(request.qs().state);

    if (county) {
      await resume.load('county', (query) => {
        if (state) query.preload('state');
      });
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