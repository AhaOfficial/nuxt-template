<!-- 프로젝트의 예시 페이지들에 대한 인덱스 페이지입니다. -->
<template>
  <div class="background">
    <!-- 인덱스 페이지 설명 -->
    <div class="form">
      <span class="pr-3"> 🎉 </span>
      <span class="info-block"> 넉스트 템플릿의 예시 페이지들이 아래 나열됩니다. </span>
    </div>
    <!-- 이동가능한 예시 페이지 목록 -->
    <div v-for="item in exampleList" :key="item.title">
      <nuxt-link :to="item.link">
        <div class="form">
          <!-- 주 내용이 담기는 넓은 레이아웃 -->
          <div class="w-9/12">
            <span class="pr-2">{{ item.emoji }}</span>
            <span class="title">{{ item.title }}</span>
            <span class="info-short">&nbsp;-&nbsp;{{ item.infoShort }}</span>
          </div>
          <!-- 주소용 좁은 레이아웃 -->
          <div class="w-3/12 text-right">
            <span class="info-link">{{ item.link }}</span>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'

export default VueAPI.defineComponent({
  setup(props, context) {
    /**
     * 예시 항목에 작성되어야하는 필수 정보입니다.
     */
    interface IExampletem {
      /**
       * 예시 항목의 이모지입니다.
       */
      emoji: string
      /**
       * 예시 항목의 제목입니다.
       */
      title: string
      /**
       * 예시 항목에 대한 짧은 설명입니다.
       */
      infoShort: string
      /**
       * 예시 항목을 볼 수 있는 페이지 주소입니다.
       */
      link: string
    }

    /**
     * 예시 항목들이 담깁니다.
     */
    const exampleList = VueAPI.ref([
      {
        emoji: '🎚',
        title: '카운터',
        infoShort: 'vue-state-store 의 기본 예시입니다.',
        link: '/counter'
      },
      {
        emoji: '📝',
        title: '할 일 목록',
        infoShort: 'TODO 리스트 예시입니다.',
        link: '/todo'
      },
      {
        emoji: '📝',
        title: '할 일 목록 (구형)',
        infoShort: '기존 형식 TODO 리스트 예시입니다.',
        link: '/todo/before'
      },
      {
        emoji: '⚗️',
        title: '스토리북',
        infoShort: '스토리북과 연동된 컴포넌트 예시입니다.',
        link: '/example'
      }
    ] as IExampletem[])

    return { exampleList }
  }
})
</script>

<style lang="scss" src="./index.scss" scoped></style>
