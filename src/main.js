import { ProjectRepository } from './infrastructure/ProjectRepository.js';

import { AddProject } from './usecases/AddProject.js';
import { AddTodo } from './usecases/AddTodo.js';
import { ToggleTodo } from './usecases/ToggleTodo.js';

import { ProjectViewModel } from './presentation/ProjectViewModel.js';
import { View } from './presentation/View.js';

const repo = new ProjectRepository();

const addProject = new AddProject(repo);
const addTodo = new AddTodo(repo);
const toggleTodo = new ToggleTodo(repo);

const vm = new ProjectViewModel({
    repo,
    addProject,
    addTodo,
    toggleTodo,
});

new View(vm);

vm.load();
