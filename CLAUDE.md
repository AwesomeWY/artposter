# artposter — 저장소 규칙

이 저장소는 **웹 도구·미니앱 모음**입니다. 코드는 항상 폴더 단위로 관리합니다.

## 1. 절대 규칙: 새 코드 = 새 폴더

새로운 도구·페이지·앱을 만들 때는 **반드시 `apps/<슬러그>/` 폴더를 먼저 만들고** 그 안에 작성합니다.
저장소 루트에 `index.html` 외의 애플리케이션 파일을 두지 마세요.

```
artposter/
├── index.html              ← 자동 생성되는 허브 페이지 (직접 수정 금지)
├── CLAUDE.md
├── apps/
│   ├── bauhaus-poster/
│   │   ├── index.html      ← 진입점 (필수)
│   │   ├── app.json        ← 메타데이터 (필수)
│   │   └── README.md
│   └── <다음-앱>/
├── scripts/
│   ├── new-app.sh          ← 폴더 스캐폴딩
│   └── build-index.mjs     ← 허브 생성기
└── .github/workflows/build-index.yml
```

## 2. 새 앱을 만드는 절차

```bash
./scripts/new-app.sh <슬러그> "제목" "한 줄 설명" 이모지
# 예: ./scripts/new-app.sh card-maker "카드 메이커" "초대장 카드를 만드는 도구" 💌
```

이 명령은 `apps/<슬러그>/` 에 `index.html`·`app.json`·`README.md` 를 만들고 루트 허브를 갱신합니다.
스크립트를 쓰지 않고 직접 폴더를 만들었다면, 마지막에 반드시 `node scripts/build-index.mjs` 를 실행하세요.

- 슬러그: 소문자·숫자·하이픈만 (`bauhaus-poster`, `card-maker`)
- `app.json` 필드: `title`, `description`, `emoji`, `tags`, `status`(`draft`|`active`|`archived`), `created`, `entry`

## 3. 루트 `index.html`

`scripts/build-index.mjs` 가 `apps/*/app.json` 을 읽어 생성하는 **자동 생성 파일**입니다.
손으로 고치지 말고, 내용을 바꾸려면 `app.json` 이나 생성기 템플릿을 수정한 뒤 다시 실행하세요.
`main` 에 push 되면 GitHub Actions(`build-index.yml`)가 같은 작업을 자동으로 수행합니다.

## 4. 기술 스택 기본값

- 별도 빌드 도구 없이 **단일 HTML + CDN**(Tailwind CDN, Google Fonts, Lucide)으로 작성합니다.
- 브라우저에서 파일을 바로 열어 동작해야 합니다. 번들러·npm install 이 필요한 구조는 피하세요.
- 한국어 UI가 기본이며, 폰트는 `Noto Sans KR` + `Space Grotesk` 조합을 사용합니다.

## 5. 커밋

- 앱 추가: `feat(<슬러그>): ...`
- 앱 수정: `fix(<슬러그>): ...` / `refactor(<슬러그>): ...`
- 구조·설정: `chore: ...`
