import { BackEnd } from '~/core'

export const SampleGet = <T>(value: T) => {
  return BackEnd.get({ link: '/posts', axiosOption: { params: value } })
}
export const SamplePost = () => {
  return BackEnd.post({
    link: '/posts',
    data: { title: 'foo', body: 'bar', userId: 1 }
  })
}
export const SamplePut = () => {
  return BackEnd.put({
    link: '/posts/1',
    data: { id: 1, title: 'foo', body: 'bar', userId: 1 }
  })
}
export const SampleDelete = () => {
  return BackEnd.delete({ link: '/posts/1' })
}
