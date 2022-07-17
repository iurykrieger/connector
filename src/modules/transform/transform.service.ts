import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Job, JobOptions, Queue } from 'bull';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { TransformDriver } from '@interfaces/transform.interface'

@Injectable()
@Processor('source')
export class Transform<T, U> {
    private readonly logger = new Logger(Transform.name);

    constructor(
        @InjectQueue('sink') private sinkQueue: Queue<U>,
        @Inject('JOB_OPTIONS') private options: JobOptions,
        @Inject('TRANSFORM_DRIVER') private driver: TransformDriver<T, U>
    ) {}

    @Process({ concurrency: 100 })
    async process(job: Job<T>) {
        const item = await this.driver.transform(job.data)
        await this.addItemToQueue(item)
    }

    private async addItemToQueue(item: U): Promise<Job<U>> {
        this.logger.debug(`Trying to add item ${item} to the sink queue`)
        const job = await this.sinkQueue.add(item, this.options)
        this.logger.debug(`Added item ${item} to the sink queue as job ${job.id}`)
        return job
    }
}