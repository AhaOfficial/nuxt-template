<<<<<<< HEAD
<template>
    <div>
        <!--
        템플릿 태그에서 스토어 사용 시에도
        타입스크립트 인텔리센스가 계속 지원됩니다.
        -->
        <h1>upVoteCount: {{ $vote.upVoteCount }}</h1>
        <h1>downVoteCount: {{ $vote.downVoteCount }}</h1>
        <Card />
    </div>
</template>

<script lang="ts">
    import { VueAPI } from '~/core'
    import { Card } from '~/components'
    import { vote } from '~/store'
    export default VueAPI.defineComponent({
        components: { Card },
        setup(props, context) {
            // 1초마다 추천을 발생시킵니다.
            // (1초마다 템플릿에 값이 반영되는 것을 볼 수 있습니다.)
            setInterval(() => vote.upVote(), 1000)

            // 스토어 값을 자동으로 템플릿 태그에 바인딩합니다.
            return {
                $vote: vote.bind(),
            }
        },
    })
</script>
=======
<template>
	<div>
		<!--
        템플릿 태그에서 스토어 사용 시에도
        타입스크립트 인텔리센스가 계속 지원됩니다.
        -->
		<h1>upVoteCount: {{ $vote.upVoteCount }}</h1>
		<h1>downVoteCount: {{ $vote.downVoteCount }}</h1>
		<Card />
	</div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'
import { Card } from '~/components'
import { vote } from '~/store'

export default VueAPI.defineComponent({
	components: { Card },
	setup(props, context) {
		// 1초마다 추천을 발생시킵니다.
		// (1초마다 템플릿에 값이 반영되는 것을 볼 수 있습니다.)
		setInterval(() => vote.upVote(), 1000)

		// 스토어 값을 자동으로 템플릿 태그에 바인딩합니다.
		return {
			$vote: vote.bind()
		}
	}
})
</script>
>>>>>>> 7928b922f248cc9d6403dae1c24711f38a640609
