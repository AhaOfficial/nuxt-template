<template>
  <div class="px-6 py-4 w-400">
    <Todo :todo="todos" @checkTodo="onCheckTodo" />
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

  setup(props, context) {}
})
</script>

<style lang="scss" scoped>
.w-400 {
  width: 400px;
}
</style>
