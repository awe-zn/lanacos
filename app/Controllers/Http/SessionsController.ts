import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { LoginValidator } from 'App/Validators/LoginValidator';
import Hash from '@ioc:Adonis/Core/Hash';

import User from 'App/Models/User';

export default class SessionsController {
  public async store({ request, auth, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator);

    const user = await User.query().where('email', email).firstOrFail();
    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest({ errors: 'Invalid credentials' });
    }

    const token = await auth
      .use('api')
      .generate(user, { expiresIn: '7days', name: 'Login via API' });

    return response.created({ user, token });
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke();

    return response.accepted({ logout: true });
  }
}
