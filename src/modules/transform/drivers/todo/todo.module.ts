import { DynamicModule, Module } from '@nestjs/common'
import { TodoTransform } from './todo.transform'

@Module({})
export class TodoTransformModule {
  static register(): DynamicModule {
    return {
      module: TodoTransformModule,
      imports: [],
      providers: [
        {
          provide: 'TRANSFORM_DRIVER',
          useClass: TodoTransform
        }
      ],
      exports: ['TRANSFORM_DRIVER']
    }
  }
}
