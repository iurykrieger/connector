import { TransformDriver } from '@interfaces/transform.interface'
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TodoTransform implements TransformDriver<Todo, Tada> {
    private readonly logger = new Logger(TodoTransform.name);
    
    async transform(todo: Todo): Promise<Tada> {
        this.logger.debug(`Parsing Todo item ${todo.id} into Tada`)
        return {
            id: todo.id.toString(),
            name: todo.title,
            isCompleted: todo.completed
        }
    }
}

interface Todo {
    userId: number
    id: number
    title: string
    completed: boolean
}

interface Tada {
    id: string
    name: string
    isCompleted: boolean
}