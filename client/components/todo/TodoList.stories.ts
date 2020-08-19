import { action } from '@storybook/addon-actions'
import '~/assets/css/tailwind.scss'

import TodoList from './TodoList.vue'
import { actionsData, todoData } from './Todo.stories'
import { helper } from '~/core'

// * vue instace를 주입합니다.
helper()

export default {
  title: 'TodoList',
  excludeStories: /.*Data$/,
  decorators: [] // * 데코레이터는 <story>에 적용할 스타일을 지정합니다.
}

export const dTodoData = [
  { ...todoData, idx: '1', name: 'Todo 1' },
  { ...todoData, idx: '2', name: 'Todo 2' },
  { ...todoData, idx: '3', name: 'Todo 3' },
  { ...todoData, idx: '4', name: 'Todo 4' },
  { ...todoData, idx: '5', name: 'Todo 5' },
  { ...todoData, idx: '6', name: 'Todo 6' }
]
export const cTodoData = [...dTodoData.slice(0, 5), { idx: '6', name: 'Tod 6 Checked', done: true }]

export const Default = () => ({
  components: { TodoList },
  template: '<todo-list :todos="todos" @checkTodo="onCheckTodo"/>',
  props: {
    todos: {
      default: () => dTodoData
    }
  },
  methods: actionsData
})

export const CheckedTodo = () => ({
  components: { TodoList },
  template: '<todo-list :todos="todos" @checkTodo="onCheckTodo"/>',
  props: {
    todos: {
      default: () => cTodoData
    }
  },
  methods: actionsData
})

export const Loading = () => ({
  components: { TodoList },
  template: '<todo-list loading :todos="todos" @checkTodo="onCheckTodo"/>',
  props: {
    todos: {
      default: () => cTodoData
    }
  },
  methods: actionsData
})

export const Empty = () => ({
  components: { TodoList },
  template: '<todo-list @checkTodo="onCheckTodo"/>',
  props: {
    todos: {
      default: () => cTodoData
    }
  },
  methods: actionsData
})
