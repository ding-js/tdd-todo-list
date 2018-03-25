import { shallow } from '@vue/test-utils';
import TodoList from '@/components/TodoList';

describe('TodoList', () => {
  it('渲染出等量的 todo 列表元素', () => {
    const todos = [
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
    ];

    const wrapper = shallow(TodoList, {
      propsData: { todos }
    });

    // 确认渲染 todo 数量
    expect(wrapper.findAll('li').length).toBe(todos.length);

    expect(wrapper.findAll('li input[type=checkbox]').length).toBe(todos.length);

    todos.forEach((todo, index) => {
      const li = wrapper.find(`li:nth-child(${index + 1})`);

      //确认渲染状态
      expect(li.find('input[type=checkbox]').element.checked).toBe(!!todo.completed);

      //确认渲染文本
      expect(li.text()).toBe(todo.label);
    });
  });

  it('todo 状态修改', () => {
    const todos = [
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
    ];

    const wrapper = shallow(TodoList, {
      propsData: { todos }
    });

    // listeners 无效，原因不明
    wrapper.vm.$on('update:todos', function(todos) {
      this.todos = todos;
    });

    // 点击第一个 todo
    wrapper.find('li:first-child input[type=checkbox]').trigger('click');

    // wrapper.props().todos[0].completed -> true
    // wrapper.vm.todos[0].completed -> false
    // ???

    // 确认数据修改
    expect(wrapper.vm.todos[0].completed).toBe(false);

    // 确认 checked 状态
    expect(wrapper.find('li:first-child input[type=checkbox]').element.checked).toBe(false);

    // 测试连续点击
    for (let i = 1; i <= 10; i++) {
      // 初始值为 false，初次点击为 true
      const completed = !!(i % 2);
      // 点击第二个 todo
      wrapper.find('li:nth-child(2) input[type=checkbox]').trigger('click');

      expect(wrapper.vm.todos[1].completed).toBe(completed);

      // is(':checked') 和 element.checked 结果有出入
      expect(wrapper.find('li:nth-child(2) input[type=checkbox]').element.checked).toBe(completed);
    }
  });

  it('添加 todo', () => {
    const todos = [
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
    ];

    const wrapper = shallow(TodoList, {
      propsData: { todos }
    });

    wrapper.vm.$on('update:todos', function(todos) {
      this.todos = todos;
    });

    const input = wrapper.find('input[type=text]');

    input.element.value = 'Test';

    input.trigger('input');

    input.trigger('keydown.enter');

    // 清空 input
    expect(input.element.value).toBe('');

    // 增加 todos
    expect(wrapper.vm.todos.length).toBe(4);

    // 确认增加的数据
    expect(wrapper.vm.todos[3].label).toBe('Test');

    // 确认渲染的文本
    expect(wrapper.find('li:last-child').text()).toBe('Test');
  });
});
