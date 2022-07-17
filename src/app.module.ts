import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SourceModule } from './modules/source/source.module';
import { SourceCallback } from './modules/source/source.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
        prefix: `${configService.get<string>('NODE_ENV')}-connector`,
      })
    }),
    SourceModule.register(async (callback: SourceCallback<Product>) => {
      while (true) {
        const p: Product = {
          a: 'teste',
          b: 1234
        }
        const job = await callback(p)
      }
    }, {
      attempts: 2
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

export interface Product {
  a: string
  b: number
}
