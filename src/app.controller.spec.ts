
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//todos los tests relacionados con AppController
describe('AppController', () => {
  // voy a usar estas variables en los tests
  let appController: AppController;
  let appService: AppService;

  // beforeEach antes de cada test individual
  // module test y las dependencias necesarias
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], 
      providers: [AppService],      
    }).compile();

    // instancias del controller
    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  // agrupo tests relacionados con el método getHello
  describe('getHello', () => {
    // Test 1: que el método retorna el valor esperado
    it('should return "Hello World!"', () => {
      // ARRANGE mockeo necesario
      const expectedResult = 'Hello World!';

      jest.spyOn(appService, 'getHello').mockReturnValue(expectedResult);

      // ACT 
      const result = appController.getHello();

      // ASSERT el result
      expect(result).toBe(expectedResult);
      expect(appService.getHello).toHaveBeenCalledTimes(1);
    });

    // Test 2: que el controlador llama al servicio
    it('should call appService.getHello method', () => {
      // ARRANGE
      const getHelloSpy = jest.spyOn(appService, 'getHello');

      // ACT
      appController.getHello();

      // ASSERT
      expect(getHelloSpy).toHaveBeenCalledTimes(1);
    });

    // Test 3:que el controlador retorna exactamente lo que devuelve el servicio
    it('should return the exact value from service', () => {
      // ARRANGE
      const serviceResult = 'Hello World!';
      jest.spyOn(appService, 'getHello').mockReturnValue(serviceResult);

      // ACT
      const controllerResult = appController.getHello();

      // ASSERT
      expect(controllerResult).toBe(serviceResult);
    });
  });

  describe('constructor', () => {
    // Test 4  que el controlador se instancia correctamente
    it('should be defined', () => {
      // ASSERT
      expect(appController).toBeDefined();
    });

    // Test 5que el servicio se inyecta correctamente
    it('should have appService injected', () => {
      // ASSERT
      expect(appService).toBeDefined();
    });
  });
});
