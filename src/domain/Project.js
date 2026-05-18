import { Todo } from "./Todo.js";

export class Project {
    /**
     *
     * @param {String} id
     * @param {String} name
     * @param {Todo[]} todos
     */
    constructor(id, name, todos = []) {
        if (!id) throw new Error("ID is required");
        if (!name) throw new Error("Name is required");

        this.id = id;
        this.name = name;
        this.todos = todos.map((t) =>
            t instanceof Todo
                ? t
                : new Todo(
                      t.id,
                      t.title,
                      t.description,
                      t.priority,
                      t.dueDate,
                      t.completed,
                  ),
        );
    }

    _sortByPriority() {
        this.todos.sort((a, b) => b.priority - a.priority);
    }

    /**
     *
     * @param {Todo} todo
     */
    addTodo(todo) {
        this.todos.push(todo);
        this._sortByPriority();
    }

    hasTodo(todoId) {
        return this.todos.some((t) => t.id === todoId);
    }

    removeTodo(todoId) {
        const index = this.todos.findIndex((t) => t.id === todoId);
        if (index === -1) throw new Error("Todo not found");
        this.todos.splice(index, 1);
    }

    removeTodos() {
        this.todos = [];
    }

    editTodo(todoId, updates) {
        const todo = this.todos.find((t) => t.id === todoId);
        if (!todo) throw new Error("Todo not found");
        todo.update(updates);
        this._sortByPriority();
    }

    /**
     *
     * @param {String} todoId
     */
    toggleTodo(todoId) {
        const todo = this.todos.find((t) => t.id === todoId);
        if (!todo) throw new Error("Todo not found");
        todo.toggle();
    }
}
