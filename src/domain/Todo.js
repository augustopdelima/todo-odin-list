export class Todo {
    /**
     * 
     * @param {String} id 
     * @param {String} title 
     * @param {String} description 
     * @param {Number} priority 
     * @param {Date|null} dueDate 
     * @param {Boolean} completed 
     */

    constructor(id, title, description = '', priority = 0, dueDate = null, completed = false) {
        if (!id) throw new Error('ID is required');
        if (!title) throw new Error('Title is required');


        this._validatePriority(priority);

        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = completed;
    }


    _validatePriority(priority) {
        if (typeof priority !== 'number' || priority < 0 ) {
            throw new Error('Priority must be a non-negative number');
        }
    }

    /**
     * 
     * @param {Number} priority 
     */
    setPriority(priority) {
        this._validatePriority(priority);
        return new Todo(this.id, this.title, this.description, priority, this.dueDate, this.completed);
    }

    toggle() {
        this.completed = !this.completed;
    }
}