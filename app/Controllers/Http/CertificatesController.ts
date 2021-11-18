import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Drive from '@ioc:Adonis/Core/Drive';
import AcademicExperience from 'App/Models/AcademicExperience';
import Certificate from 'App/Models/Certificate';

export default class CertificatesController {
  public async store({ params, auth, response, request }: HttpContextContract) {
    const { id } = params;

    const user = auth.user!;
    await user.load('resume');

    const academicExperience = await AcademicExperience.find(id);

    if (!academicExperience)
      return response.notFound({
        errors: [{ message: 'Academic experience not found' }],
      });

    if (academicExperience.resumeId !== user.resume.id)
      return response.unauthorized({
        errors: [
          {
            message: 'User unauthorized to access this academic experience',
          },
        ],
      });

    const previousCertificate = await Certificate.findBy(
      'academicExperienceId',
      academicExperience.id
    );
    if (previousCertificate)
      return response.conflict({
        errors: [{ message: 'Academic experience already has certificate' }],
      });

    const certificateFile = request.file('certificate', {
      extnames: ['pdf'],
      size: '512kb',
    });

    if (!certificateFile)
      return response.badRequest({
        errors: [{ message: 'Certificate not found' }],
      });

    if (!certificateFile.isValid) return certificateFile.errors;

    await certificateFile.moveToDisk('certificates', {}, 's3');

    const certificate = await Certificate.create({
      academicExperienceId: id,
      path: certificateFile.fileName,
    });

    await certificate.getUrl();

    return response.ok({ certificate });
  }

  public async show({ params, auth, response }: HttpContextContract) {
    const { id } = params;

    const user = auth.user!;
    await user.load('resume');

    const academicExperience = await AcademicExperience.find(id);

    if (!academicExperience)
      return response.notFound({
        errors: [{ message: 'Academic experience not found' }],
      });

    if (academicExperience.resumeId !== user.resume.id)
      return response.unauthorized({
        errors: [
          {
            message: 'User unauthorized to access this academic experience',
          },
        ],
      });

    const certificate = await Certificate.findBy('academicExperienceId', id);

    if (!certificate)
      return response.notFound({
        errors: [{ message: 'Certificate not found' }],
      });

    await certificate.getUrl();

    return response.ok({ certificate });
  }

  public async update({
    params,
    auth,
    response,
    request,
  }: HttpContextContract) {
    const { id } = params;

    const user = auth.user!;
    await user.load('resume');

    const academicExperience = await AcademicExperience.find(id);

    if (!academicExperience)
      return response.notFound({
        errors: [{ message: 'Academic experience not found' }],
      });

    if (academicExperience.resumeId !== user.resume.id)
      return response.unauthorized({
        errors: [
          {
            message: 'User unauthorized to access this academic experience',
          },
        ],
      });

    const certificate = await Certificate.findBy(
      'academicExperienceId',
      academicExperience.id
    );
    if (!certificate)
      return response.conflict({
        errors: [{ message: 'Academic experience do not has certificate' }],
      });

    const certificateFile = request.file('certificate', {
      extnames: ['pdf'],
      size: '512kb',
    });

    if (!certificateFile)
      return response.badRequest({
        errors: [{ message: 'Certificate not found' }],
      });

    if (!certificateFile.isValid) return certificateFile.errors;

    await Drive.delete(certificate.path);
    await certificateFile.moveToDisk('certificates', {}, 's3');

    certificate.path = certificateFile.fileName!;
    await certificate.save();
    await certificate.getUrl();

    return response.ok({ certificate });
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const { id } = params;

    const user = auth.user!;
    await user.load('resume');

    const academicExperience = await AcademicExperience.find(id);

    if (!academicExperience)
      return response.notFound({
        errors: [{ message: 'Academic experience not found' }],
      });

    if (academicExperience.resumeId !== user.resume.id)
      return response.unauthorized({
        errors: [
          {
            message: 'User unauthorized to access this academic experience',
          },
        ],
      });

    const certificate = await Certificate.findBy('academicExperienceId', id);

    if (!certificate)
      return response.notFound({
        errors: [{ message: 'Certificate not found' }],
      });

    await Drive.delete(certificate.path);
    await certificate.delete();

    return response.ok({
      message: 'Certificate deleted with success',
    });
  }
}
