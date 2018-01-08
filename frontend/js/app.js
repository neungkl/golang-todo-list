import TodoApp from './TodoApp.js';
import TodoHeader from './TodoHeader.js';
import TodoMain from './TodoMain.js';
import TodoItem from './TodoItem.js';
import TodoFooter from './TodoFooter.js';

Vue.config.devtools = true;

window.onload = function () {  
  new Vue({
    el: '#todoapp',
    components: {
      TodoHeader,
      TodoMain,
      TodoApp,
      TodoItem,
      TodoFooter
    }
  });
}  
