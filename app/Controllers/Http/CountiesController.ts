import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import County from 'App/Models/County';

export default class CountiesController {
  public async index({ response, request }: HttpContextContract) {
    const state = !!Number(request.qs().state);

    const page = request.input('page', 1);
    const limit = 10;

    const counties = await County.query().paginate(page, limit);

    for (const county of counties) {
      if (state) await county.load('state');
    }

    return response.ok({ counties });
  }

  public async show({ response, params, request }: HttpContextContract) {
    const { id } = params;

    const state = !!Number(request.qs().state);

    const county = await County.find(id);

    if (!county)
      return response.notFound({ errors: [{ message: 'County not found' }] });

    if (state) await county.load('state');

    return response.ok({ county });
  }
}
