import html from './app.html?raw'; //Importacion en crudo de html
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';


const elementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
}

/**
 * 
 * @param {String} elementId elemento donde se va a renderizar la aplicación
 */
export const App = (elementId) => {

  
    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos(elementIDs.TodoList, todos);
    }

    //Función auto-invocada cuando se llama la funcion App()
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html; //mandando la importacion de html en crudo
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias HTML
    const newDescriptionInput = document.querySelector(elementIDs.NewTodoInput);
    const todoListUl = document.querySelector(elementIDs.TodoList);

    //Listener
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if ( event.keyCode !== 13) return;
        if ( event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUl.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]'); //Busca al padre mas cercano con el nombre del atributo indicado
        todoStore.toggleTodo( element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUl.addEventListener('click', ( event ) => {
        const element = event.target;
        const element2 = event.target.closest('[data-id]');

        if ( element.className === 'destroy'){
            todoStore.deleteTodo( element2.getAttribute('data-id') );
            displayTodos();
        }else{
            return;
        }
      
    });

}