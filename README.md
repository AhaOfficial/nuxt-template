<img src="https://i.imgur.com/R2wksCG.png" width="400"/>

<br/>

<center><b>📮 넉스트 틀 버전:</b> 2020-Apeach-1.0.0</center>

<br/>
<br/>

# 📦 넉스트 틀 (nuxt-template)

> 넉스트(Nuxt) 를 사용하기 좋게하면서 가능한 가장 최신의 모듈 버전으로 관리하고 있는 예시 틀입니다.

> 이 문서와 틀은 오직 한국어로 한국 내 넉스트 이용자를 위해 구성 & 관리되고 있습니다.😊 (<u>This document and template are organized and managed only for Nuxt users in Korea.</u>)

<br/>

이 프로젝트는 다른 프로젝트를 개발할 때 사용하기 좋도록 가능한 빈 틀을 만들되 설정들과 구조들을 잡아놓는 프로젝트로 제한된 일부 예시만을 가지고 있습니다. 🤗

<br/>

## ⚗️ 프로젝트 생성방법

> 이 템플릿을 이용한 프로젝트를 생성하려면 다음 명령어를 입력하세요.
```bash
npx degit AhaOfficial/nuxt-template <프로젝트명>
cd <프로젝트명>
```

> 또는 원하는 폴더 안에 바로 프로젝트를 생성하려면 다음 명령어를 입력하세요.
```bash
npx degit AhaOfficial/nuxt-template
```

<br/>


## 🥳 문서 모음

- [🤔 기초 설명](https://github.com/AhaOfficial/nuxt-template/blob/master/docs/기초_설명.md)
- [📔 사용하는 주요 기술](https://github.com/AhaOfficial/nuxt-template/blob/master/docs/사용하는_주요_기술.md)
- [👀 추천 강좌 목록](https://github.com/AhaOfficial/nuxt-template/blob/master/docs/%EC%B6%94%EC%B2%9C_%EA%B0%95%EC%A2%8C_%EB%AA%A9%EB%A1%9D.md)
- 🛠 개발 환경 구성 방법
- ⚗️ 실행/빌드/배포 방법
- 🔬 기타 명령어 및 테스트 방법

<br/>

## 🎛 최상위 폴더/파일 설명
> 폴더 및 파일에 대한 설명이 여기 담깁니다.

- 🗂 .nuxt

  > 클라이언트 프로그램이 빌드된 결과물과 그에 필요한 바로 실행가능한 서버 프로그램이 담깁니다.
  >
  > (이 폴더는 빌드가 완료된 이후 시점에 생성됩니다. 삭제해도 매 빌드마다 재생성 됩니다.)

- 🗂 .vscode

  > VSCode 편집기 사용시 공통적으로 사용될 편집 규칙들이 여기에 정의됩니다.

- 🗂 client

  > 클라이언트 프로그램의 소스코드들과 리소스(= 에셋)들이 모두 여기에 담깁니다.

- 🗂 docs

  > 이 프로젝트와 관련된 문서들이 여기에 담깁니다.

- 🗂 node_modules

  > 프로젝트에서 사용하는노드 모듈들이 여기에 다운로드 됩니다.
  >
  > (이 폴더는 npm install 명령어가 실행된 시점에 생성됩니다. 삭제해도 매 설치마다 재생성됩니다.)

- 📝 .eslintrc.js

  > ESLint 에서 사용할 자동정렬 규칙이 여기에 담깁니다.

- 📝 .gitignore

  > Git 자동으로 업로드되지 않을 파일과 폴더 목록 규칙을 정의합니다.

- 📝 .prettierrc.json

  > Prettier 에서 사용할 자동정렬 규칙이 여기에 담깁니다.
  >
  > (현재 이 프로젝트는 자동정렬에 ESLint 와 Prettier 를 모두 사용하고 있습니다.)

- 📝 LICENSE

  > 이 파일엔 이 프로젝트의 기본 저작권 정보가 담깁니다.
  >
  > (이 템플릿을 이용해 새 프로젝트를 만들 때에는 LICENSE.md 를 알맞게 수정하셔야 합니다.)

- 📝 nuxt.config.ts

  > 넉스트 프로젝트의 설정 정보가 여기에 담깁니다.

- 📝 package.json

  > 이 프로젝트에서 사용하는 모듈들이 여기에 명시됩니다.

- 📝 package-lock.json

  > 이 프로젝트에서 사용하는 모듈들의 다운로드 경로와 마지막으로 사용한 모듈 버전이 기록됩니다.
  >
  > (프로젝트에서 사용하는 모듈관계를 확인할 때에 중요한 파일이나, 삭제시 재생성이 가능합니다.)

- 📝 README.md

  > 이 프로젝트를 설명하는 Markdown 형태의 문서입니다.
  >
  > (README.md 를 수정할 때엔 Typora 라는 에디터를 추천합니다.)

- 📝 tsconfig.json

  > 이 프로젝트에서 사용하는 타입스크립트 설정이 여기에 명시됩니다.

<br/>
<br/>

## 🏷 저작권

MIT Licensed.

