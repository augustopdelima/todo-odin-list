export class ToggleTodo {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }

    execute(projectId, todoId) {
        const project = this.todoRepository.getById(projectId);
        if (!project) throw new Error('Project not found');
        if (!project.hasTodo(todoId)) throw new Error('Todo not found');

        project.toggleTodo(todoId);

        this.todoRepository.update(project);
    }
}