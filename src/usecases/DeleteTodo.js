import { Todo } from "../domain/Todo.js";

export class DeleteTodo {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }

    execute(projectId, todoId) {
        const project = this.todoRepository.getById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        project.removeTodo(todoId);
        this.todoRepository.update(project);
    }
}