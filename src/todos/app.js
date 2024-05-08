import html from './app.html?raw'; //Importacion en crudo de html
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';


const elementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    pendingCound: '#pending-count'
}

/**
 * 
 * @param {String} elementId elemento donde se va a renderizar la aplicación
 */
export const App = (elementId) => {

  
    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        updatPending();
        renderTodos(elementIDs.TodoList, todos);
    }

    const updatPending = () => {
        renderPending(elementIDs.pendingCound);
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
    const btnClearCompleted = document.querySelector(elementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll(elementIDs.TodoFilters);
    

    

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

    btnClearCompleted.addEventListener('click', ( ) => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach( element  => {
        element.addEventListener('click', ( element )=>{
            filtersLIs.forEach( el => { el.classList.remove('selected')} );
            element.target.classList.add('selected');

            switch (element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All);                    
                break;

                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);                 
                break;

                case 'Completados':
                    todoStore.setFilter(Filters.Completed); 
                break;

                default:
                    throw new Error('Filter is not Valid');            
            }

            displayTodos();

        });
    } );

}