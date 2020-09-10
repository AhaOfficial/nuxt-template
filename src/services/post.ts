import { BackEnd } from '~/core'

interface IPost {
  body: string
  id?: number
  title: string
  userId: number
}

export const getPosts = (params: { userId: number }) => {
  return BackEnd.get<IPost[] | void>({
    link: '/posts',
    axiosOption: { params }
  })
}

export const uploadPost = (data: IPost) => {
  return BackEnd.post<IPost | void>({
    link: '/posts',
    data
  })
}

export const modifyPost = (id: number, data: IPost) => {
  return BackEnd.put<IPost | void>({
    link: `/posts/${id}`,
    data
  })
}

export const removePost = async (id: number) => {
  const request = await BackEnd.delete<void>({ link: `/posts/${id}` })
  return request && request.status === 200
}

export const wrongPost = async (id: number) => {
  const request = await BackEnd.delete<void>({ link: `/poasts/${id}` })
  return request
}
