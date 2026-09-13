---
name: pengbox
description: 펭맘 포트폴리오 사이트(https://pengbox-kifyss-alts-projects.vercel.app/)의 "펭맘의 작업실" 탭에 새로 만든 바이브코딩 작업물(웹앱, 미니게임, 자동화 도구 등)을 추가하고 배포한다. "작업물 추가해줘", "이거 pengbox에 올려줘", "게임 추가해줘" 같은 요청이나 /pengbox 호출 시 사용한다.
---

# pengbox — 작업물 추가 스킬

이 저장소(`pengmomt`)는 펭맘 선생님의 포트폴리오 SPA다. `main` 브랜치가 Vercel과 연동되어 있어
push하면 자동으로 https://pengbox-kifyss-alts-projects.vercel.app/ 에 배포된다.
새 작업물은 "펭맘의 작업실" 탭(`index.html`의 `#vibe-projects`) 카드 그리드에 표시되며,
데이터는 `vibe-portal.js`의 `vibeProjectsData` 배열 하나로 관리된다.

## 1. 필요한 정보 수집

사용자가 아래 정보를 안 줬으면 물어본다. (파일/코드가 이미 있으면 내용을 보고 직접 채워도 됨)

- **title**: 작업물 이름
- **problem**: 해결하고 싶었던 문제/목적 (한두 문장)
- **features**: 주요 기능 (쉼표로 나열)
- **tools**: 사용한 도구 (예: `Antigravity, Claude Code, Codex / HTML / CSS / JavaScript`)
- **target**: 대상 사용자
- **status**: `공개` | `제작 중` | `준비 중` 중 하나
- **tags**: 분류 태그 배열. 필터 버튼과 매칭되는 값은 다음 중 하나 이상 포함 권장
  — `수업·놀이`, `교사업무`, `학부모 소통`, `특수교육`, `홈페이지`, `실험 중`
  (그 외 자유 태그도 함께 추가 가능, 예: 사용 도구명)
- **isFeatured**: 대표작으로 강조할지 (`true`면 🌟, `false`면 🛠️ 아이콘)
- **결과물 형태**: 아래 셋 중 하나
  1. 새로 만든 독립 웹앱/게임 파일 (index.html/css/js) → `games/` 폴더에 배치
  2. 외부 링크(구글 시트/폼, Canva 등) → 그 URL을 그대로 사용
  3. 아직 미리보기 없음 → `previewUrl: null`

## 2. 독립 웹앱(게임) 파일 배치 — 결과물 형태 1인 경우

`games/korea-map-puzzle/`을 참고 패턴으로 사용한다:

- 폴더명은 영문 kebab-case 슬러그로 새로 만든다: `games/<slug>/`
- `index.html`, `style.css`, `script.js`로 구성된 완전히 독립적인 정적 페이지로 작성한다
  (메인 SPA의 CSS/JS에 의존하지 않음)
- `<head>`에 페이지 제목/설명(`<title>`, `<meta name="description">`)을 넣는다
- 헤더에 메인 사이트로 돌아가는 링크를 넣는다: `<a href="../../index.html" class="back-link">← 펭맘 스페이스로</a>`
- 이미지가 필요하면 `assets/images/`에 추가하고 상대경로로 참조한다

이미 완성된 파일을 사용자가 붙여넣거나 지정한 경우, 위 구조에 맞게 옮겨 담기만 하면 된다.

## 3. `vibe-portal.js`에 항목 추가

`vibeProjectsData` 배열(`vibe-portal.js` 상단부, `// 3. 작업실 데이터` 주석 아래)을 읽고:

1. 기존 항목 중 가장 큰 `proj-N` 번호를 찾아 다음 번호로 `id`를 정한다 (예: 마지막이 `proj-3`이면 `proj-4`)
2. 배열의 마지막 항목 뒤에 같은 스타일로 새 객체를 추가한다:

```js
{
    id: 'proj-N',
    title: '...',
    problem: '...',
    features: '...',
    tools: '...',
    target: '...',
    status: '공개',
    tags: ['수업·놀이', '웹앱'],
    isFeatured: false,
    previewUrl: 'games/<slug>/index.html'   // 또는 외부 URL, 또는 null
}
```

- `previewUrl`이 `null`이거나 `'#'`이면 카드에 "공개 준비 중" 배지가 뜨고 미리보기 버튼이 숨겨진다
- 다른 필드(problem/features/tools/target)는 실제 모달 상세 내용에 그대로 노출되므로 존재하는 그대로,
  과장 없이 사실대로 작성한다

## 4. 검증

- `node -c vibe-portal.js` 로 문법 오류가 없는지 확인한다
- 가능하면 `node server.js`로 로컬 서버(`http://localhost:8080`)를 띄워 "펭맘의 작업실" 탭에서
  새 카드와 상세 모달, (있다면) 미리보기 링크가 정상 동작하는지 확인한다

## 5. 커밋 & 배포

- 기존 커밋 메시지 스타일(간결한 한국어 요약, 예: "우리나라 지도 퍼즐 웹앱 추가")을 따라 커밋한다
- **main에 push해야 실제 프로덕션 사이트(pengbox-kifyss-alts-projects.vercel.app)에 배포된다.**
  현재 작업 브랜치가 `main`이 아니면, main으로 반영(merge/push)해도 되는지 사용자에게 먼저 확인한다 —
  다른 사람과 공유되는 프로덕션 배포를 트리거하는 행동이므로 임의로 진행하지 않는다
- push 후에는 Vercel이 GitHub 연동으로 자동 빌드/배포하며, 보통 1~2분 내 사이트에 반영된다고 안내한다
