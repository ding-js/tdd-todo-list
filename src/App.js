import TodoList from '@/components/TodoList';

export default {
  name: 'App',
  data() {
    return {
      todos: [
        {
          label: '吃早饭'
        },
        {
          label: '吃中饭'
        },
        {
          label: '吃晚饭'
        }
      ]
    };
  },
  render() {
    return <TodoList todos={this.todos} />;
  }
};
