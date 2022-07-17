import { Job } from 'bull'

export type SourceCallback<T> = (item: T) => Promise<Job<T>>

export interface SourceDriver<T> {
  fetch(callback: SourceCallback<T>): Promise<void>
}
