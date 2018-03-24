import TodoList from '@/components/TodoList';

export default {
  name: 'App',
  data() {
    return {
      todos: [
        {
          label: '吃早饭',
          completed: true
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
  methods: {
    updateTodos(todos) {
      this.todos = todos;
    }
  },
  render(h) {
    // jsx 语法无法直接使用 .sync 修饰符，事件名也不能有特殊字符
    const todoListData = {
      props: {
        todos: this.todos
      },
      on: {
        'update:todos': this.updateTodos
      }
    };
    return <TodoList {...todoListData} />;
  }
};
