import { shallow } from '@vue/test-utils';
import TodoList from '@/components/TodoList';

describe('TodoList', () => {
  it('渲染出等量的 todo 列表元素', () => {
    const todos = [
      {
        label: '吃早饭'
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
  });
});
