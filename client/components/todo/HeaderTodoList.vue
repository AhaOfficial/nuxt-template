<template>
  <div class="h-full p-10 flex justify-center">
    <div class="max-w-sm rounded content-center shadow-lg w-400">
      <img svg-inline src="~/assets/images/aha.svg" alt="testImg" class="w-full" />
      <div class="px-6 py-4">
        <input
          class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="todos"
          :value="story.todo.value"
          @input="story.typingTodo"
        />
        <button
          class="inline-block w-full my-5 bg-aha hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          :class="story.isEmptyTodo.value && ['cursor-not-allowed', 'opacity-50']"
          @click.prevent="story.addTodo"
        >
          등록
        </button>
      </div>
      <TodoList />
    </div>
  </div>
</template>

<script lang="ts">
import TodoList from './TodoList.vue'
import { VueAPI } from '~/core'
import { useStory } from '~/store/story'

export default VueAPI.defineComponent({
  name: 'header-todo',
  props: {},
  components: { TodoList },

  setup(props, context) {
    return {
      story: useStory()
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
</style>
