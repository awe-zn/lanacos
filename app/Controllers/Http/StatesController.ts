import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import State from 'App/Models/State';

export default class StatesController {
  public async index({ response }: HttpContextContract) {
    const states = await State.query();

    return response.ok({ states });
  }

  public async show({ response, params, request }: HttpContextContract) {
    const { id } = params;

    const counties = !!Number(request.qs().counties);

    const state = await State.find(id);

    if (!state)
      return response.notFound({ errors: [{ message: 'State not found' }] });

    if (counties) await state.load('counties');

    return response.ok({ state });
  }
}
