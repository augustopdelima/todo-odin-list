import { Project } from '../domain/Project.js';

export class AddProject {
    constructor(repo) {
        this.repo = repo;
    }

    execute(name) {
        const project = new Project(Date.now().toString(), name);
        this.repo.save(project);
        return project;
    }
}