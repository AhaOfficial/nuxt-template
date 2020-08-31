<img src="https://i.imgur.com/R2wksCG.png" width="400"/>

<br/>

<center><b>📮 넉스트 틀 버전:</b> 2020-Apeach-1.0.0</center>

<br/>
<br/>

# 📦 넉스트 틀 (nuxt-template)

> 넉스트(Nuxt) 를 사용하기 좋게하면서 가능한 **가장 최신의 모듈 버전으로 관리하고 있는 예시 틀**입니다.

> 이 문서와 틀은 오직 **한국어로 한국 내 넉스트 이용자를 위해** 구성 & 관리되고 있습니다.😊 (<u>This document and template are organized and managed only for Nuxt users in Korea.</u>)

<br/>

이 프로젝트는 다른 프로젝트를 개발할 때 사용하기 좋도록 가능한 빈 틀을 만들되 **설정들과 구조들을 잡아놓는 프로젝트로 제한된 일부 예시만을 가지고 있습니다.** 🤗

<br/>

## 🥳 문서 모음

> 문서를 기여해주시려면 `docs/` 에 md 파일을 작성해주시면 됩니다! [[작성방법]](https://github.com/AhaOfficial/nuxt-template/tree/master/docs#-%EB%AC%B8%EC%84%9C-%EC%9E%91%EC%84%B1-%EB%B0%A9%EB%B2%95)

- [🤔 기초 설명](https://github.com/AhaOfficial/nuxt-template/blob/master/docs/기초_설명.md)
- [📔 사용하는 주요 기술](https://github.com/AhaOfficial/nuxt-template/blob/master/docs/사용하는_주요_기술.md)
- [👀 추천 강좌 목록](https://github.com/AhaOfficial/nuxt-template/blob/master/docs/%EC%B6%94%EC%B2%9C_%EA%B0%95%EC%A2%8C_%EB%AA%A9%EB%A1%9D.md)
- [🛠 개발 환경 구성 방법](https://github.com/AhaOfficial/nuxt-template/blob/master/docs/%EA%B0%9C%EB%B0%9C_%ED%99%98%EA%B2%BD_%EA%B5%AC%EC%84%B1_%EB%B0%A9%EB%B2%95.md)
- [⚗️ 실행/빌드/배포 방법](https://github.com/AhaOfficial/nuxt-template/blob/master/docs/%EC%8B%A4%ED%96%89_%EB%B9%8C%EB%93%9C_%EB%B0%B0%ED%8F%AC_%EB%B0%A9%EB%B2%95.md)
- [🔬 기타 명령어 및 테스트 방법](https://github.com/AhaOfficial/nuxt-template/blob/master/docs/%EA%B8%B0%ED%83%80_%EB%AA%85%EB%A0%B9%EC%96%B4_%EB%B0%8F_%ED%85%8C%EC%8A%A4%ED%8A%B8_%EB%B0%A9%EB%B2%95.md)

<br/>

## 🔮 브라우저 상에서 실행 방법

> 프로젝트를 웹에서 바로 실행시키거나, 아니면 가볍게 시험 개발을 진행 할 수 있습니다.

<br/>

### 🔮 가벼운 시험개발용

> 코드펜이라는 웹 에디터를 통해서 이 프로젝트 틀을 사용하면서 가볍게 한 페이지를 작성할 수 있습니다.

> 간단한 예시를 만들어서 공유하거나, 어떠한 코드가 작동할지 간단히 시험 개발해보는데에 용이합니다.

- [📦 Codepen.io 카운터 예시](https://codepen.io/pen/?template=xxVOwgg)

- [📦 Codepen.io 빈 템플릿](https://codepen.io/pen/?template=xxVOYbB)

<br/>

### 🔮 프로젝트를 웹에서 실행

> 코드 샌드박스라는 **웹 IDE 를 통해서 이 프로젝트를 설치 없이 웹에서 바로 실행할 수 있습니다.**

> 웹 상 빌드에 2분 가량 시간이 소요되며, 빌드가 완료되면 내부 브라우저가 바로 실행됩니다.

[🚀 CodeSandbox 웹 IDE 실행](https://githubbox.com/AhaOfficial/nuxt-template)  [[실행모습 이미지]](https://i.imgur.com/EsxrjSA.png)

<br/>

## ⚗️ 프로젝트 생성방법

> 이 템플릿을 이용한 **프로젝트를 로컬에 생성하려면 다음 명령어를 입력하세요.**
```bash
npx degit AhaOfficial/nuxt-template <프로젝트명>
cd <프로젝트명>
```

> 또는 **원하는 폴더 안에 바로 프로젝트를 생성하려면 다음 명령어를 입력하세요.**
```bash
npx degit AhaOfficial/nuxt-template
```

<br/>

## 🎛 최상위 폴더/파일 설명
> 폴더 및 파일에 대한 설명이 여기 담깁니다.

- 🗂 .nuxt

  > **클라이언트 프로그램이 빌드된 결과물과 그에 필요한 바로 실행가능한 서버 프로그램**이 담깁니다.
  >
  > (이 폴더는 빌드가 완료된 이후 시점에 생성됩니다. 삭제해도 매 빌드마다 재생성 됩니다.)

- 🗂 .vscode

  > **VSCode 편집기 사용시 공통적으로 사용될 편집 규칙들**이 여기에 정의됩니다.

- 🗂 client

  > **클라이언트 프로그램의 에셋**(소스코드들과 리소스)들이 모두 여기에 담깁니다.

- 🗂 docs

  > **이 프로젝트와 관련된 문서들**이 여기에 담깁니다.

- 🗂 node_modules

  > **프로젝트에서 사용하는노드 모듈들**이 여기에 다운로드 됩니다.
  >
  > (이 폴더는 npm install 명령어가 실행된 시점에 생성됩니다. 삭제해도 매 설치마다 재생성됩니다.)

- 📝 .eslintignore

  > **ESLint 에서 린트 적용시 배제할 대상 규칙**이 여기에 담깁니다.

- 📝 .eslintrc.js

  > **ESLint 에서 사용할 자동정렬 규칙**이 여기에 담깁니다.

- 📝 .gitignore

  > **Git 자동으로 업로드되지 않을 파일과 폴더 목록 규칙**을 정의합니다.

- 📝 .prettierrc.json

  > **Prettier 에서 사용할 자동정렬 규칙**이 여기에 담깁니다.
  >
  > (현재 이 프로젝트는 자동정렬에 ESLint 와 Prettier 를 모두 사용하고 있습니다.)

- 📝 LICENSE

  > 이 파일엔 이 **프로젝트의 기본 저작권 정보**가 담깁니다.
  >
  > (이 템플릿을 이용해 새 프로젝트를 만들 때에는 LICENSE.md 를 알맞게 수정하셔야 합니다.)

- 📝 nuxt.config.ts

  > **넉스트 프로젝트의 설정 정보**가 여기에 담깁니다.

- 📝 package.json

  > 이 프로젝트에서 **사용하는 모듈들이 여기에 명시**됩니다.

- 📝 package-lock.json

  > **이 프로젝트에서 사용하는 모듈들의 다운로드 경로와 마지막으로 사용한 모듈 버전**이 기록됩니다.
  >
  > (프로젝트에서 사용하는 모듈관계를 확인할 때에 중요한 파일이나, 삭제시 재생성이 가능합니다.)

- 📝 postbuild.ts

  > **nuxt 의 transpile 모듈 대상을 자동으로 명시해주는 함수**가 담겨있습니다.

- 📝 qawolf.config.ts

  > **QAWolf 의 설정**이 여기에 담깁니다.

- 📝 README.md

  > **이 프로젝트를 설명하는 Markdown 형태의 문서**입니다.
  >
  > (README.md 를 수정할 때엔 Typora 라는 에디터를 추천합니다.)

- 📝 sandbox.config.json

  > **클라우드 IDE 설정파일** 입니다. 웹에서 Codesandbox 나 Github IDE 를 통해서 바로 편집 및 실행이 될 때에, 이 프로젝트는 node 를 기반으로 하는 프로젝트라는 것을 알립니다. [[설명문서]](https://codesandbox.io/docs/importing#import-from-github)

- 📝 stylelint.config.js

- 📝 tsconfig.json

  > 이 **프로젝트에서 사용하는 타입스크립트 설정**이 여기에 명시됩니다.

<br/>
<br/>

## 🏷 저작권

MIT Licensed.

