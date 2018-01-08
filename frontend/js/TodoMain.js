import TodoItem from './TodoItem.js';

export default {
  name: 'todo-main',
  components: {
    'todo-item': TodoItem
  },
  props: ['eventBus'],
	template: `
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list" v-for="todo in todos">
      <todo-item v-bind:todo="todo" v-bind:eventBus="eventBus"></todo-item>
    </ul>
  </section>
  `,
	data() {
    return {
			todos: []
		};
  },
  methods: {
    fetchData() {
      fetch('/list').then(function (response) {
        return response.json();
      }).then(function (response) {
        this.todos = response;
        var count = 0;
        for (var i = 0; i < this.todos.length; i++) {
          var todo = this.todos[i];
          if (!todo.completed) {
            count++;
          }
        }
        this.eventBus.$emit('itemCount', count);
      }.bind(this));
    },
    refresh() {
      console.log('refresh');
    }
  },
  created() {
    this.fetchData();
    this.eventBus.$on('refresh', this.fetchData);
  }
};
