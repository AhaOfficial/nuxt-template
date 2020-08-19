<img src="https://i.imgur.com/R2wksCG.png" width="400"/>

<br/>

[🧲 처음 페이지로 돌아가기](https://github.com/AhaOfficial/nuxt-template)

<br/>

# ⚠️ .env

> 프로젝트에서 바깥에 노출되면 안 되는 환경변수들이 여기에 담깁니다.

**`.env` 파일은 노드에 주입되는 환경변수들을 모아놓은 파일**로 dotenv 라는 모듈을 통해서 사용됩니다. 자세한 내용은 dotenv 모듈 문서를 참조해주세요. [[npm 문서보기]](https://www.npmjs.com/package/dotenv)

노드 JS 로 개발하게 되면 API 서버 주소나, DB 관련 정보, CI/CD 전송용 인증 토큰등, 중요한 정보들이 생기게 됩니다.  이러한 정보는 실수로 노출되지 않도록 언제든 수정가능하면서 **필요시 삭제나 숨기기 용이하도록 한 파일에 모으게 됩니다**. 이렇듯 중요한 정보들을 dotenv 라는 파일 안에 모은 후 환경변수 형태로 관리하는 경우를 위한 폴더가 이 폴더입니다.

## ⚠️ 관리시 주의사항

- 비공개 프로젝트인 경우

이러한 정보들은 프로젝트를 통째로 비공개로 개발한다면 프로젝트 코드 전체가 노출되지 않으므로 순수하게 환경변수의 역할로 사용하면 됩니다. 😊

- ⚠️오픈소스 프로젝트인 경우⚠️

프로젝트 코드를 오픈소스로 공개해놓고 쓰는 경우엔 .env 파일이 Github 에 공유되면 상당한 문제가 됩니다⚠️ , **반드시 `.gitignore` 파일에 아래 사항을 명시해서 `.env` 파일이 노출되는 일이 없도록 합니다.**

```bash
.env.dev
.dev.prod
```

<br/>

[🧲 처음 페이지로 돌아가기](https://github.com/AhaOfficial/nuxt-template)
