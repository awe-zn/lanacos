import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class BodyNotEmpty {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if (Object.keys(request.body()).length === 0)
      return response.preconditionFailed({
        errors: [{ message: 'Empty data on body' }],
      });

    return next();
  }
}
