export interface TransformDriver<T, U> {
  transform(item: T): Promise<U>
}
