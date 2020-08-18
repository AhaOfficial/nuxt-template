<template>
  <div>
    <Task />
  </div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'
import { Task } from '~/components'

export default VueAPI.defineComponent({
  components: { Task },
  props: {},
  setup(props, context) {
    return {}
  }
})
</script>
