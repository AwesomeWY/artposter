# artposter 레포 구성 규칙

이 레포는 여러 개의 독립적인 포스터/디자인 제작 웹앱(HTML/CSS/JS)을 모아두는 저장소입니다.

## 폴더 규칙 (중요)

- **새 프로젝트를 생성할 때마다 레포 루트에 새 폴더를 만들고 그 안에 코드를 넣는다.**
  - 예: `wanderlust-bauhaus-poster-maker/index.html`
- 폴더명은 프로젝트를 설명하는 kebab-case 영문명을 사용한다 (예: `retro-concert-poster`, `minimal-quote-card`).
- 레포 루트에 직접 `index.html` 등 소스 파일을 두지 않는다. 각 프로젝트는 자신의 폴더 안에서 완결되어야 하며, 다른 프로젝트 폴더의 파일을 참조하지 않는다 (완전 독립).
- 각 프로젝트 폴더는 기본적으로 단일 `index.html`(인라인 CSS/JS)로 구성하되, 필요 시 해당 폴더 내부에서만 assets/, css/, js/ 등 하위 구조를 추가할 수 있다.
- 기존 프로젝트를 수정할 때는 해당 프로젝트의 폴더 안에서만 작업한다.
