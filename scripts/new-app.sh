#!/usr/bin/env bash
# 새 앱 폴더를 apps/<슬러그>/ 아래에 만들고 루트 허브를 다시 생성한다.
#   사용법: ./scripts/new-app.sh <슬러그> ["제목"] ["한 줄 설명"] [이모지]
#   예시:   ./scripts/new-app.sh card-maker "카드 메이커" "초대장 카드를 만드는 도구" 💌
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SLUG="${1:-}"

if [[ -z "$SLUG" ]]; then
  echo "사용법: ./scripts/new-app.sh <슬러그> [\"제목\"] [\"설명\"] [이모지]" >&2
  exit 1
fi
if [[ ! "$SLUG" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
  echo "오류: 슬러그는 소문자·숫자·하이픈만 사용하세요 (예: bauhaus-poster)." >&2
  exit 1
fi

DIR="$ROOT/apps/$SLUG"
if [[ -e "$DIR" ]]; then
  echo "오류: apps/$SLUG 이(가) 이미 존재합니다." >&2
  exit 1
fi

TITLE="${2:-$SLUG}"
DESC="${3:-}"
EMOJI="${4:-📦}"
TODAY="$(date +%F)"

mkdir -p "$DIR"

python3 - "$DIR/app.json" "$TITLE" "$DESC" "$EMOJI" "$TODAY" <<'PY'
import json, sys
path, title, desc, emoji, today = sys.argv[1:6]
meta = {
    "title": title,
    "description": desc,
    "emoji": emoji,
    "tags": [],
    "status": "draft",
    "created": today,
    "entry": "index.html",
}
with open(path, "w", encoding="utf-8") as f:
    json.dump(meta, f, ensure_ascii=False, indent=2)
    f.write("\n")
PY

cat > "$DIR/index.html" <<HTML
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>$TITLE</title>
</head>
<body>
  <h1>$EMOJI $TITLE</h1>
  <p>$DESC</p>
</body>
</html>
HTML

cat > "$DIR/README.md" <<MD
# $EMOJI $TITLE

$DESC

- **실행**: \`apps/$SLUG/index.html\`
- **생성일**: $TODAY
MD

node "$ROOT/scripts/build-index.mjs"
echo "완료: apps/$SLUG/ 생성 (index.html, app.json, README.md)"
