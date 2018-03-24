import List from './list';

export default {
  name: 'TodoList',
  props: {
    todos: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      input: ''
    };
  },
  methods: {
    handleInput(e) {
      this.input = e.target.value;
    },
    handleKeydown(e) {
      if (e.keyCode !== 13 || !this.input) {
        return;
      }

      const todo = { label: this.input };

      this.$emit('update:todos', this.todos.concat(todo));

      this.input = '';
    },
    updateState(completed, index) {
      const newTodos = this.todos.slice();

      newTodos.splice(index, 1, { ...newTodos[index], completed });

      this.$emit('update:todos', newTodos);
    }
  },
  render(h) {
    return (
      <div>
        <List todos={this.todos} onUpdate-state={this.updateState} />
        <input
          type="text"
          value={this.input}
          onInput={this.handleInput}
          onKeydown={this.handleKeydown}
        />
      </div>
    );
  }
};
