import '~/assets/css/tailwind.scss'

import HeaderTodoList from './HeaderTodoList.vue'
import { helper } from '~/core'

helper()

export default {
  title: 'HeaderTodoList',
  excludeStories: /.*Data$/,
  decorators: [] // * 데코레이터는 <story>에 적용할 스타일을 지정합니다.
}

export const Default = () => ({
  components: { HeaderTodoList },
  template: '<header-todo-list />'
})
