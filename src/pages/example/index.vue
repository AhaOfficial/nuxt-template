<template>
  <div>
    <Todo />
  </div>
</template>

<script lang="ts">
import * as Core from '~/core'
import { VueAPI } from '~/core'

const useExample = async () => {
  // * API 요청을 사용합니다.
  await Core.useService({
    action: async ({ service, isClient }) => {
      // * 클라이언트에서만 실행시킵니다.
      if (!isClient) return

      // * 게시글들을 읽어옵니다.
      const posts = await service.Post.getPosts({ userId: 4 })
      console.log(`👀 posts`, posts)

      // * 게시글을 업로드 합니다.
      const uploadedPost = await service.Post.uploadPost({
        title: 'foo',
        body: 'bar',
        userId: 1
      })

      if (uploadedPost && uploadedPost.data) {
        // * 게시글이 정상적으로 업로드 되었을 때
      }

      // * 게시글을 수정합니다.
      const modifiedPost = await service.Post.modifyPost(1, {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1
      })
      console.log(`👀 modifiedPost`, modifiedPost)

      // * 게시글을 삭제합니다.
      const isRemoved = await service.Post.removePost(1)
      console.log(`👀 isRemoved`, isRemoved)

      // * 잘못된 요청을 전송합니다.
      // * (잘못된 요청을 전송해도 치명적인 오류가 발생하지 않습니다.)
      const errorResponse = await service.Post.wrongPost(1)
      console.log(`👀 errorResponse`, errorResponse)
    },
    exception: async ({ error }) => {
      // * 여기 안에서 예외처리를 해주세요.
      console.log('error?', error)
    }
  })
}

export default VueAPI.defineComponent({
  components: {},
  props: {},
  setup(_props, _context) {
    useExample()

    return {}
  }
})
</script>
