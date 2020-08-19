import { action } from '@storybook/addon-actions'
import '~/assets/css/tailwind.scss'

import Todo from './Todo.vue'
import { helper } from '~/core'

// * vue instace를 주입합니다.
helper()

// * Todo 스토리의 기본 설정을 합니다.
export default {
  title: 'Todo',
  excludeStories: /.*Data$/
}

// * storybook에서 사용할 actionsData 선언합니다.
export const actionsData = {
  onCheckTodo: action('onCheckTodo')
}

// * storybook에서 사용할 todoData를 선언합니다.
export const todoData = {
  idx: 1,
  name: '테스트',
  done: false
}

// * storybook에서 사용할 Template 입니다.
const taskTemplate = `<todo :todo="todo" @checkTodo="onCheckTodo"/>`

// * 기본 상태를 설정한 케이스 입니다.
export const Default = () => ({
  components: { Todo },
  template: taskTemplate,
  props: {
    todo: {
      default: () => ({ ...todoData })
    }
  },
  methods: actionsData
})

// * 투두 리스트에서 체크한 케이스 입니다.
export const CheckTodo = () => ({
  components: { Todo },
  template: taskTemplate,
  props: {
    todo: {
      default: () => ({ ...todoData, done: true })
    }
  },
  methods: actionsData
})
