import { BullModule } from '@nestjs/bull';
import { DynamicModule, Module } from '@nestjs/common';
import { JobOptions } from 'bull';
import { Transform } from './transform.service';

@Module({})
export class TransformModule {

  static register(transformDriver: DynamicModule, options?: JobOptions): DynamicModule {
    return {
      module: TransformModule,
      imports: [
        BullModule.registerQueue({
          name: 'sink'
        }),
        transformDriver 
      ],
      providers: [
        {
          provide: 'JOB_OPTIONS',
          useValue: options
        },
        Transform
      ],
      exports: [Transform],
    };
  }
}
