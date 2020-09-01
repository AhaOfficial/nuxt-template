# Docker 환경 이미지 파일 입니다.
FROM node:12.18.1

# project 경로를 설정합니다.
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# nuxt-app 폴더 하위에 프로젝트 폴더를 복사 후 npm install을 진행합니다.
COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build

# 3000번 포트
EXPOSE 3000

ENV HOST 0.0.0.0
ENV PORT 3000

CMD ["npm", "start"]