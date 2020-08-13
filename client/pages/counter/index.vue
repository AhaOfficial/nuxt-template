<template>
    <div>
        <h1>간단한 카운터: {{ counter.value.count }}</h1>
        <button @click="counter.up()">+</button>
        <button @click="counter.down()">-</button>

        <h3>계수자 명: {{ counter.value.author }}</h3>
        <input type="text" v-model="counter.value.author" />
    </div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'
import { useCount } from '~/store'

export default VueAPI.defineComponent({
    setup(props, context) {
        return {
            // * Count 상태를 바인딩합니다.
            counter: useCount(),
        }
    },
})
</script>
