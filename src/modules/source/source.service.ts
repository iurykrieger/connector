import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { Job, JobOptions, Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

export type SourceCallback<T> = (item: T) => Promise<Job<T>>

export type SourceDriver<T> = (callback: SourceCallback<T>) => Promise<void> | void

@Injectable()
export class Source<T> implements OnModuleInit {

    constructor(
        @InjectQueue('source') private sourceQueue: Queue<T>,
        @Inject('JOB_OPTIONS') private options: JobOptions,
        @Inject('SOURCE_DRIVER') private driver: SourceDriver<T>
    ) {}
    
    async onModuleInit(): Promise<void> {
        await this.driver((item: T) => this.addItemToQueue(item))
    }

    private addItemToQueue(item: T): Promise<Job<T>> {
        return this.sourceQueue.add(item, this.options)
    }

}