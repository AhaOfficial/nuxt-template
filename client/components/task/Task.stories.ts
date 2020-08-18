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
  pintask: action('pintask'),
  archivetask: action('archivetask')
}

// * storybook에서 사용할 taskData를 생성합니다.
export const taskData = {
  id: '1',
  title: 'Test Task',
  state: 'Task_INBOX',
  updated_at: new Date(2020, 0, 1, 9, 0)
}

// * storybook에서 사용할 Template 입니다.
const taskTemplate = `<task :task="task" @archivetask="archivetask" @pintask="pintask"/>`

// * storybook default 세팅을 합니다.
export const Default = () => ({
  components: { Task },
  template: taskTemplate,
  props: {
    task: {
      default: () => taskData
    }
  },
  methods: actionsData
})

// * default > Pinned라는 하위 스토리를 추가합니다.
// * 필요한 만큼의 하위 스토리를 추가 할 수 있습니다.
/**
 * ! example
 * * component
 * *  - story
 * *  - story
 * *  - story
 */
export const Pinned = () => ({
  components: { Task },
  template: taskTemplate,
  props: {
    task: {
      default: () => ({
        ...taskData,
        state: 'TASK_PINNED' // * 현재 어떤 작업이 진행 중이고 체크아웃되었는지 알 수 있는 값.
      })
    }
  },
  methods: actionsData
})

// * default > Archived라는 하위 스토리를 추가합니다.
export const Archived = () => ({
  components: { Task },
  template: taskTemplate,
  props: {
    task: {
      default: () => ({
        ...taskData,
        state: 'TASK_ARCHIVED' // * 현재 어떤 작업이 진행 중이고 체크아웃되었는지 알 수 있는 값.
      })
    }
  },
  methods: actionsData
})
