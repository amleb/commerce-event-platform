import { HealthController } from '../src/health/controller';

describe('HealthController', () => {
  it('returns service health status', () => {
    const controller = new HealthController();

    expect(controller.health()).toEqual({
      status: 'ok',
      service: 'order-service',
    });
  });
});
