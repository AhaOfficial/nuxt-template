<!--src/components/Task.vue-->
<template>
  <div class="my-3 py-4 w-full border-solid border-t-2 border-b-2" :class="item.done && 'opacity-50'">
    <span>{{ item.idx }}. {{ item.name }}</span>
    <label class="flex justify-start items-start float-right">
      <div class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
        <input v-model="item.done" :value="item.done" type="checkbox" class="opacity-0 absolute" @change="emitCheckTodo" />
        <svg class="fill-current hidden w-4 h-4 text-teal-300 pointer-events-none" viewBox="0 0 20 20">
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'

export default VueAPI.defineComponent({
  name: 'Todo',
  props: {
    todo: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  components: {},

  setup(props, context) {
    const emitCheckTodo = () => context.emit('checkTodo', props.todo)
    return { item: props.todo, emitCheckTodo }
  }
})
</script>

<style lang="scss" scoped>
.chk-box {
  width: 25px;
  height: 25px;
}
input:checked + svg {
  display: block;
}
</style>
