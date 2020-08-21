// import { action } from '@storybook/addon-actions'
// import { withInfo } from '@storybook/addon-info'
// import { withKnobs, boolean, select } from '@storybook/addon-knobs'

import '~/assets/css/tailwind.scss'

import Todo from './Todo.vue'
import { helper } from '~/core'

// * vue instace를 주입합니다.
helper()

// const label = 'Colors'
// const options = {
//   Red: 'red',
//   Blue: 'blue',
//   Yellow: 'yellow',
//   Rainbow: ['red', 'orange', 'etc'],
//   None: null
// }
// const defaultValue = 'red'
// const groupId = 'GROUP-ID1'

// const value = select(label, options, defaultValue, groupId)

// * Todo 스토리의 기본 설정을 합니다.
export default {
  title: 'TodoResult',
  excludeStories: /.*Data$/,
  decorators: []
}

export const Default = () => ({
  components: { Todo },
  template: `<todo :btnColor="btnColor"/>`
})
