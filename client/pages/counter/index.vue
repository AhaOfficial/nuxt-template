<template>
  <!-- 백그라운드 -->
  <div class="background">
    <!-- 래퍼 -->
    <div class="counter">
      <!-- 제목 -->
      <h1 class="title">😊&nbsp;&nbsp;간단한 카운터: {{ counter.$counter.count }}</h1>

      <!-- - 버튼 -->
      <button class="up-button" @click="counter.down()">-</button>

      <!-- 중간 입력칸 -->
      <input v-model="counter.$counter.count" class="self-input" />

      <!-- + 버튼 -->
      <button class="down-button" @click="counter.up()">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import * as Core from '~/core'
import { VueAPI } from '~/core'
import { Counter } from '~/store'

export default VueAPI.defineComponent({
  setup(props, context) {
    return {
      /**
       * 카운터 상태의 사용함수 입니다.
       */
      counter: Counter.useCount()
    }
  }
})
</script>

<style lang="scss" scoped>
// 배경
.background {
  @apply p-6 bg-gray-100 h-screen;
}

// 카운터
.counter {
  @apply bg-white rounded-lg p-6 shadow-md w-64 table text-center;

  // 제목
  .title {
    @apply text-gray-700 text-sm font-semibold w-full m-2;
  }
  // + 버튼
  .up-button {
    @apply bg-gray-300 text-gray-600 outline-none w-12 h-8 rounded-sm;
    :hover {
      @apply bg-gray-400 text-gray-700;
    }
  }

  // - 버튼
  .down-button {
    @apply bg-gray-300 text-gray-600 outline-none w-12 h-8 rounded-sm;
    :hover {
      @apply bg-gray-400 text-gray-700;
    }
  }

  // 중간 카운트 입력칸
  .self-input {
    @apply bg-gray-300 text-gray-600 w-12 h-8 text-center;
  }
}
</style>
