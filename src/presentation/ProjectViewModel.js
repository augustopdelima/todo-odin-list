export class ProjectViewModel {

    INITIAL_PROJECT = 0;

    constructor({ repo, addProject, addTodo, toggleTodo, deleteTodo, deleteProject, editTodo }) {
        this.repo = repo;
        this.addProject = addProject;
        this.addTodo = addTodo;
        this.toggleTodo = toggleTodo;
        this.deleteTodo = deleteTodo;
        this.deleteProject = deleteProject;
        this.editTodo = editTodo;

        this.projects = [];
        this.selectedProject = null;
        this.listeners = [];
    }

    load() {
        this.projects = this.repo.getAll();
        
        const previousSelectedProject = this._previousSelectedProject(this.projects);

        this.selectedProject = this._verifySelectedProject(previousSelectedProject);
        
        this._notify();
    }

    _verifySelectedProject(previousSelectedProject) {
        return previousSelectedProject || this.projects[this.INITIAL_PROJECT] || null;
    }


    _previousSelectedProject(projects) {
        return projects.find(p => p.id === this.selectedProject?.id)    ;
    }

    selectProject(id) {
        this.selectedProject = this.projects.find(p => p.id === id);
        this._notify();
    }

    createProject(name) {
        this.addProject.execute(name);
        this.load();
    }

    createTodo({ title, description, dueDate, priority }) {
        if (!this.selectedProject) return;
        this.addTodo.execute(this.selectedProject.id, title, description, dueDate, Number(priority));
        this.load();
    }
    
    toggleATodo(todoId) {
        if (!this.selectedProject) return;
        this.toggleTodo.execute(this.selectedProject.id, todoId);
        this.load();
    }

    deleteATodo(todoId) {
        if (!this.selectedProject) return;
        this.deleteTodo.execute(this.selectedProject.id, todoId);
        this.load();
    }

    deleteAProject(projectId) {
        if (!this.selectedProject) return;
        this.deleteProject.execute(projectId);
        this.load();
    }

    editATodo(todoId, updates) {
        if (!this.selectedProject) return;
        this.editTodo.execute(this.selectedProject.id, todoId, {
            ...updates,
            priority: Number(updates.priority),
        });
        this.load();
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    _notify() {
        this.listeners.forEach(listener => listener({
            projects: this.projects,
            selectedProject: this.selectedProject
        }));
    }
}