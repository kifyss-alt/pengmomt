# 태블릿 사용 타임아웃 게시판 (데스크톱 앱 · 경량 버전)

`desktop-app/tablet-timeout-widget`(Electron 버전, 약 80MB)와 화면·기능은
동일하지만, [Neutralinojs](https://neutralino.js.org/)로 만들어 실행 파일
크기가 훨씬 작습니다(윈도우용 exe 약 2.6MB + 리소스 파일 약 50KB). 브라우저
없이 별도 창으로 뜨고, 최소화·최대화·닫기 버튼을 그대로 쓸 수 있으며, 상단의
"📌 항상 위 고정" 버튼으로 다른 창 위에 항상 떠 있게 고정할 수 있습니다. 창을
닫아도 시스템 트레이(알림 영역)에 남아있다가 트레이 아이콘을 클릭하면 다시
열립니다. 완전히 끄려면 트레이 메뉴의 "종료"를 누릅니다.

## 빌드 방법

이 폴더는 소스 코드만 저장소에 있고, 런타임 바이너리(`bin/`)와 빌드
결과물(`dist/`)은 git에 커밋하지 않습니다.

```bash
cd desktop-app/tablet-timeout-lite

# 1) Neutralinojs 런타임 바이너리 + 클라이언트 라이브러리 받기
#    (neutralino.config.json에 버전이 고정되어 있어 `neu update`만 실행하면 됩니다)
npx @neutralinojs/neu update

# 2) 빌드 (윈도우/리눅스/맥용 실행 파일이 dist/tablet-timeout-widget/ 에 생성됩니다)
npx @neutralinojs/neu build
```

빌드 후 `dist/tablet-timeout-widget/` 안의 다음 두 파일을 **같은 폴더에
함께** 배포해야 합니다 (실행 파일이 옆의 리소스 파일을 읽습니다).

- `tablet-timeout-widget-win_x64.exe`
- `resources.neu`

두 파일을 압축(zip)해서 전달하면 사용자는 압축을 풀고 `.exe`만 더블클릭하면
됩니다. 설치 과정이 없습니다.

> ⚠️ 압축할 때 폴더/파일 이름을 영문(ASCII)으로 지어주세요. 한글 파일명으로
> zip을 만들면 UTF-8 플래그가 없는 zip 도구(예: 리눅스 `zip` 기본 옵션)에서
> 윈도우 탐색기 기본 압축 풀기 기능이 파일명을 깨뜨려 "압축 파일이
> 비어있다"고 뜨는 문제가 있었습니다.

## 참고

- 실행 화면(`resources/index.html`)의 명단·30분 타이머 로직은
  `games/tablet-timeout/index.html`과 동일한 코드입니다.
- 윈도우에서는 시스템에 내장된 WebView2(엣지 크로미움 엔진)로 화면을
  그립니다. 윈도우 10/11에는 기본 설치되어 있어 별도 설치가 필요 없습니다.
