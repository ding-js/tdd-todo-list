export default {
  name: 'TodoList',
  props: {
    todos: {
      default: () => [],
      type: Array
    }
  },
  render(h) {
    return (
      <div>
        <ul>{this.todos.map((todo) => <li>{todo.label}</li>)}</ul>
      </div>
    );
  }
};
