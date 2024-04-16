import { Todo } from '../todos/models/todo.model';


const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo ( 'Piedra del Tiempo' ),
        new Todo ( 'Piedra del Alma' ),
        new Todo ( 'Piedra del Vida' ),
    ],

    filter: Filters.All
}

const initStore = () =>{
    console.log(state);
    console.log('InitStore 🥑');
}

export default {
    initStore,
}
