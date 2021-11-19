import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class EmailVerified {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const { emailConfirmed } = auth.user!;

    if (!emailConfirmed)
      return response.unauthorized({
        errors: [{ message: 'Email not confirmed' }],
      });

    return next();
  }
}
