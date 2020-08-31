<!--src/components/Task.vue-->
<template>
  <div class="h-full p-10 flex justify-center">
    <div class="max-w-sm rounded content-center shadow-lg">
      <img
        svg-inline
        src="~/assets/icons/aha.svg"
        alt="testImg"
        class="w-full"
      />
      <div class="px-6 py-4">
        <input
          class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="todos"
          :value="story.todo.value"
          @input="story.typingTodo"
        />

        <button
          class="inline-block my-5 bg-aha text-white font-bold py-2 px-4 rounded"
          :class="[props.btnSize, story.emptyClass]"
          :style="{ 'background-color': props.btnColor }"
          @click.prevent="story.addTodo"
        >
          {{ props.btnText }}
        </button>
      </div>
      <div class="px-6 py-4 w-400">
        <div
          v-for="(item, index) in story.todos.value"
          :key="index"
          class="my-3 py-4 w-full border-solid border-t-2 border-b-2"
          :class="item.done && 'opacity-50'"
        >
          <span>{{ item.idx }}. {{ item.name }}</span>
          <label class="flex justify-start items-start float-right">
            <div
              class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
            >
              <input
                v-model="item.done"
                :value="item.done"
                type="checkbox"
                class="opacity-0 absolute"
              />
              <svg
                class="fill-current hidden w-4 h-4 text-teal-300 pointer-events-none"
                viewBox="0 0 20 20"
              >
                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
              </svg>
            </div>
          </label>
        </div>

        <div v-if="story.isTodosEmpty.value">
          <div
            class="border border-gray-300 rounded-md p-4 max-w-sm w-full mx-auto py-4 my-3 text-center"
          >
            <h1>🤔</h1>
            투두를 등록해주세요!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as Core from '~/core'
import { VueAPI } from '~/core'
import { Story } from '~/store'

export default VueAPI.defineComponent({
  name: 'Todo',
  components: {},
  props: {
    /**
     * 버튼 텍스트
     */
    btnText: {
      type: String,
      default: '등록'
    },
    /**
     * 버튼 색상
     */
    btnColor: {
      type: String,
      default: '#5dc4c0'
    },
    /**
     * 버튼 사이즈
     * @description
     * small : w-20,
     * middle : w-64,
     * large: w-full
     */
    btnSize: {
      type: String,
      default: 'w-full'
    }
  },

  setup(props, context) {
    return {
      story: Story.useStory(),
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.bg-aha {
  background-color: #5dc4c0;
}
.w-400 {
  width: 400px;
}
.chk-box {
  width: 25px;
  height: 25px;
}
input:checked + svg {
  display: block;
}
</style>
