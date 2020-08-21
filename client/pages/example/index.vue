<template>
  <div>
    <Todo />
  </div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'
import Todo from '~/components/Todo.vue'

export default VueAPI.defineComponent({
  components: { Todo },
  props: {},
  setup(props, context) {
    return {}
  }
})
</script>
