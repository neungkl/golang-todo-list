export default {
  name: 'todo-header',
  props: ['eventBus'],
	template: `
  <div class="header">
    <h1>todos</h1>
    <input v-model="message" v-on:keyup.enter="addTodo" class="new-todo" placeholder="What needs to be done?" autofocus>
  </div>
  `,
	data() {
		return {
			message: ''
		};
	},
	methods: {
		addTodo() {
			fetch('/add', {
				method: 'POST',
				body: JSON.stringify({
					description: this.message
				})
			}).then(
				function(response) {
          if (response.status === 200) {
            this.eventBus.$emit('refresh');
					} else {
						alert('Error!');
					}
				}.bind(this),
        function (error) {
          alert(error);
        }
			);
		}
  }
};
