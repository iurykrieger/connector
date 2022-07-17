import { DynamicModule, Module } from '@nestjs/common'
import { Sink } from './sink.service'

@Module({})
export class SinkModule {
  static register(sinkDriver: DynamicModule): DynamicModule {
    return {
      module: SinkModule,
      imports: [sinkDriver],
      providers: [Sink],
      exports: [Sink]
    }
  }
}
