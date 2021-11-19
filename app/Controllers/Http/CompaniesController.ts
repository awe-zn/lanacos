import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Company from 'App/Models/Company';
import NewCompanyValidator from 'App/Validators/NewCompanyValidator';
import UpdateCompanyValidator from 'App/Validators/UpdateCompanyValidator';

export default class CompaniesController {
  public async index({ response, auth }: HttpContextContract) {
    const { admin, id: managerId } = auth.user!;

    let companies: Company[];

    if (admin) companies = await Company.query();
    else companies = await Company.query().where('managerId', managerId);

    return response.ok({ companies });
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const { id: managerId } = auth.user!;

    const newCompanyData = await request.validate(NewCompanyValidator);

    const company = await Company.create({ ...newCompanyData, managerId });

    return response.ok({ company });
  }

  public async show({ params, auth, response }: HttpContextContract) {
    const { id: managerId } = auth.user!;
    const { id } = params;

    const company = await Company.find(id);

    if (!company)
      return response.notFound({ errors: [{ message: 'Company not found' }] });

    if (company.managerId !== managerId)
      return response.unauthorized({
        erros: [{ message: 'User unauthorized to access this company' }],
      });

    return response.ok({ company });
  }

  public async update({
    params,
    auth,
    response,
    request,
  }: HttpContextContract) {
    const { id: managerId } = auth.user!;
    const { id } = params;

    const company = await Company.find(id);

    if (!company)
      return response.notFound({ errors: [{ message: 'Company not found' }] });

    if (company.managerId !== managerId)
      return response.unauthorized({
        erros: [{ message: 'User unauthorized to access this company' }],
      });

    const updateCompanyData = await request.validate(UpdateCompanyValidator);

    company.merge({ ...updateCompanyData });
    await company.save();

    return response.ok({ company });
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const { id: managerId } = auth.user!;
    const { id } = params;

    const company = await Company.find(id);

    if (!company)
      return response.notFound({ errors: [{ message: 'Company not found' }] });

    if (company.managerId !== managerId)
      return response.unauthorized({
        erros: [{ message: 'User unauthorized to access this company' }],
      });

    await company.delete();

    return response.ok({
      message: 'Company deleted with success',
    });
  }
}
