<template>
  <div class="px-6 py-4">
    <div v-if="isLoading">
      <div class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-4 py-1">
          <div class="space-y-2">
            <div class="h-4 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="story.isTodosEmpty.value">
      <div class="border border-gray-300 rounded-md p-4 max-w-sm w-full mx-auto py-4 my-3 text-center">
        <h1>🤔</h1>
        Noting todo!!!
      </div>
    </div>
    <div v-if="story.isTodoShow.value">
      <Todo v-for="(todo, index) in story.todos.value" :key="index" :todo="todo" @change="emitTodo(todo)" />
    </div>
  </div>
</template>

<script lang="ts">
import Todo from './Todo.vue'
import { VueAPI } from '~/core'
import { useStory } from '~/store/story'

export default VueAPI.defineComponent({
  name: 'todo-list',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: { Todo },

  setup(props, context) {
    const isLoading = VueAPI.computed(() => props.loading)
    const emitTodo = todo => context.emit('checkTodo', todo)

    return {
      story: useStory(),
      isLoading,
      emitTodo
    }
  }
})
</script>
