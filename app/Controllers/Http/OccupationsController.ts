import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Occupation from 'App/Models/Occupation';

export default class OccupationsController {
  public async index({ response, request }: HttpContextContract) {
    const page = Number(request.qs().page) || 1;
    const limit = 10;

    const occupations = await Occupation.query().paginate(page, limit);

    return response.ok({ occupations });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const occupation = await Occupation.find(id);

    if (!occupation)
      return response.notFound({
        errors: [{ message: 'Occupation not found' }],
      });

    return response.ok({ occupation });
  }
}
