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

    expect(wrapper.findAll('li').length).toBe(todos.length);

    expect(wrapper.findAll('li input[type=checkbox]').length).toBe(todos.length);

    expect(wrapper.find('li:first-child input[type=checkbox]').is(':checked')).toBe(true);
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

    wrapper.find('li:first-child input[type=checkbox]').trigger('click');

    // wrapper.props().todos[0].completed true
    // wrapper.vm.todos[0].completed false
    // ???
    expect(wrapper.vm.todos[0].completed).toBe(false);

    wrapper.find('li:nth-child(2) input[type=checkbox]').trigger('click');

    expect(wrapper.vm.todos[1].completed).toBe(true);
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

    wrapper.vm.$on('update:todos', function(todos) {
      this.todos = todos;
    });

    const input = wrapper.find('input[type=text]');

    input.element.value = 'Test';

    input.trigger('input');

    input.trigger('keydown.enter');

    expect(wrapper.vm.todos.length).toBe(4);

    expect(wrapper.vm.todos[3].label).toBe('Test');
  });
});
