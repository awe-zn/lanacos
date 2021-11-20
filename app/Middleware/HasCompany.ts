import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class HasCompany {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const user = auth.user!;
    await user.load('companies');

    if (!user.hasCompany() && !user.admin)
      return response.notFound({
        errors: [{ message: 'User has no company' }],
      });

    return next();
  }
}
