import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';
import { CoursesService } from './courses.service';

import { Course } from '../typeORM/entities/course.entity';
import { Tags } from '../../tags/typeORM/entities/tags.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
})
describe('CoursesService', () => {
  let coursesService: CoursesService;
  let courseRepository: MockRepository

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: Connection, 
          useValue: {} 
        },
        { provide: getRepositoryToken(Course), 
          useValue: createMockRepository()
        },
        { provide: getRepositoryToken(Tags),
          useValue: createMockRepository()
        }

      ],
    }).compile();

    coursesService = app.get<CoursesService>(CoursesService);
    courseRepository= app.get<MockRepository>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(coursesService).toBeDefined()
  });

  describe('findOne', () => {
    describe("busca pelo ID", () => {
      //sucesso
      it('return', async () => {
        var courseId = '1'
        var expectedCourse = {}

        courseRepository.findOne.mockReturnValue(expectedCourse)
        const service = await coursesService.findOne(courseId)
        expect(service).toEqual(expectedCourse)
      });

      //tratativa de erro
      it('return NotFoundException', async () => {
        var courseId = '1'

        courseRepository.findOne.mockReturnValue(undefined)
        try{
          await coursesService.findOne(courseId)
        }catch(error){
          expect(error).toBeInstanceOf(NotFoundException)
          expect(error.message).toEqual(`Course Id ${courseId} not found`)

        }
      });
    })
  })
});
