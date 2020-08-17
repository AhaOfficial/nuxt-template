<!--src/components/Task.vue-->
<template>
  <div>
    <h1>{{ taskClass }}</h1>
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
    </div>

    {{ task }}
  </div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'

const useTask = task => {
  const taskClass = VueAPI.computed(() => `list-item ${task.state}`)
  const isChecked = VueAPI.computed(() => task.state === 'TASK_ARCHIVED')

  return {
    taskClass: VueAPI.ref(taskClass),
    isChecked: VueAPI.ref(isChecked)
  }
}

export default VueAPI.defineComponent({
  name: 'Task',
  props: {
    task: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        state: '',
        title: ''
      })
    }
  },
  setup(props, context) {
    const { task } = props

    const taskClass = VueAPI.computed(() => `list-item ${task.state}`)
    const isChecked = VueAPI.computed(() => task.state === 'TASK_ARCHIVED')

    return {
      taskClass,
      isChecked
    }
  }
})
</script>

<style src="~/assets/css/example.css" scoped></style>
