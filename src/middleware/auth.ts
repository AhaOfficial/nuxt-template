import type { Middleware } from '@nuxt/types'

const auth: Middleware = ({ app }) => {
  // * jwt set
  app.$storage.setUniversal('aaa', 123)

  // * jwt get
  const storage = app.$storage.getUniversal('aaa')

  // * jwt check
  // console.log(storage)
}

export default auth
