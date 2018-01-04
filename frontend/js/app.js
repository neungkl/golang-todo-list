import TodoApp from './TodoApp.js';
import TodoHeader from './TodoHeader.js';
import TodoMain from './TodoMain.js';

Vue.config.devtools = true;

window.onload = function () {  
  new Vue({
    el: '#todoapp',
    components: {
      TodoHeader,
      TodoMain,
      TodoApp
    }
  });
}  
