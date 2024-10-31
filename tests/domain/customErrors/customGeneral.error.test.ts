import { CustomGeneralError } from './../../../src/domain/index';

describe('CustomGeneralError', () => {
  test('debe asignar el mensaje y el statusCode correctamente', () => {
    const message = 'Error personalizado';
    const statusCode = 404;
    const error = new CustomGeneralError(message, statusCode);

    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(statusCode);
  });

  test('debe asignar un statusCode predeterminado de 400 si no se proporciona', () => {
    const message = 'Error sin statusCode especificado';
    const error = new CustomGeneralError(message);

    expect(error.message).toBe(message);
    expect(error.statusCode).toBe(400);
  });

  test('debe ser una instancia de Error', () => {
    const error = new CustomGeneralError('Otro error');
    expect(error).toBeInstanceOf(Error);
  });
});