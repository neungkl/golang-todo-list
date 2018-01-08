export default {
  name: 'todo-item',
  props: ['todo'],
  template: `
  <li v-bind:class="getTodoStatus()">
    <div class="view">
      <input class="toggle" type="checkbox" v-on:click="updateChecked" v-bind:checked="todo.completed">
      <label v-on:click="updateEditing($event, true)">{{ todo.description }}</label>
      <button class="destroy"></button>
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
    updateChecked(event) {
      this.checked = event.target.checked;
      this.todo.completed = this.checked;
    },
    updateEditing(event, edit) {
      this.edit = edit;
      if (edit === false) {
        this.todo.description = event.target.value;
      }
    },
    getTodoStatus() {
      return {
        'completed': this.todo.completed,
        'editing': this.edit
      }
    }
  }
}