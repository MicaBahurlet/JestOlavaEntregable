// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotebooksModule } from './notebooks/notebooks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'jest_user',
      password: 'jest_pass',
      database: 'jest_tp',
      autoLoadEntities: true, //para las entidades import
      synchronize: true,  //para las tablas en la db vacia 
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],

  
    }),
    NotebooksModule,

  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}