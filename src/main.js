import { ProjectRepository } from './infrastructure/ProjectRepository.js';

import { AddProject } from './usecases/AddProject.js';
import { AddTodo } from './usecases/AddTodo.js';
import { ToggleTodo } from './usecases/ToggleTodo.js';
import { DeleteTodo } from './usecases/DeleteTodo.js';
import { DeleteProject } from './usecases/DeleteProject.js';
import { EditTodo } from './usecases/EditTodo.js';

import { ProjectViewModel } from './presentation/ProjectViewModel.js';
import { View } from './presentation/View.js';

const repo = new ProjectRepository();

const addProject = new AddProject(repo);
const addTodo = new AddTodo(repo);
const toggleTodo = new ToggleTodo(repo);
const deleteTodo = new DeleteTodo(repo);
const deleteProject = new DeleteProject(repo);
const editTodo = new EditTodo(repo);

const vm = new ProjectViewModel({
    repo,
    addProject,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteProject,
    editTodo
});

new View(vm);

vm.load();
