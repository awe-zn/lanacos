import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => ({ hello: 'world' }));

Route.group(() => {
  Route.post('/', 'SessionsController.store');
  Route.delete('/', 'SessionsController.destroy').middleware('auth');
}).prefix('session');

Route.group(() => {
  Route.post('/', 'UsersController.store');
  Route.put('/', 'UsersController.update').middleware('auth');

  Route.group(() => {
    Route.get('/request/:id', 'UsersController.requestConfirm');
    Route.get('/:uuid', 'UsersController.confirm')
      .where('uuid', {
        match:
          /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[4]{1}[0-9a-fA-F]{3}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
      })
      .as('users.verification');
  }).prefix('confirm');
}).prefix('users');

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'ResumesController.index').middleware(['hasResume']);
    Route.group(() => {
      Route.post('/', 'ResumesController.store');
      Route.put('/', 'ResumesController.update').middleware(['hasResume']);
    }).middleware(['bodyNotEmpty']);

    Route.group(() => {
      Route.get('/', 'ProfessionalExperiencesController.index');
      Route.group(() => {
        Route.post('/', 'ProfessionalExperiencesController.store');
        Route.put('/:id', 'ProfessionalExperiencesController.update').where(
          'id',
          { match: /^[0-9]+$/, cast: (id) => Number(id) }
        );
      }).middleware(['bodyNotEmpty']);
      Route.delete('/:id', 'ProfessionalExperiencesController.destroy').where(
        'id',
        { match: /^[0-9]+$/, cast: (id) => Number(id) }
      );
    })
      .prefix('/experiences')
      .middleware(['hasResume']);
  }).prefix('/resume');
}).middleware(['auth', 'emailVerified']);

Route.any('*', ({ response }) =>
  response.notFound({ errors: [{ message: 'Route not found' }] })
);
