import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { NewUserValidator } from 'App/Validators/NewUserValidator';
import { UpdateUserValidator } from 'App/Validators/UpdateUserValidator';

import User from 'App/Models/User';
import NewUser from 'App/Mailers/NewUser';

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const newUserData = await request.validate(NewUserValidator);
    const user = await User.create(newUserData);

    return response.created({
      user,
      success: [{ message: "Please, check your email's inbox and confirm it" }],
    });
  }

  public async update({ response, request, auth }: HttpContextContract) {
    const user = auth.user!;

    const updateUserData = await request.validate(
      new UpdateUserValidator(user)
    );

    user.merge({ ...updateUserData }).save();

    return response.ok({
      user,
      success: [{ message: "Please, check your email's inbox and confirm it" }],
    });
  }

  public async confirm({ params, response, request }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      return response.requestTimeout({
        errors: [{ message: 'Verification request expired' }],
      });
    }

    const { uuid } = params;

    const user = await User.query()
      .where('uuid', uuid)
      .where('emailConfirmed', false)
      .first();

    if (!user)
      return response.notFound({
        errors: [
          {
            message: 'Invalid information',
          },
        ],
      });

    user.emailConfirmed = true;
    await user.save();

    return response.ok({
      success: [
        {
          message: 'Email verified',
        },
      ],
    });
  }

  public async requestConfirm({ params, response }: HttpContextContract) {
    const { id } = params;
    const user = await User.query().where('id', id).first();

    if (!user)
      return response.notFound({ errors: [{ message: 'User not found' }] });
    if (user.emailConfirmed)
      return response.unauthorized({
        errors: [{ message: "User's email already verified" }],
      });

    await new NewUser(user).sendLater();

    return response.ok({
      success: [{ message: 'Email verification send with success' }],
    });
  }
}
