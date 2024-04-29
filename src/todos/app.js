import html from './app.html?raw'; //Importacion en crudo de html
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';


const elementIDs = {
    TodoList: '.todo-list'
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
}