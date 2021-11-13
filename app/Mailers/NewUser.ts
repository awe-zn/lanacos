import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail';
import Env from '@ioc:Adonis/Core/Env';
import Route from '@ioc:Adonis/Core/Route';
import User from 'App/Models/User';

export default class NewUser extends BaseMailer {
  constructor(private user: User) {
    super();
  }

  public prepare(message: MessageContract) {
    message
      .subject('Confirmar email')
      .from(Env.get('NOREPLY_EMAIL'))
      .to(this.user.email)
      .htmlView('emails.user.confirm', {
        user: this.user,
        url: Route.makeSignedUrl(
          'users.verification',
          {
            uuid: this.user.uuid,
          },
          { prefixUrl: Env.get('BASE_URL'), expiresIn: '30m' }
        ),
      });
  }
}
