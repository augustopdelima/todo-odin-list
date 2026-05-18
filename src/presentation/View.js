export class View {
    constructor(vm) {
        this.vm = vm;

        this.projectList = document.getElementById('projects');
        this.todoList = document.getElementById('todos');

        this.projectInput = document.getElementById('project-input');
        this.todoInput = document.getElementById('todo-input');

        this.editingTodoId = null;

        this._bind();
        this.vm.subscribe(this.render.bind(this));
    }


    PRIORITY_TEXT = {
        10: 'High',
        5: 'Medium',
        1: 'Low'
    };

    _bind() {
        document.getElementById('add-project').onclick = () => {
            this.vm.createProject(this.projectInput.value);
            this.projectInput.value = '';
        };

        document.getElementById('todo-form').addEventListener('submit', (e) => {

            e.preventDefault();

            const form = e.target;

            const data = new FormData(form);

            const todo = {
                title: data.get('todo-title'),
                description: data.get('todo-description'),
                dueDate: data.get('todo-due-date'),
                priority: data.get('todo-priority')
            };


            if (this.editingTodoId) {
                this.vm.editATodo(this.editingTodoId, todo);
                this.editingTodoId = null;
                form.reset();
                document.getElementById('todo-dialog').close();
                return;
            }

            this.vm.createTodo(todo);

            form.reset();
            document.getElementById('todo-dialog').close();
        });

        document.getElementById('add-todo').onclick = () => {
            document.getElementById('todo-dialog').showModal();
        };

        document.getElementById('cancel-todo').onclick = () => {
            document.getElementById('todo-dialog').close();
        };
    }

    render(state) {
        const { projects, selectedProject } = state;

        this.projectList.innerHTML = '';


        projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = project.name;
            li.onclick = () => this.vm.selectProject(project.id);

            if (selectedProject && project.id === selectedProject.id) {
                li.classList.add('active-project');
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                this.vm.deleteAProject(project.id);
            };

            deleteBtn.classList.add('delete-project-btn');

            li.appendChild(deleteBtn);

            this.projectList.appendChild(li);
        });

        this.todoList.innerHTML = '';

        if (!selectedProject) return;
        selectedProject.todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title + (todo.completed ? ' (done)' : '');
            li.style.textDecoration = todo.completed ? 'line-through' : 'none';
            li.onclick = () => this.vm.toggleATodo(todo.id);

            const priorityClass = `priority-${this.PRIORITY_TEXT[todo.priority]}`;

            li.classList.add("todo-item");
            li.classList.add(priorityClass);



            const todoInfo = document.createElement('div');
            todoInfo.classList.add('todo-details');
            todoInfo.innerHTML = `
                <p class="todo-desc">${todo.description || 'No description provided.'}</p>
                <div class="todo-metadata">
                    <span class="todo-date">
                        <span class="icon">📅</span> ${new Date(todo.dueDate).toLocaleDateString()}
                    </span>
                    <span class="todo-priority-label">
                        <span class="icon">🚩</span> ${this.PRIORITY_TEXT[todo.priority]}
                    </span>
                </div>
            `;

            li.appendChild(todoInfo);


            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                this.vm.deleteATodo(todo.id);
            };

            deleteBtn.classList.add('delete-todo-btn');

            li.appendChild(deleteBtn);
            
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = (e) => {
                e.stopPropagation();

                this.editingTodoId = todo.id;

                document.getElementById('todo-title-input').value = todo.title;
                document.getElementById('todo-description-input').value = todo.description;
                document.getElementById('todo-due-date-input').value = todo.dueDate;
                document.getElementById('todo-priority-input').value = todo.priority;
                
                document.getElementById('todo-dialog').showModal();
               
            };

            

            li.appendChild(editBtn);

            this.todoList.appendChild(li);
        });
    }
}