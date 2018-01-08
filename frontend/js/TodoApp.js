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
    <todo-header v-bind:eventBus="eventBus"></todo-header>
    <todo-main v-bind:eventBus="eventBus"></todo-main>
    <todo-footer v-bind:eventBus="eventBus"></todo-footer>
  </div>
  `,
  data() {
    return {
      eventBus: new Vue()
    }
  },
  methods: {

  }
}