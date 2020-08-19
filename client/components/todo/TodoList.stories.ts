import { action } from '@storybook/addon-actions'
import '~/assets/css/tailwind.scss'

import TodoList from './TodoList.vue'
import { actionsData, todoData } from './Todo.stories'
import { helper } from '~/core'

// * vue instace를 주입합니다.
helper()

export default {
  title: 'TodoList',
  excludeStories: /.*Data$/
}

// export const dTodoData = [
//   { ...todoData, id: '1', title: 'Task 1' },
//   { ...todoData, id: '2', title: 'Task 2' },
//   { ...todoData, id: '3', title: 'Task 3' },
//   { ...todoData, id: '4', title: 'Task 4' },
//   { ...todoData, id: '5', title: 'Task 5' },
//   { ...todoData, id: '6', title: 'Task 6' }
// ]
// export const checkedTodoList = [...dTodoData.slice(0, 5), { id: '6', title: 'Task 6 (pinned)', done: true }]

// export const Default = () => ({
//   components: { TodoList },
//   template: '<todo-list />',
//   props: {
//     todoMock: {
//       default: () => dTodoData
//     }
//   },
//   methods: actionsData
// })
