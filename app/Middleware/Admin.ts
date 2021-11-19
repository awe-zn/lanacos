import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class Admin {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const { admin } = auth.user!;

    if (!admin)
      return response.unauthorized({
        errors: [{ message: "User isn't admin" }],
      });

    return next();
  }
}
