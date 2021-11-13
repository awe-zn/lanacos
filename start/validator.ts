import { validator } from '@ioc:Adonis/Core/Validator';
import { cpf } from 'cpf-cnpj-validator';

validator.rule('notEqualTo', (value, [compareString], options) => {
  if (typeof value !== 'string') {
    return;
  }

  if (value === compareString) {
    options.errorReporter.report(
      options.pointer,
      'notEqualTo',
      'notEqualTo validation failed'
    );
  }
});

validator.rule('cpf', (value, _, options) => {
  if (typeof value !== 'string') {
    return;
  }

  if (!cpf.isValid(value)) {
    options.errorReporter.report(
      options.pointer,
      'cpf',
      'cpf validation failed'
    );
  }

  options.mutate(cpf.strip(value));
});
