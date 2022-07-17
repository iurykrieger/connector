import { HttpModule, HttpModuleOptions } from "@nestjs/axios";
import { DynamicModule, Module } from "@nestjs/common";
import { HttpSink } from "./http.sink";

@Module({})
export class HttpSinkModule {
  static register(options?: HttpModuleOptions): DynamicModule {
    return {
      module: HttpSinkModule,
      imports: [
        HttpModule.register(options)   
      ],
      providers: [
        {
          provide: 'SINK_DRIVER',
          useClass: HttpSink
        }
      ],
      exports: ['SINK_DRIVER'],
    };
  }
}