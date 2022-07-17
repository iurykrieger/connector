import { HttpModule, HttpModuleOptions } from '@nestjs/axios'
import { DynamicModule, Module } from '@nestjs/common'
import { HttpSource } from './http.source'

@Module({})
export class HttpSourceModule {
  static register(options?: HttpModuleOptions): DynamicModule {
    return {
      module: HttpSourceModule,
      imports: [HttpModule.register(options)],
      providers: [
        {
          provide: 'SOURCE_DRIVER',
          useClass: HttpSource
        }
      ],
      exports: ['SOURCE_DRIVER']
    }
  }
}
