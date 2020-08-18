<!--src/components/Task.vue-->
<template>
  <div class="h-screen overflow-hidden p-10 flex justify-center">
    <div class="max-w-sm rounded overflow-hidden content-center shadow-lg">
      <img svg-inline src="~/assets/images/aha.svg" alt="testImg" class="w-full" />
      <div class="px-6 py-4">
        <input
          v-model="todo"
          class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="todos"
        />
        <button
          class="inline-block w-full my-5 bg-aha hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          :class="isEmptyTodo && ['cursor-not-allowed', 'opacity-50']"
          @click.prevent="addTodo"
        >
          등록
        </button>
      </div>
      <div class="px-6 py-4 w-400">
        <div
          v-for="(item, index) in todoList"
          :key="index"
          class="my-3 py-4 w-full border-solid border-t-2 border-b-2"
          :class="item.done && 'opacity-50'"
        >
          <span>{{ item.idx }}. {{ item.name }}</span>
          <label class="inline-block flex justify-start items-start float-right">
            <div
              class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
            >
              <input v-model="item.done" :value="item.done" type="checkbox" class="opacity-0 absolute" />
              <svg class="fill-current hidden w-4 h-4 text-teal-300 pointer-events-none" viewBox="0 0 20 20">
                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
              </svg>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'

const useTodo = () => {
  const todo = VueAPI.ref('')
  const todoList = VueAPI.ref([])
  const isEmptyTodo = VueAPI.computed(() => todo.value === '')

  VueAPI.watch(
    todoList,
    (newValue, oldValue) => {
      console.log(`value checkd :::::::::::::: > `, newValue)
    },
    { deep: true }
  )

  const addTodo = () => !isEmptyTodo.value && todoList.value.push({ idx: todoList.value.length + 1, name: todo.value, done: false })

  return {
    todo,
    todoList,
    isEmptyTodo,
    addTodo
  }
}

export default VueAPI.defineComponent({
  name: 'Task',
  props: {},
  components: {},

  setup(props, context) {
    return {
      ...useTodo()
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
