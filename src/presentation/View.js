export class View {
    constructor(vm) {
        this.vm = vm;

        this.projectList = document.getElementById('projects');
        this.todoList = document.getElementById('todos');

        this.projectInput = document.getElementById('project-input');
        this.todoInput = document.getElementById('todo-input');

        this._bind();
        this.vm.subscribe(this.render.bind(this));
    }

    _bind() {
        document.getElementById('add-project').onclick = () => {
            this.vm.createProject(this.projectInput.value);
            this.projectInput.value = '';  
        };

        document.getElementById('add-todo').onclick = () => {
            this.vm.createTodo(this.todoInput.value);
            this.todoInput.value = '';  
        }
    }

    render(state) {
        const { projects, selectedProject } = state;
        
        this.projectList.innerHTML = '';

        console.log(this.vm);

        projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = project.name;
            li.onclick = () => this.vm.selectProject(project.id);
            this.projectList.appendChild(li);
        });

        this.todoList.innerHTML = '';

        if(! selectedProject) return;
        selectedProject.todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title + (todo.completed ? ' (done)' : '');
            li.style.textDecoration = todo.completed ? 'line-through' : 'none';
            li.onclick = () => this.vm.toggleTodo(todo.id);
            this.todoList.appendChild(li);
        });
    }
}