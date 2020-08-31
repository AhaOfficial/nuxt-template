import type { NuxtConfig } from '@nuxt/types'

/**
 * Nuxt Config 의 타입입니다.
 */
export type IConfig =
  | NuxtConfig
  | {
      build: {
        postcss: any
      }
    }

/**
 * 프로덕션 모드인지 여부를 확인합니다.
 */
export const isProductionMode = process.env.NODE_ENV === 'production'

/**
 * 서비스워커 등에서 빌드 재시작 시마다
 * 빌드를 갱신하기 위한 무작위 버전명입니다.
 */
export const buildVersion = `_${Math.floor(+new Date() / 1000)}`
