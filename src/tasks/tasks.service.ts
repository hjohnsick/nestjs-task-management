import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { title } from 'process';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description, 
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);

        return task;
    }

    deleteTask(id: string): void {
        let index = this.tasks.findIndex(task => task.id === id);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
       const task = this.getTaskById(id);
       task.status = status;
       return task;
    }
}
