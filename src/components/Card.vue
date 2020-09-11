<template>
  <div class="p-4">
    <div class="max-w-sm rounded overflow-hidden shadow-lg mb-4">
      <img class="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
      <div class="px-6 py-4 pb-2">
        <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p class="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div class="px-6 py-4">
        <span class="badge mr-2">#photography</span>
        <span class="badge mr-2">#여행이요.</span>
        <span class="badge">#winter</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as Core from '~/core'
import { VueAPI } from '~/core'

const useAPI = () => {
  // const _get = await Service.sampleGET()
  // const _post = await Service.samplePOST({
  //   title: 'foo',
  //   body: 'bar',
  //   userId: 1
  // })
  // const _put = await Service.samplePUT({
  //   id: 1,
  //   title: 'foo',
  //   body: 'bar',
  //   userId: 1
  // })
  // const _delete = await Service.sampleDELETE()
  // const _patch = await Service.samplePATCH({ title: 'foo' })

  // console.log(`_get    !!!! `, _get)
  // console.log('_post   !!!!', _post)
  // console.log('_put    !!!!', _put)
  // console.log('_patch  !!!!', _patch)
  // console.log('_delete !!!!', _delete)

  return {}
}

export default VueAPI.defineComponent({
  name: 'Card',
  setup(props, context) {
    // *
    // sample api

    // useAPI()

    return {}
  }
})
</script>

<style lang="postcss" scoped>
/* .badge {
  @apply inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700;
  &:hover {
    @apply bg-gray-300;
  }
} */
</style>
