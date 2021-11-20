import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Company from 'App/Models/Company';
import Job from 'App/Models/Job';
import NewJobValidator from 'App/Validators/NewJobValidator';
import UpdateJobValidator from 'App/Validators/UpdateJobValidator';

export default class JobsController {
  public async index({ response, request }: HttpContextContract) {
    const companies = !!Number(request.qs().companies);

    const jobs = await Job.query();

    if (companies) {
      for (const job of jobs) {
        await job.load('company');
      }
    }

    return response.ok({ jobs });
  }

  public async store({ response, auth, request }: HttpContextContract) {
    const { id: userId } = auth.user!;

    const newJobData = await request.validate(NewJobValidator);

    const company = (await Company.find(newJobData.company_id))!;

    if (company.managerId !== userId)
      return response.unauthorized({
        errors: [{ message: 'User unauthorized to access this company' }],
      });

    const job = await Job.create({ ...newJobData, companyId: company.id });

    return response.ok({ job });
  }

  public async show({ response, params, request }: HttpContextContract) {
    const { id } = params;

    const company = !!Number(request.qs().company);

    const job = await Job.find(id);

    if (!job)
      return response.notFound({ errors: [{ message: 'Job not found' }] });

    if (company) {
      await job.load('company');
    }

    return response.ok({ job });
  }

  public async update({
    response,
    auth,
    params,
    request,
  }: HttpContextContract) {
    const { id: userId } = auth.user!;

    const { id } = params;

    const job = await Job.find(id);

    if (!job)
      return response.notFound({ errors: [{ message: 'Job not found' }] });

    await job.load('company');

    if (job.company.managerId !== userId)
      return response.unauthorized({
        errors: [{ message: 'User unauthorized to access this company' }],
      });

    const updateJobData = await request.validate(UpdateJobValidator);

    job.merge({ ...updateJobData });
    await job.save();

    return response.ok({ job });
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const { id: userId } = auth.user!;

    const { id } = params;

    const job = await Job.find(id);

    if (!job)
      return response.notFound({ errors: [{ message: 'Job not found' }] });

    await job.load('company');

    if (job.company.managerId !== userId)
      return response.unauthorized({
        errors: [{ message: 'User unauthorized to access this company' }],
      });

    await job.delete();

    return response.ok({
      message: 'Job deleted with success',
    });
  }
}
