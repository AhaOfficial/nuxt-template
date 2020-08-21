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

// * storybook에서 사용할 Template 입니다.
const taskTemplate = `<todo :todo="todo" />`

// * 기본 상태를 설정한 케이스 입니다.
export const Default = (args, { argTypes }) => ({
  components: { Todo },
  template: taskTemplate,
  props: {
    todo: {
      default: () => ({
        idx: 1,
        name: 'Todo 1',
        done: false
      })
    },
    example: Object.keys(argTypes)
  }
})

// * 투두 리스트에서 체크한 케이스 입니다.
export const CheckTodo = () => ({
  components: { Todo },
  template: taskTemplate,
  props: {
    todo: {
      default: () => ({
        idx: 1,
        name: 'Todo 1',
        done: true
      })
    }
  }
})
