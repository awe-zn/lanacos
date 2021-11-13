import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export class UpdateUserValidator {
  constructor(protected user: User) {
    this.user = user;
  }

  public schema = schema.create({
    username: schema.string.optional({ trim: true }, [
      rules.maxLength(16),
      rules.unique({ column: 'username', table: 'users' }),
      rules.notEqualTo(this.user.username),
    ]),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.unique({ column: 'email', table: 'users' }),
      rules.notEqualTo(this.user.email),
    ]),
    fullname: schema.string.optional({ trim: true }, [rules.maxLength(64)]),
    password: schema.string.optional({ trim: true }, [
      rules.minLength(8),
      rules.maxLength(16),
      rules.confirmed(),
    ]),
  });

  public messages = {};
}
