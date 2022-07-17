import { BullModule } from '@nestjs/bull';
import { DynamicModule, Module } from '@nestjs/common';
import { JobOptions } from 'bull';
import { Source, SourceDriver } from './source.service';

@Module({})
export class SourceModule {

  static register<T>(driver: SourceDriver<T>, options?: JobOptions): DynamicModule {
    return {
      module: SourceModule,
      imports: [
        BullModule.registerQueue({
          name: 'source'
        })   
      ],
      providers: [
        {
          provide: 'SOURCE_DRIVER',
          useValue: driver
        },
        {
          provide: 'JOB_OPTIONS',
          useValue: options
        },
        Source
      ],
      exports: [Source],
    };
  }
}
