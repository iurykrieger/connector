import { BullModule } from '@nestjs/bull';
import { DynamicModule, Module } from '@nestjs/common';
import { JobOptions } from 'bull';
import { Source } from './source.service';

@Module({})
export class SourceModule {

  static register(sourceDriver: DynamicModule, options?: JobOptions): DynamicModule {
    return {
      module: SourceModule,
      imports: [
        BullModule.registerQueue({
          name: 'source'
        }),
        sourceDriver 
      ],
      providers: [
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
