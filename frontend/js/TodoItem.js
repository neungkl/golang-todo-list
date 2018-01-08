export default {
  name: 'todo-item',
  props: ['todo', 'eventBus'],
  template: `
  <li v-bind:class="getTodoStatus()">
    <div class="view">
      <input class="toggle" type="checkbox" v-on:click="updateChecked" v-bind:checked="todo.completed">
      <label v-on:click="updateEditing($event, true)">{{ todo.description }}</label>
      <button class="destroy" v-on:click="deleteTodo"></button>
    </div>
    <input class="edit" v-bind:value="todo.description" v-on:keyup.enter="updateEditing($event, false)">
  </li>
  `,
  data() {
    return {
      checked: false,
      edit: false
    }
  },
  methods: {
    updateTodo(todo) {
      fetch('/update', {
        method: 'POST',
        body: JSON.stringify({
          id: todo.id,
          description: todo.description,
          completed: todo.completed
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
    },
    updateChecked(event) {
      // this.checked = event.target.checked;
      this.updateTodo({
        id: this.todo.id,
        description: this.todo.description,
        completed: event.target.checked
      })
      this.todo.completed = this.checked;
    },
    updateEditing(event, edit) {
      this.edit = edit;
      if (edit === false) {
        this.updateTodo({
          id: this.todo.id,
          description: event.target.value,
          completed: this.todo.completed
        });
      }
    },
    deleteTodo() {
      fetch('/delete?id=' + this.todo.id, { method: 'DELETE' }).then(function (response) {
        if (response.status === 200) {
          this.eventBus.$emit('refresh');
        } else {
          alert('Error');
        }
      }.bind(this), function (error) {
        alert(error);
      })
    },
    getTodoStatus() {
      return {
        'completed': this.todo.completed,
        'editing': this.edit
      }
    }
  }
}