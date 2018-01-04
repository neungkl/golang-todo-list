export default {
  name: 'todo-header',
  template: `
  <div class="header">
    <h1>todos</h1>
    <input v-model="message" class="new-todo" placeholder="What needs to be done?" autofocus>
  </div>
  `,
  data() {
    return {
      message: ''
    }  
  },
}