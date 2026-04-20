import { Todo } from '../domain/Todo.js';

export class AddTodo {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }

    execute(projectId, title) {
        const project = this.todoRepository.getById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        const newTodo = new Todo(Date.now(), title);

        project.addTodo(newTodo);
        this.todoRepository.update(project);
    }
}