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
    Route.get('/request/:id', 'UsersController.requestConfirm').where(
      'id',
      matcherId
    );
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
    Route.post('/', 'ResumesController.store').middleware(['bodyNotEmpty']);
    Route.put('/', 'ResumesController.update').middleware([
      'hasResume',
      'bodyNotEmpty',
    ]);

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
          Route.get('/', 'CertificatesController.show');
          Route.post('/', 'CertificatesController.store');
          Route.put('/', 'CertificatesController.update');
          Route.delete('/', 'CertificatesController.destroy');
        })
          .prefix('/:id/certificate/')
          .where('id', matcherId);
      }).prefix('/academic');
    }).middleware(['hasResume']);
  }).prefix('/resume');

  Route.group(() => {
    Route.get('/', 'InstitutionsController.index');
    Route.get('/:id', 'InstitutionsController.show').where('id', matcherId);
    Route.post('/', 'InstitutionsController.store').middleware('bodyNotEmpty');
    Route.put('/:id', 'InstitutionsController.update')
      .where('id', matcherId)
      .middleware(['admin', 'bodyNotEmpty']);
    Route.delete('/:id', 'InstitutionsController.destroy')
      .where('id', matcherId)
      .middleware(['admin']);
  }).prefix('/institutions');

  Route.group(() => {
    Route.get('/', 'AcademicLevelsController.index');
    Route.get('/:id', 'AcademicLevelsController.show').where('id', matcherId);
    Route.post('/', 'AcademicLevelsController.store').middleware([
      'admin',
      'bodyNotEmpty',
    ]);
    Route.put('/:id', 'AcademicLevelsController.update')
      .where('id', matcherId)
      .middleware(['admin', 'bodyNotEmpty']);
    Route.delete('/:id', 'AcademicLevelsController.destroy')
      .where('id', matcherId)
      .middleware(['admin']);
  }).prefix('/academic-levels');

  Route.group(() => {
    Route.get('/', 'CompaniesController.index');
    Route.get('/:id', 'CompaniesController.show').where('id', matcherId);
    Route.post('/', 'CompaniesController.store').middleware('bodyNotEmpty');
    Route.put('/:id', 'CompaniesController.update')
      .where('id', matcherId)
      .middleware('bodyNotEmpty');
    Route.delete('/:id', 'CompaniesController.destroy').where('id', matcherId);
  })
    .prefix('/companies')
    .middleware('hasCompany');

  Route.group(() => {
    Route.get('/', 'JobsController.index');
    Route.get('/:id', 'JobsController.show').where('id', matcherId);
    Route.post('/', 'JobsController.store').middleware([
      'bodyNotEmpty',
      'hasCompany',
    ]);
    Route.put('/:id', 'JobsController.update')
      .middleware(['bodyNotEmpty', 'hasCompany'])
      .where('id', matcherId);
    Route.delete('/:id', 'JobsController.destroy')
      .where('id', matcherId)
      .middleware(['hasCompany']);

    Route.group(() => {
      Route.get('/', 'SubscriptionsController.index').middleware([
        'hasCompany',
      ]);
      Route.get('/:subId', 'SubscriptionsController.show')
        .where('subId', matcherId)
        .middleware(['hasCompany']);
      Route.post('/', 'SubscriptionsController.store');
      Route.delete('/', 'SubscriptionsController.destroy');
    })
      .prefix('/:jobId/subscriptions')
      .where('jobId', matcherId);
  }).prefix('/jobs');

  Route.group(() => {
    Route.get('/', 'OccupationsController.index');
    Route.get('/:id', 'OccupationsController.show').where('id', matcherId);
  }).prefix('/occupations');
}).middleware(['auth', 'emailVerified']);

Route.group(() => {
  Route.get('/', 'CountiesController.index');
  Route.get('/:id', 'CountiesController.show').where('id', matcherId);
}).prefix('/counties');

Route.group(() => {
  Route.get('/', 'StatesController.index');
  Route.get('/:id', 'StatesController.show').where('id', matcherId);
}).prefix('/states');

Route.any('*', ({ response }) =>
  response.notFound({ errors: [{ message: 'Route not found' }] })
);
