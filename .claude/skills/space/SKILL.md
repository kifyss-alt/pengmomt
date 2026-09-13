---
name: space
description: 펭맘 포트폴리오 사이트를 GitHub Pages 주소(https://kifyss-alt.github.io/pengmomt/index.html)에 자동으로 반영한다. "스페이스에 올려줘", "space에 추가해줘" 같은 요청이나 /space 호출 시 사용한다. pengbox 스킬과 같은 저장소/같은 main 브랜치를 다루는 동일 절차다.
---

# space — GitHub Pages 배포 스킬

이 저장소(`pengmomt`)는 하나의 `main` 브랜치에서 **두 곳에 동시에 배포**된다:

- Vercel 프로덕션: https://pengbox-kifyss-alts-projects.vercel.app/ (`/pengbox` 스킬)
- GitHub Pages: https://kifyss-alt.github.io/pengmomt/index.html (`/space` 스킬, 이 문서)

즉 `main`에 push하면 **두 사이트가 동시에 자동으로 갱신**된다. 파일 구조와 데이터(`vibeProjectsData`),
작업 절차는 pengbox와 완전히 동일하므로, `/space` 실행 시 `.claude/skills/pengbox/SKILL.md`의
1~5단계를 그대로 따른다.

## 절차

`.claude/skills/pengbox/SKILL.md`를 열어 아래 순서대로 그대로 수행한다:

0. 브랜치 준비 (main으로 전환 후 pull)
1. 필요한 정보 수집 (title, problem, features, tools, target, status, tags, isFeatured, 결과물 형태)
2. 독립 웹앱/게임이면 `games/<slug>/`에 배치
3. `vibe-portal.js`의 `vibeProjectsData` 배열에 새 항목 추가
4. 검증 (`node -c vibe-portal.js`, 가능하면 로컬 서버로 확인)
5. main에 바로 커밋 & `git push origin main` (확인 질문 없이 자동 진행)

## 이 스킬만의 차이점

- 완료 안내 메시지에서는 **GitHub Pages 주소**(https://kifyss-alt.github.io/pengmomt/index.html)를
  기준으로 배포 완료를 안내한다. (Vercel 쪽도 같은 push로 함께 갱신된다는 점을 한 줄 덧붙여도 좋음)
- GitHub Pages는 저장소 Settings → Pages에서 `main` 브랜치 루트를 소스로 사용 중이라고 가정한다
  (별도의 `gh-pages` 브랜치나 GitHub Actions 배포 워크플로가 현재 저장소에 없음). 배포는 보통
  push 후 수 분(길면 최대 10분) 내에 반영된다 — Vercel보다 다소 느릴 수 있다는 점을 안내한다.
- 만약 향후 GitHub Pages 설정이 `gh-pages` 브랜치나 Actions 워크플로 방식으로 바뀌면, 이 문서의
  "main에 push하면 자동 반영" 가정을 그 방식에 맞게 다시 확인해야 한다.
