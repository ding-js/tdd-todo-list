export default {
  name: 'TodoListList',
  props: {
    todos: {
      required: true
    }
  },
  methods: {
    handleCheckboxChange(e, index) {
      this.$emit('update-state', e.target.checked, index);
    }
  },
  render(h) {
    return (
      <ul>
        {this.todos.map((todo, index) => (
          <li>
            <label>
              <input
                type="checkbox"
                checked={!!todo.completed}
                onChange={(e) => this.handleCheckboxChange(e, index)}
              />
              {todo.label}
            </label>
          </li>
        ))}
      </ul>
    );
  }
};
