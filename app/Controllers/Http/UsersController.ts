import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { NewUserValidator } from 'App/Validators/NewUserValidator';
import User from 'App/Models/User';
import NewUser from 'App/Mailers/NewUser';

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const newUserData = await request.validate(NewUserValidator);
    const user = await User.create(newUserData);

    await new NewUser(user).sendLater();

    return response.created({ user });
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
