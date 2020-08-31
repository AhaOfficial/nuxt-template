import { dev } from '~/env'

/**
 * Node 와 브라우저를 위한 환경변수 값 입니다.
 * process.env 값과 동일하며 별도의 복제 값이 아닙니다.
 * (타입 추론을 위해 별도로 구성된 변수입니다.)
 */
const env: typeof dev = process.env as any
export { env }
