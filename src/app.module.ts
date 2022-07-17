import { PrometheusModule } from '@willsoto/nestjs-prometheus'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SourceModule } from '@modules/source/source.module'
import { HttpSourceModule } from '@modules/source/drivers/http/http.module'
import { TransformModule } from '@modules/transform/transform.module'
import { TodoTransformModule } from '@modules/transform/drivers/todo/todo.module'
import { SinkModule } from '@modules/sink/sink.module'
import { HttpSinkModule } from '@modules/sink/drivers/http/http.module'

@Module({
  imports: [
    PrometheusModule.register(),
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT')
        },
        prefix: `${configService.get<string>('NODE_ENV')}-connector`,
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: false
        }
      })
    }),
    SourceModule.register(HttpSourceModule.register(), {
      attempts: 4
    }),
    TransformModule.register(TodoTransformModule.register(), {
      attempts: 4
    }),
    SinkModule.register(HttpSinkModule.register())
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}

export interface Product {
  a: string
  b: number
}
