# Mindstream LAB · Awesome JWY — 브랜드 마크

이 저장소의 모든 산출물(웹앱, 슬라이드, 문서, 이미지)에는 이 마크를 넣는다.

## 파일

| 파일 | 용도 |
|---|---|
| `brand.css` | 웹 페이지용 CSS 컴포넌트. 폰트가 base64로 내장되어 오프라인에서도 동일하게 렌더링된다. |
| `mindstream-lab-stacked-light.svg` / `.png` | 밝은 배경용 세로형(2단) 마크 |
| `mindstream-lab-stacked-dark.svg` / `.png` | 어두운 배경용 세로형 마크 |
| `mindstream-lab-inline-light.svg` / `.png` | 밝은 배경용 가로 1줄 마크 (푸터·머리말) |
| `mindstream-lab-inline-dark.svg` / `.png` | 어두운 배경용 가로 1줄 마크 |
| `preview.html` | 4가지 변형을 한 번에 보는 미리보기 |

- **SVG**: 글자가 아웃라인 패스로 변환되어 있어 폰트가 없는 PC에서도 깨지지 않는다. 웹·인쇄용 권장.
- **PNG**: 배경 투명, 가로 2,600~3,700px. PowerPoint·Word처럼 SVG 지원이 불완전한 곳에 쓴다.

## 쓰는 법

### 웹 페이지 (CSS 컴포넌트)

```html
<link rel="stylesheet" href="assets/brand/brand.css">

<!-- 가로 1줄 (푸터용) -->
<span class="ms-mark ms-inline" style="--ms-size:28px;color:#16233C;">
  <span class="ms-word">Mindstream</span><span class="ms-lab">LAB</span>
  <span class="ms-divider"></span><span class="ms-sub">Awesome JWY</span>
</span>

<!-- 세로 2단 -->
<div class="ms-mark" style="--ms-size:56px;">
  <div class="ms-top">
    <div class="ms-brand"><span class="ms-word">Mindstream</span><span class="ms-rule"></span></div>
    <span class="ms-lab">LAB</span>
  </div>
  <div class="ms-sub">AWESOME JWY</div>
</div>
```

- 크기는 `--ms-size` 하나로 조절한다 (Mindstream 글자 크기 기준, 나머지는 비율로 따라감).
- 어두운 배경에서는 `ms-on-dark` 클래스를 함께 준다.
- 단일 HTML 파일로 배포할 때는 CSS 대신 SVG 원본을 문서에 직접 붙여 넣는다
  (`pomodoro.html` 푸터가 그 방식이다). 이때 `id="wg"`, `id="rg"` 같은 그라디언트 id가
  페이지 안에서 충돌하지 않도록 접두어를 붙일 것.

### 슬라이드 / 문서

- PPTX·DOCX: `*-inline-*.png` 또는 `*-stacked-*.png` 삽입. 표지에는 세로형, 각 장 하단에는 가로형.
- 배경이 어두우면 `-dark`, 밝으면 `-light`를 쓴다.

## 색상

| 요소 | 밝은 배경 | 어두운 배경 |
|---|---|---|
| Mindstream (그라디언트) | `#1B7FD4` → `#12B0BC` → `#10CFA0` | `#43C6E8` → `#3ADFC0` → `#46E8A6` |
| 밑줄 (그라디언트) | `#3B44E0` → `#12C9A0` | `#5B6BFF` → `#2BE0A0` |
| LAB | `#16233C` | `#F2F6FA` |
| AWESOME JWY | `#5A6675` | `#9BB0C0` |

## 규칙

- 마크 주위에 최소 여백으로 `Mindstream` 글자 높이의 0.5배를 확보한다.
- 가로 1줄 마크는 높이 20px 미만으로 줄이지 않는다 (`AWESOME JWY`가 뭉개짐).
- 비율을 임의로 늘이거나 줄이지 않는다. 색상 교체·회전·그림자 추가도 하지 않는다.

## 폰트 라이선스

- **Playfair Display** (Mindstream), **Jost** (LAB / AWESOME JWY) — 둘 다 SIL Open Font License 1.1.
  웹 내장 및 재배포가 허용된다. SVG는 아웃라인 변환본이라 폰트 파일을 포함하지 않는다.

## 재생성

`brand.css`(폰트 내장)와 SVG·PNG 자산은 스크립트로 생성했다. 재생성이 필요하면
Playfair Display 500 / Jost 300 웹폰트를 내려받아 같은 절차로 다시 만든다.
