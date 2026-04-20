export class ProjectViewModel {
    constructor({ repo, addProject, addTodo, toggleTodo }){
        this.repo = repo;
        this.addProject = addProject;
        this.addTodo = addTodo;
        this.toggleTodo = toggleTodo;

        this.projects = [];
        this.selectedProject = null;
        this.listeners = [];
    }

    load() {
        console.log('Loading projects...', this.repo);
        this.projects = this.repo.getAll();
        this.selectedProject = this.projects[0] || null;
        this._notify();
    }

    selectProject(id) {
        this.selectedProject = this.projects.find(p => p.id === id);
        this._notify();
    }

    createProject(name) {
        this.addProject.execute(name);
        this.load();
    }

    createTodo(title) {
        if (!this.selectedProject) return;
        this.addTodo.execute(this.selectedProject.id, title);
        this.load();
    }
    
    toggleTodo(todoId) {
        if (!this.selectedProject) return;
        this.toggleTodo.execute(this.selectedProject.id, todoId);
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