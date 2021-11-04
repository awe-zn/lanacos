import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Hash from '@ioc:Adonis/Core/Hash';

import User from 'App/Models/User';

export default class SessionsController {
  public async store({ request, auth, response }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.exists({ column: 'email', table: 'users' }),
      ]),
      password: schema.string({ trim: true }, [
        rules.minLength(8),
        rules.maxLength(16),
      ]),
    });

    const { email, password } = await request.validate({ schema: loginSchema });

    const user = await User.query().where('email', email).firstOrFail();
    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest({ errors: 'Invalid credentials' });
    }

    const token = await auth
      .use('api')
      .generate(user, { expiresIn: '7days', name: 'Login via API' });

    return response.ok({ user, token });
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke();

    return response.ok({ logout: true });
  }
}
