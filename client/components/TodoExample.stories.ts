import { withKnobs, select, text, color } from '@storybook/addon-knobs'

import '~/assets/css/tailwind.scss'

import Todo from './TodoExample.vue'
import { helper } from '~/core'

// * vue instace를 주입합니다.
helper()

// * Todo 스토리의 기본 설정을 합니다.
export default {
  title: 'TodoResult',
  excludeStories: /.*Data$/,
  decorators: [
    withKnobs({
      escapeHTML: false
    })
  ]
}

export const Default = () => ({
  components: { Todo },
  template: `<todo :btnText="btnText" :btnColor="btnColor" :btnSize="btnSize"/>`,
  props: {
    btnText: {
      default: text('버튼 이름을 작성해주세요', '버튼', '검색 버튼')
    },
    btnColor: {
      default: color('버튼 색상을 선택해주세요.', '#5dc4c0', '검색 버튼')
    },
    btnSize: {
      default: select(
        '버튼 사이즈를 선택해주세요.',
        {
          small: 'w-20',
          middle: 'w-64',
          large: 'w-full'
        },
        'small',
        '검색 버튼'
      )
    }
  }
})
