<template>
  <div>
    <Todo />
  </div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'
import { Sample } from '~/service'

const useExample = async () => {
  await Sample.SampleGet()
  await Sample.SampleGetQueryParams({ userId: 10 })
  await Sample.SamplePost()
  await Sample.SamplePut()
  await Sample.SampleDelete()
}

export default VueAPI.defineComponent({
  components: {},
  props: {},
  setup(props, context) {
    useExample()

    return {}
  }
})
</script>
