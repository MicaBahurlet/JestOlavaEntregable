import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';

// todos los tests de integración del AppController
describe('AppController (integration)', () => {
  // declaro controller principal 
  let appController: AppController;

  // beforeAll para que sea solo al inicio

  beforeAll(async () => {
    // module con controller y service real incluido 
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController], 
      providers: [AppService],     
    }).compile();

    // instancia de controller
    appController = moduleRef.get<AppController>(AppController);
  });

  // Test de integración: Verifica que el controlador y servicio trabajen juntos correctamente
  it('should return "Hello World!" from the service', () => {
    // ARRANGE no es necesario 
    
    // ACT
    const result = appController.getHello();
    
    // ASSERT
    expect(result).toBe('Hello World!');
  });
});
