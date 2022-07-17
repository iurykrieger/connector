import { SourceCallback, SourceDriver } from '@interfaces/source.interface'
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class HttpSource<T> implements SourceDriver<T> {
  private readonly logger = new Logger(HttpSource.name)
  private url = 'https://jsonplaceholder.typicode.com/todos'

  constructor(private readonly httpService: HttpService) {}

  async fetch(callback: SourceCallback<T>): Promise<void> {
    this.logger.debug(`Fetching data from ${this.url}`)
    const { data: items } = await firstValueFrom(
      this.httpService.get<T[]>(this.url)
    )

    await Promise.allSettled(items.map((item) => callback(item)))
  }
}
