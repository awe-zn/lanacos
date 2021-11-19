import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Institution from 'App/Models/Institution';
import NewInstitutionValidator from 'App/Validators/NewInstitutionValidator';
import UpdateInstitutionValidator from 'App/Validators/UpdateInstitutionValidator';

export default class InstitutionsController {
  public async index({ response }: HttpContextContract) {
    const institutions = await Institution.query();

    return response.ok({ institutions });
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params;

    const institution = await Institution.find(id);

    if (!institution)
      return response.notFound({
        errors: [{ message: 'Institution not found' }],
      });

    return response.ok({ institution });
  }

  public async store({ request, response }: HttpContextContract) {
    const newInstitutionData = await request.validate(NewInstitutionValidator);

    const institution = await Institution.create({ ...newInstitutionData });

    return response.ok({ institution });
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params;

    const institution = await Institution.find(id);

    if (!institution)
      return response.notFound({
        errors: [{ message: 'Institution not found' }],
      });

    const updateInstitutionData = await request.validate(
      UpdateInstitutionValidator
    );

    institution.merge({ ...updateInstitutionData });
    await institution.save();

    return response.ok({ institution });
  }

  public async destroy({ params, response }) {
    const { id } = params;

    const institution = await Institution.find(id);

    if (!institution)
      return response.notFound({
        errors: [{ message: 'Institution not found' }],
      });

    await institution.delete();

    return response.ok({
      message: 'Institution deleted with success',
    });
  }
}
