import { validator } from '@ioc:Adonis/Core/Validator';

validator.rule('notEqualTo', (value, [compareString], options) => {
  if (typeof value !== 'string') {
    return;
  }

  if (value === compareString) {
    options.errorReporter.report(
      options.pointer,
      'notEqualTo',
      'notEqualTo validation failed',
      options.arrayExpressionPointer
    );
  }
});
