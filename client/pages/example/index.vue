<template>
  <div></div>
</template>

<script lang="ts">
import { VueAPI, dayjs } from '~/core'

// * dayjs example
const useDayjs = () => {
  console.log(dayjs(new Date()).format('YYYY년MM월DD일'))
  console.log(dayjs(new Date('2020/01/01')).format('YYYY년MM월DD일'))
}

export default VueAPI.defineComponent({
  components: {},
  setup(props, context) {
    useDayjs()
    return {}
  }
})
</script>
