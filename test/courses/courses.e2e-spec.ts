import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CoursesModule } from '../../src/courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCousesDto } from 'src/courses/typeORM/dto/create-couses.dto';
import { map } from 'rxjs';

describe('Courses: /courses', () => {
  let app: INestApplication;
  const courses: CreateCousesDto={
    name: "Nest Js com TYPEORM",
    description: "Criando API com NEST JS",
    tags: ['Node', "Javascript"]
  }
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoursesModule, TypeOrmModule.forRoot({
        type: "postgres",
        host: "localhost",
        port: 5433,
        username: "postgres",
        password: "docker",
        database: "postgresTest",
        autoLoadEntities: true,
        synchronize: true
      })],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe( 
      {
        whitelist:true,
        forbidNonWhitelisted: true,
        transform:true
      }
    ));

    await app.init();
  });

    afterAll(async()=>{
      await app.close()
    })

     it('Create POST /courses', ()=>{
      return request(app.getHttpServer())
      .post('/courses')
      .send(courses)
      .expect(HttpStatus.CREATED)
      .then(({body})=>{
        const expectedCourse = jasmine.objectContaining({
          ...courses,
          tags: jasmine.arrayContaining(
            courses.tags.map(name=> jasmine.objectContaining({name})
            )
          )
        })
        expect(body).toEqual(expectedCourse)
      })
      
     });
});
