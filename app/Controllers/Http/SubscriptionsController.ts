import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Job from 'App/Models/Job';
import Subscription from 'App/Models/Subscription';

export default class SubscriptionsController {
  public async index({ params, response, auth }: HttpContextContract) {
    const { id: userId } = auth.user!;

    const { jobId } = params;

    const job = await Job.find(jobId);

    if (!job)
      return response.notFound({ errors: [{ message: 'Job not found' }] });

    await job.load('company');

    if (job.company.managerId !== userId)
      return response.unauthorized({
        errors: [{ message: 'User unauthorized to access this job' }],
      });

    await job.load('applications');

    const { applications: subscriptions } = job;

    return response.ok({ subscriptions });
  }

  public async show({ params, response, auth }: HttpContextContract) {
    const { id: userId } = auth.user!;

    const { jobId, subId } = params;

    const job = await Job.find(jobId);

    if (!job)
      return response.notFound({ errors: [{ message: 'Job not found' }] });

    await job.load('company');

    if (job.company.managerId !== userId)
      return response.unauthorized({
        errors: [{ message: 'User unauthorized to access this job' }],
      });

    const subscription = await Subscription.query()
      .where('id', subId)
      .preload('job')
      .preload('resume')
      .first();

    if (!subscription)
      return response.notFound({
        errors: [{ message: 'Subscription not found' }],
      });

    if (subscription.jobId !== job.id)
      return response.unauthorized({
        errors: [{ message: 'Job unauthorized to access this subscription' }],
      });

    return response.ok({ subscription });
  }

  public async store({ auth, params, response }: HttpContextContract) {
    const user = auth.user!;
    await user.load('resume');

    const { id: resumeId } = user.resume;

    const { jobId } = params;

    const previousSubscription = await Subscription.query()
      .where('jobId', jobId)
      .where('resumeId', resumeId)
      .first();

    if (previousSubscription)
      return response.ok({
        errors: [{ message: 'User already subscribed at this job' }],
      });

    await Subscription.create({
      jobId,
      resumeId,
    });

    return response.ok({ message: 'User subscribed with success' });
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const user = auth.user!;
    await user.load('resume');

    const { id: resumeId } = user.resume;

    const { jobId } = params;

    const subscription = await Subscription.query()
      .where('jobId', jobId)
      .where('resumeId', resumeId)
      .first();

    if (!subscription)
      return response.ok({
        errors: [{ message: "User's subscribed at this job" }],
      });

    await subscription.delete();

    return response.ok({ message: 'User unsubscribed with success' });
  }
}
