import { action } from '@storybook/addon-actions'
import '~/assets/css/tailwind.scss'

// ! TODO vue instance 주입 helper 함수 하나 만들기.

import Task from './Task.vue'
import { helper } from '~/core'

helper()

// * Task 스토리의 기본 설정을 합니다.
export default {
  title: 'Task',
  excludeStories: /.*Data$/ // * data로 끝나는 스토리는 제외시킨다.
}

// * storybook에서 사용할 actionsData 생성합니다.
export const actionsData = {
  onCheckTodo: action('onCheckTodo')

  // pintask: action('pintask'),
  // archivetask: action('archivetask')
}

// * storybook에서 사용할 taskData를 생성합니다.
export const todoData = {
  idx: 1,
  name: '테스트',
  done: false
}

// * storybook에서 사용할 Template 입니다.
const taskTemplate = `<task :todoMock="todoMock" @checkTodo="onCheckTodo"/>`

export const Default = () => ({
  components: { Task },
  template: taskTemplate,
  props: {
    todoMock: {
      default: () => ({ ...todoData })
    }
  },
  methods: actionsData
})

export const CheckTodo = () => ({
  components: { Task },
  template: taskTemplate,
  props: {
    todoMock: {
      default: () => ({ ...todoData, done: true })
    }
  },
  methods: actionsData
})
