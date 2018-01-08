import TodoItem from './TodoItem.js';

export default {
  name: 'todo-main',
  components: {
    'todo-item': TodoItem
  },
	template: `
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list" v-for="todo in todos">
      <todo-item v-bind:todo="todo"></todo-item>
    </ul>
  </section>
  `,
	data() {
    return {
			todos: [
				{
					description: 'Taste Javascript',
          completed: true
				},
				{
					description: 'Buy a unicord',
          completed: false
				}
			]
		};
  },
  methods: {
    fetchData() {
      fetch('/list').then(function (response) {
        return response.json();
      }).then(function (response) {
        this.todos = response;
      }.bind(this));
    }
  },
  mounted() {
    this.fetchData();
  }
};
