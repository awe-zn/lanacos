import Route from '@ioc:Adonis/Core/Route';
import { matcherId } from 'Contracts/matcher';

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
      Route.group(() => {
        Route.get('/', 'ProfessionalExperiencesController.index');
        Route.get('/:id', 'ProfessionalExperiencesController.show').where(
          'id',
          matcherId
        );
        Route.delete('/:id', 'ProfessionalExperiencesController.destroy').where(
          'id',
          matcherId
        );
        Route.post('/', 'ProfessionalExperiencesController.store').middleware([
          'bodyNotEmpty',
        ]);
        Route.put('/:id', 'ProfessionalExperiencesController.update')
          .where('id', matcherId)
          .middleware(['bodyNotEmpty']);
      }).prefix('/experiences');

      Route.group(() => {
        Route.get('/', 'AcademicExperiencesController.index');
        Route.get('/:id', 'AcademicExperiencesController.show').where(
          'id',
          matcherId
        );
        Route.post('/', 'AcademicExperiencesController.store').middleware([
          'bodyNotEmpty',
        ]);
        Route.put('/:id', 'AcademicExperiencesController.update')
          .where('id', matcherId)
          .middleware(['bodyNotEmpty']);
        Route.delete('/:id', 'AcademicExperiencesController.destroy').where(
          'id',
          matcherId
        );

        Route.group(() => {
          Route.get('/:id', 'CertificatesController.show').where(
            'id',
            matcherId
          );
          Route.post('/:id', 'CertificatesController.store').where(
            'id',
            matcherId
          );
          Route.put('/:id', 'CertificatesController.update').where(
            'id',
            matcherId
          );
          Route.delete('/:id', 'CertificatesController.destroy').where(
            'id',
            matcherId
          );
        }).prefix('/certificate');
      }).prefix('/academic');
    }).middleware(['hasResume']);
  }).prefix('/resume');
}).middleware(['auth', 'emailVerified']);

Route.any('*', ({ response }) =>
  response.notFound({ errors: [{ message: 'Route not found' }] })
);
