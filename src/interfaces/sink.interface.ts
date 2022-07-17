export interface SinkDriver<T> {
  sink(item: T): Promise<void>
}
