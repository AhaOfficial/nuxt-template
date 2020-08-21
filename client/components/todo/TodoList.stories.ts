import { action, actions } from '@storybook/addon-actions'
import '~/assets/css/tailwind.scss'

import TodoList from './TodoList.vue'
import { helper } from '~/core'

// * vue instace를 주입합니다.
helper()

// * 애드온 action을 정의합니다.
export const actionsData = {
  onCheckedTodo: action('onCheckedTodo')
}

export default {
  title: 'TodoList',
  excludeStories: /.*Data$/,
  decorators: [] // * 데코레이터는 <story>에 적용할 스타일을 지정합니다.
}

export const Default = () => ({
  components: { TodoList },
  template: '<todo-list @checkTodo="onCheckedTodo" />',
  methods: actionsData
})

export const CheckedTodo = () => ({
  components: { TodoList },
  template: '<todo-list @onCheckedTodo="onCheckedTodo" />',
  methods: actionsData
})

export const Loading = () => ({
  components: { TodoList },
  template: '<todo-list loading />'
})

export const Empty = () => ({
  components: { TodoList },
  template: '<todo-list />'
})
