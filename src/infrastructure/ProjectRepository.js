import { Project } from '../domain/Project.js';

const STORAGE_KEY = 'projects';

export class ProjectRepository {
    _load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("Corrupted storage, resetting...", e);
            return [];
        }
    }

    /**
     * 
     * @param {Project[]} data 
     */
    _save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    getAll() {
        return this._load().map(p => new Project(p.id, p.name, p.todos));
    }

    /**
     * 
     * @param {String} id 
     * @returns {Project}
     */
    getById(id) {
        return this.getAll().find(p => p.id === id);
    }

    /**
     * 
     * @param {String} id 
     */
    deleteProject(id) {
        const data = this._load().filter(p => p.id !== id);
        this._save(data);
    }

    /**
     * 
     * @param {Project} project 
     */
    save(project) {
        const projects = this._load();
        projects.push(project);
        this._save(projects);
    }

    /**
     * 
     * @param {Project} project 
     */
    update(project) {
        const data = this._load().map(p => p.id === project.id ? project : p);
        this._save(data);
    }

}