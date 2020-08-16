import type { Middleware } from '@nuxt/types'

const auth: Middleware = ({ app, redirect }) => {
  // * middleware test
  app.$cookies.set('jwt', '111', {
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  })

  // * jwt 체크
  const jwt = app.$cookies.get('jwt')

  // * jwt 없으면 -> redirect
  if (jwt) {
    redirect('/example')
  }
}

export default auth
