import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class HasResume {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const user = auth.user!;
    await user.load('resume');

    if (!user.hasResume())
      return response.notFound({
        errors: [{ message: 'User has no resume' }],
      });

    return next();
  }
}
