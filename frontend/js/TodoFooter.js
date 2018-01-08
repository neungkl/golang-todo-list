export default {
  name: 'todo-footer',
  props: ['eventBus'],
  template: `
  <footer class="footer">
    <span class="todo-count"><strong>{{ count }}</strong> item(s) left</span>
  </footer>
  `,
  data() {
    return {
      count: 0
    }
  },
  created() {
    this.eventBus.$on('itemCount', function (count) {
      this.count = count;
    }.bind(this));
  }
}