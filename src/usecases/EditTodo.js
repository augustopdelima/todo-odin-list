export class EditTodo {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }

    execute(projectId, todoId, updates) {
        const project = this.todoRepository.getById(projectId);
        if (!project) {
            throw new Error('Project not found');
        }

        project.editTodo(todoId, updates);
        this.todoRepository.update(project);
    }
}