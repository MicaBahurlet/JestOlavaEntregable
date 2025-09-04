import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest'; 
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module'; 


// simulo peticiones reales 
describe('AppController (e2e)', () => {
  // variable de la app para los tests
  let app: INestApplication<App>;

  // se ejecuta una sola vez< antes de todos los tests

  beforeAll(async () => {
    // importo todo el AppModule en el modulo de test
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], 
    }).compile();


    app = moduleFixture.createNestApplication();
    // simulacion de la app corriendo
    await app.init();
  });

  // una sola vez antes que todos los tests. 
  afterAll(async () => {
    await app.close(); // cierro el proceso de simulacion de la app. 
  });

  // test a tura raiz 
  describe('GET /', () => {
    // responde correctamente?
    it('should return "Hello World!" with status 200', () => {

      return request(app.getHttpServer()) 
        .get('/')                         
        .expect(200)                      // tiene que ser ok
        .expect('Hello World!');          
    });

    // tiene el tipo de contenido correcto?
    it('should return correct content type', () => {

      return request(app.getHttpServer())
        .get('/')                         
        .expect(200)                      
        .expect('Content-Type', /text\/html/); // todo deberia ser text/html
    });

    // multiples peticiones? hago 3 para ver como la maneja y que deberia retornar
    it('should handle multiple requests', async () => {

      for (let i = 0; i < 3; i++) {
        await request(app.getHttpServer())
          .get('/')                       
          .expect(200)                    
          .expect('Hello World!');        
      }
    });
  });


  describe('Error handling', () => {
    // si hay algún error devuelve 404?
    it('should return 404 for non-existent routes', () => {
      // ruta que no existe
      return request(app.getHttpServer())
        .get('/empanada')             
        .expect(404);                     // tiene que devolver 404
    });

    // metodos erroneos dan 404 error
    it('should return 404 for POST requests to root', () => {
      return request(app.getHttpServer())
        .post('/')                       
        .expect(404);                    
    });
  });
});
