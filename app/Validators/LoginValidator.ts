import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.exists({ column: 'email', table: 'users' }),
    ]),
    password: schema.string({ trim: true }, [
      rules.minLength(8),
      rules.maxLength(16),
    ]),
  });

  public messages = {};
}
