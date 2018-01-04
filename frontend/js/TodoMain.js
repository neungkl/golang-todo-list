export default {
	name: 'todo-main',
	template: `
  <div class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list" v-for="todo in todos">
      <li v-bind:class="getTodoStatus(todo)">
        <div class="view">
          <input class="toggle" type="checkbox" v-on:click="updateChecked(todo, $event)">
          <label>{{ todo.description }}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
      </li>
    </ul>
  </div>
  `,
	data() {
		return {
			todos: [
				{
					description: 'Taste Javascript',
          completed: true,
          checked: false
				},
				{
					description: 'Buy a unicord',
          completed: false,
          checked: false
				}
			]
		};
  },
  methods: {
    updateChecked(todo, event) {
      todo.checked = event.target.checked;
    },
    getTodoStatus(todo) {
      return {
        'completed': todo.completed
      }
    }
  }
};
