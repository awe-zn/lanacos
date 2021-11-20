import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export class NewUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.maxLength(16),
      rules.unique({ column: 'username', table: 'users' }),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ column: 'email', table: 'users' }),
    ]),
    fullname: schema.string({ trim: true }, [rules.maxLength(64)]),
    password: schema.string({ trim: true }, [
      rules.minLength(8),
      rules.maxLength(16),
      rules.confirmed(),
    ]),
  });

  public messages = {};
}
