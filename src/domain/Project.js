import { Todo } from './Todo.js';

export class Project {
    /**
     * 
     * @param {String} id 
     * @param {String} name 
     * @param {Todo[]} todos 
     */
    constructor(id, name, todos = []) {
        if (!id) throw new Error('ID is required');
        if (!name) throw new Error('Name is required');

        this.id = id;
        this.name = name;
        this.todos = todos.map(t => t instanceof Todo ? t : new Todo(t.id, t.title, t.description, t.priority, t.dueDate, t.completed)); 
        
    }

    /**
     * 
     * @param {Todo} todo 
     */
    addTodo(todo) {
        this.todos.push(todo);
    }

    hasTodo(todoId) {
        return this.todos.some(t => t.id === todoId);
    }

    /**
     * 
     * @param {String} todoId 
     */
    toggleTodo(todoId) {
        const todo = this.todos.find(t => t.id === todoId);
        if(!todo) throw new Error('Todo not found');
        todo.toggle();
    }
}