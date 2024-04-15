import html from './app.html?raw'; //Importacion en crudo de html

/**
 * 
 * @param {String} elementId elemento donde se va a renderizar la aplicación
 */
export const App = (elementId) => {

    //Función auto-invocada cuando se llama la funcion App()
    (()=>{
        const app = document.createElement('div');
        app.innerHTML = html; //mandando la importacion de html en crudo
        document.querySelector(elementId).append(app);
    })();
}