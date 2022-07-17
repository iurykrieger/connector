import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Job, JobOptions, Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { SourceDriver } from '@interfaces/source.interface'

@Injectable()
export class Source<T> implements OnModuleInit {
  private readonly logger = new Logger(Source.name)

  constructor(
    @InjectQueue('source') private sourceQueue: Queue<T>,
    @Inject('JOB_OPTIONS') private options: JobOptions,
    @Inject('SOURCE_DRIVER') private driver: SourceDriver<T>
  ) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('Starting to fetch items...')
    await this.driver.fetch((item: T) => this.addItemToQueue(item))
  }

  private async addItemToQueue(item: T): Promise<Job<T>> {
    this.logger.debug(`Trying to add item ${item} to the source queue`)
    const job = await this.sourceQueue.add(item, this.options)
    this.logger.debug(`Added item ${item} to the source queue as job ${job.id}`)
    return job
  }
}
