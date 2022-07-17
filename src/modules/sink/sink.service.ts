import { Inject, Injectable, Logger } from "@nestjs/common";
import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { SinkDriver } from "@interfaces/sink.interface";

@Injectable()
@Processor('sink')
export class Sink<U> {
    private readonly logger = new Logger(Sink.name);

    constructor(@Inject('SINK_DRIVER') private driver: SinkDriver<U>) {}

    @Process({ concurrency: 100 })
    async sink(job: Job<U>) {
        this.logger.debug(`Trying to sink item from job ${job.id}`)
        await this.driver.sink(job.data)
        this.logger.debug(`Successfully sank item from job ${job.id}`)
    }
}