<template>
  <div class="px-6 py-4 w-400">
    <div v-if="isLoading">
      <div v-for="(item, index) in todoList" :key="index" class="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto py-4 my-3">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-4 py-1">
            <div class="space-y-2">
              <div class="h-4 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isEmptyTodo">
      <div class="border border-gray-300 rounded-md p-4 max-w-sm w-full mx-auto py-4 my-3 text-center">
        <h1>🤔</h1>
        Noting todo!!!
      </div>
    </div>
    <div v-if="isTodoInit">
      <Todo v-for="(todo, index) in todoList" :key="index" :todo="todo" @checkTodo="onCheckTodo" />
    </div>
  </div>
</template>

<script lang="ts">
import Todo from './Todo.vue'
import { VueAPI } from '~/core'

export default VueAPI.defineComponent({
  name: 'todo-list',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    todos: {
      type: Array,
      default: () => []
    }
  },
  components: { Todo },

  setup(props, context) {
    const onCheckTodo = () => context.emit('checkTodo', props.todos)
    const isLoading = VueAPI.computed(() => props.loading)
    const isEmptyTodo = VueAPI.computed(() => !props.loading && props.todos.length === 0)
    const isTodoInit = VueAPI.computed(() => !props.loading && props.todos.length > 0)

    return { todoList: props.todos, isEmptyTodo, isLoading, isTodoInit, onCheckTodo }
  }
})
</script>

<style lang="scss" scoped>
.w-400 {
  width: 400px;
}
</style>
