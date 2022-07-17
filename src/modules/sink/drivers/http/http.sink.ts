import { SinkDriver } from '@interfaces/sink.interface'
import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpSink<U> implements SinkDriver<U> {
    private readonly logger = new Logger(HttpSink.name);
    private url: string = 'https://jsonplaceholder.typicode.com/posts'

    constructor(private readonly httpService: HttpService) {}
    
    async sink(item: U): Promise<void> {
        this.logger.debug(`Trying to send HTTP POST to ${this.url}`)
        const { data } = await firstValueFrom(this.httpService.post(this.url, item))
        this.logger.debug(`Successfully sent item to ${this.url}: ${data}`)
    }
    
}