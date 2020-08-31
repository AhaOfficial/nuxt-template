import { NuxtStorage } from '@nuxtjs/universal-storage/types'

declare module '@nuxt/types' {
  interface Context {
    $storage: NuxtStorage
  }
}
