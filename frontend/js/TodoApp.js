import TodoHeader from './TodoHeader.js';
import TodoMain from './TodoMain.js';

export default {
  name: 'todo-app',
  components: {
    'todo-header': TodoHeader,
    'todo-main': TodoMain
  },
  template: `
  <div>
    <todo-header></todo-header>
    <todo-main></todo-main>
  </div>
  `
}
