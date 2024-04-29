import { Todo } from "../models/todo.model";
import { createTodoHtml } from "./create-todo-html";

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todo 
 */
export const renderTodos = ( elementId, todos = [] ) => {

   if ( !element ){
      element = document.querySelector( elementId );
   }

   if ( !element ){
      throw new Error(`Element ${elementId} is not found`);
   }

   element.innerHTML = '';

   todos.forEach( (todo) => {
    element.append( createTodoHtml( todo ) );
   });
}