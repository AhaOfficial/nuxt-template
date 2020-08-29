<img src="https://i.imgur.com/R2wksCG.png" width="400"/>

<br/>

[🧲 처음 페이지로 돌아가기](https://github.com/AhaOfficial/nuxt-template)

<br/>

# 📦 페이지 컴포넌트

> 넉스트는 `pages` 폴더 내의 vue 파일들을 이용해서 `vue-router` 설정을 자동으로 생성합니다. 

<br/>

- [📦 넉스트 공식 한국어 문서 - 라우팅](https://ko.nuxtjs.org/guide/routing)

<br/>

각 페이지를 이동하는 경로를 작성할 때에는 최대한 `<nuxt-link>` 컴포넌트를 꼭 사용해주세요, 이 컴포넌트를 통해서 선언된 경로는 크롬에서 prefetch 최적화가 적용되어서, 브라우저가 쉬는 타이밍에 해당 경로 로딩에 필요한 리소스를 미리 받아놓습니다. (이는 페이지 이동을 빠르게해서, 이용자 경험에 상당히 좋은 영향을 줄 수 있습니다.)  

- [📦 넉스트 공식 한국어 문서 - `<nuxt-link>` 설명](https://ko.nuxtjs.org/api/components-nuxt-link/)

<br/>

## 🛣 동적 라우팅 사용방법

```
pages/
--| people/
-----| _id.vue
-----| index.vue
--| _.vue
--| index.vue
```

위와 같은 구조로 파일이 존재할 때 각각 받을 수 있는 라우팅 경로는 다음과 같습니다.

<br/>

| 경로           | 파일             |
| -------------- | ---------------- |
| /              | index.vue        |
| /people        | people/index.vue |
| /people/123    | people/_id.vue   |
| /about         | _.vue            |
| /about/careers | _.vue            |
| /about/        | _.vue            |

`_id.vue` 와 같이 생성되는 경우, 해당 경로로 라우팅되는 값을 `context.params.id` 로 받으실 수 있습니다. (이러한 구조는 _slug 와 같은 이름의 폴더를 통해서도 구현될 수 있습니다.)

만약 URL 구조에 대해서 아직은 알 수 없다면, 중첩 경로에 매치될 `_.vue` 파일을 사용할 수 있습니다. 이 파일은 *구체적인 요청*과 매치되지 않는 요청에 대해 응답할것입니다.

<br/>

## 📫 _slug 폴더 vs _.vue 파일

```
pages/
--| _slug/
-----| index.vue
--| _.vue
```

만약 위와 같은 구조가 구현되는 경우 일치하는 라우팅은 다음과 같습니다.

| 경로     | 파일                   | 컨텍스트                                |
| -------- | ---------------------- | --------------------------------------- |
| /aaa     | /pages/_slug/index.vue | `context.params.slug // "aaa"`          |
| /aaa/aaa | /pages/_.vue           | `context.params.pathMatch // "aaa/aaa"` |

위와 같이 `/_slug/index.vue` 는 최초 경로 안에서만 작용하는 것을 볼 수 있습니다. 즉 1 Depth 를 갖는 경로에 대한 우선순위를 가집니다. 

<br/>

## 👀 매개변수 값 사용 방법

> 매개변수(Parameter, params) 값을 컴포넌트 로직에서 사용하려면 asyncData 를 통해서 후속적으로 가져와서 사용해야합니다.

```vue
<template>
  <div>/_slug/index.vue {{ params }}</div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'
export default VueAPI.defineComponent({
  setup: (props, context) => {
    return {
      params: {}
    }
  },
  asyncData: context => {
    return {
      params: context.params
    }
  }
})
</script>

```



## 🤔 라우터 매개변수 값 검증 방법

> Nuxt 는 컴포넌트 내에서 파라메터를 검증할 수 있습니다. 반환 값을 통해서 검증 통과 여부가 결정되며, `false` 를 리턴한 경우,  `layout/error.vue` 가 렌더링 됩니다.

```js
export default VueAPI.defineComponent({
  validate: context => {
    // 반드시 숫자만 가능하도록 합니다.
    return /^\d+$/.test(context.params.id)
  }
}
```



[🧲 처음 페이지로 돌아가기](https://github.com/AhaOfficial/nuxt-template)

