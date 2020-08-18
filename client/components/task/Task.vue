<!--src/components/Task.vue-->
<template>
  <div class="h-screen overflow-hidden p-10 flex justify-center">
    <div class="max-w-sm rounded overflow-hidden content-center shadow-lg">
      <!-- <img src="https://tailwindcss.com/img/card-top.jpg" alt="testImg" class="w-full" /> -->
      <img src="~/assets/images/aha.svg" alt="testImg" class="w-full" />
      <div class="px-6 py-4">
        <input
          class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="todos"
        />
        <button class="inline-block w-full my-5 bg-aha hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          등록
        </button>
      </div>
      <div class="px-6 py-4 w-400">
        <!-- opacity-50 -->
        <div class="my-3 py-4 w-full border-solid border-t-2 border-b-2">
          <span>1. 할일</span>
          <label class="inline-block flex justify-start items-start float-right">
            <div
              class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
            >
              <input type="checkbox" class="opacity-0 absolute" />
              <svg class="fill-current hidden w-4 h-4 text-teal-300 pointer-events-none" viewBox="0 0 20 20">
                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
              </svg>
            </div>
          </label>
        </div>
      </div>

      <!-- ! 스토리북 코드 -->
      <!-- <h1>{{ taskClass }}</h1>
    <label class="checkbox">
      <input type="checkbox" :checked="isChecked" :disabled="true" name="checked" />
      <span class="checkbox-custom" @click="$emit('archivetask', task.id)"></span>
    </label>
    <div class="title">
      <input type="text" :readonly="true" :value="task.title" placeholder="Input title" />
    </div>
    <div class="actions">
      <a v-if="!isChecked" @click.prevent="$emit('pintask', task.id)">
        <span class="icon-start"></span>
      </a>
    </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'

const useTodo = () => {
  const todos = VueAPI.ref([])
  const addTodo = todos.value.push({ idx: '', name: '', done: false })

  return {}
}

export default VueAPI.defineComponent({
  name: 'Task',
  props: {},

  setup(props, context) {
    return {}
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
