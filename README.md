# artposter

브라우저에서 바로 쓰는 웹 도구 모음. **모든 코드는 `apps/<슬러그>/` 폴더 단위**로 관리합니다.

## 새 앱 만들기

```bash
./scripts/new-app.sh card-maker "카드 메이커" "초대장 카드를 만드는 도구" 💌
```

`apps/card-maker/` 폴더(`index.html`·`app.json`·`README.md`)가 생성되고, 루트 허브 `index.html` 이 자동으로 갱신됩니다.

## 허브 페이지 수동 갱신

```bash
node scripts/build-index.mjs
```

`main` 브랜치에 push 하면 GitHub Actions 가 동일한 작업을 자동 수행합니다.

## 현재 앱

| 앱 | 경로 | 설명 |
| --- | --- | --- |
| 🎨 Wanderlust Bauhaus Poster Maker | `apps/bauhaus-poster/` | 바우하우스 스타일 여행 포스터 제작 도구 |

자세한 작업 규칙은 [CLAUDE.md](./CLAUDE.md) 참고.
