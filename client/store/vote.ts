import { Store } from 'vue-state-store'

// 상태의 인터페이스를 미리 정의합니다.
export interface IVote {
    upVoteCount: number
    downVoteCount: number
}

// Store 를 상속해서 클래스를 생성합니다.
export class Vote extends Store<IVote> {
    // Action 또는 Mutation 을
    // .update 와 .set 을 이용해서
    // 타입스크립트 클래스 함수로
    // 자유롭게 정의할 수 있습니다.
    async upVote() {
        await this.update((data) => {
            data.upVoteCount += 1
            return data
        })
    }

    async downVote() {
        await this.update((data) => {
            data.upVoteCount -= 1
            return data
        })
    }

    syncWithNetwork() {
        // API 통신함수도 자유롭게 사용할 수 있습니다.
    }
}

// 상태 저장소를 생성한 후 초기 값을 넣습니다.
export const vote = new Vote({
    upVoteCount: 0,
    downVoteCount: 0,
})

// 액션 및 뮤테이션 사용방법
vote.upVote()
vote.downVote()
vote.syncWithNetwork()
