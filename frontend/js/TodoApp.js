import TodoHeader from './TodoHeader.js';
import TodoMain from './TodoMain.js';
import TodoFooter from './TodoFooter.js';

export default {
  name: 'todo-app',
  components: {
    'todo-header': TodoHeader,
    'todo-main': TodoMain,
    'todo-footer': TodoFooter
  },
  template: `
  <div>
    <todo-header></todo-header>
    <todo-main></todo-main>
    <todo-footer></todo-footer>
  </div>
  `
}