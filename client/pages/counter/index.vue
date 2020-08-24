<template>
  <!-- 백그라운드 -->
  <div class="background">
    <!-- 래퍼 -->
    <div class="bg-white rounded-lg p-6 shadow-md w-64 table text-center">
      <!-- 제목 -->
      <h1 class="text-gray-700 text-sm font-semibold w-full m-2">😊&nbsp;&nbsp;간단한 카운터: {{ counter.value.count }}</h1>

      <!-- - 버튼 -->
      <button
        :class="['bg-gray-300 ext-gray-600', 'outline-none w-12 h-8 rounded-1', 'hover:bg-gray-400 hover:text-gray-700', '']"
        @click="counter.down()"
      >
        -
      </button>

      <!-- 중간 입력칸 -->
      <input v-model="counter.value.count" :class="['bg-gray-300 text-gray-600', 'w-12 h-8 text-center']" />

      <!-- + 버튼 -->
      <button
        :class="['bg-gray-300 text-gray-600', 'outline-none w-12 h-8 rounded-1', 'hover:bg-gray-400 hover:text-gray-700']"
        @click="counter.up()"
      >
        +
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'
import { useCount } from '~/store'

export default VueAPI.defineComponent({
  setup(props, context) {
    return {
      // * Count 상태를 바인딩합니다.
      counter: useCount()
    }
  }
})
</script>

<style lang="scss" scoped>
.background {
  @apply p-6 bg-gray-100 h-screen;
}
</style>
