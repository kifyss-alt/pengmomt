/**
 * 펭맘 선생님의 바이브코딩 학습 포털 - 렌더링 & 인터랙션 스크립트
 */

// 1. 용어사전 데이터 (40여 개 용어)
const vibeDictionaryData = [
    // 기초 웹
    { id: 'dict-1', category: '기초 웹', name: 'HTML', diff: '초급', summary: '웹페이지의 뼈대와 글, 이미지를 배치하는 기본 구조 언어', metaphor: '건물의 뼈대와 벽막이판 구조', eduExample: '수업 안내문의 제목, 본문 글자, 유아 활동 사진 위치 지정', related: ['CSS', 'JavaScript', '브라우저'] },
    { id: 'dict-2', category: '기초 웹', name: 'CSS', diff: '초급', summary: '웹페이지의 색상, 글꼴, 크기, Layout 등 디자인을 꾸미는 스타일 언어', metaphor: '건물의 페인트 칠, 조명, 인테리어 디자인', eduExample: '유치원 교실 화면의 밝은 파스텔 톤 색상과 둥근 카드 버튼 디자인', related: ['HTML', '반응형 디자인', 'UI'] },
    { id: 'dict-3', category: '기초 웹', name: 'JavaScript', diff: '초급', summary: '버튼 클릭, 퀴즈 정답 확인 등 웹페이지에 움직임과 기능을 주는 언어', metaphor: '건물의 엘리베이터, 자동문, 스위치 동작 기계', eduExample: '칭찬 스티커 클릭 시 도장이 쾅 찍히는 반응 애니메이션', related: ['HTML', 'CSS', '프론트엔드'] },
    { id: 'dict-4', category: '기초 웹', name: '.gs 파일', diff: '초급', summary: 'Google Apps Script에서 구글 시트, 폼 등과 연동하는 서버 기능 파일', metaphor: '구글 사무실 안에서 자동으로 서류를 배달해 주는 비서', eduExample: '구글 설문지에 학부모가 응답하면 자동으로 시트에 정리 후 알림 송신', related: ['Google Sheets', '백엔드', 'API'] },
    { id: 'dict-5', category: '기초 웹', name: '웹앱 (Web App)', diff: '초급', summary: '설치 없이 브라우저 주소로 접속해 앱처럼 사용하는 웹 프로그램', metaphor: '인터넷 창만 열면 어디서나 작동하는 디지털 학습 도구함', eduExample: '교실 태블릿으로 접속하는 랜덤 발표자 룰렛 웹사이트', related: ['브라우저', '프론트엔드', '배포'] },
    { id: 'dict-6', category: '기초 웹', name: '브라우저', diff: '초급', summary: 'Chrome, Edge, Safari 등 웹사이트를 열어 보여 주는 프로그램', metaphor: '인터넷 세상을 보는 유리 창문', eduExample: '교실 스마트보드 크롬 브라우저에서 퀴즈 웹앱 띄우기', related: ['웹앱', 'HTML', '클라이언트'] },
    { id: 'dict-7', category: '기초 웹', name: '서버', diff: '중급', summary: '웹앱의 데이터와 화면 자료를 보관하고 사용자의 요청에 응답하는 컴퓨터', metaphor: '24시간 문을 열고 자료를 꺼내주는 학교 중앙 데이터 창고', eduExample: '선생님이 만든 단어 퀴즈 문제 모음집이 보관되는 장소', related: ['클라이언트', '백엔드', '호스팅'] },
    { id: 'dict-8', category: '기초 웹', name: '데이터베이스', diff: '중급', summary: '학습 기록, 출석 목록 등 데이터를 체계적으로 저장해 두는 통', metaphor: '학급 보관함 서랍장', eduExample: '유아별 출석 및 칭찬 스티커 획득 개수 누적 기록판', related: ['서버', '백엔드', '데이터'] },

    // 구조
    { id: 'dict-9', category: '구조', name: '프론트엔드', diff: '초급', summary: '선생님과 아이들이 직접 눈으로 보고 버튼을 누르는 앞 화면', metaphor: '교실 무대 위 눈에 보이는 화려한 세트장', eduExample: '버튼, 그림 카드, 타이머 숫자판 visual 영역', related: ['백엔드', 'UI', 'HTML'] },
    { id: 'dict-10', category: '구조', name: '백엔드', diff: '중급', summary: '화면 뒤에서 데이터 처리, 비밀번호 확인, 점수 계산을 수행하는 무대 뒤 공간', metaphor: '무대 뒤 조종실 및 기계 장치실', eduExample: '퀴즈 제출 시 채점을 수행하고 구글 시트에 결과를 저장하는 로직', related: ['프론트엔드', '서버', '데이터베이스'] },
    { id: 'dict-11', category: '구조', name: '클라이언트', diff: '초급', summary: '웹앱을 이용하는 선생님의 컴퓨터, 스마트폰, 교실 태블릿', metaphor: '창고에서 물건을 가져다 달라고 요청하는 사용자 손님', eduExample: '아이들이 손가락으로 터치하는 교실 아이패드 화면', related: ['서버', '프론트엔드'] },
    { id: 'dict-12', category: '구조', name: '반응형 디자인', diff: '초급', summary: 'PC, 태블릿, 스마트폰 화면 크기에 맞춰 자동으로 레이아웃이 변하는 기술', metaphor: '가방 크기에 맞게 깔끔하게 접히는 요가 매트', eduExample: '데스크톱 3열 카드가 모바일에서는 1열 세로 배열로 자동 조정', related: ['CSS', 'UX', 'UI'] },
    { id: 'dict-13', category: '구조', name: '컴포넌트', diff: '중급', summary: '버튼, 카드, 타이머 등 독립적으로 만들어 재사용할 수 있는 조각 모듈', metaphor: '필요할 때 바꿔 끼우는 레고 블록 조각', eduExample: '모든 퀴즈 문제 화면마다 공통으로 조립해 쓰는 [정답 확인 버튼]', related: ['라이브러리', 'UI'] },
    { id: 'dict-14', category: '구조', name: '라이브러리', diff: '중급', summary: '자주 쓰는 유용한 기능과 도구들을 미리 모아 놓은 연장 상자', metaphor: '필요한 미술 도구가 깔끔하게 정돈된 교실 준비물 상자', eduExample: '폭죽 애니메이션 효과를 손쉽게 내 주는 캔버스 팡팡 라이브러리', related: ['프레임워크', '컴포넌트'] },
    { id: 'dict-15', category: '구조', name: '프레임워크', diff: '중급', summary: '웹앱을 쉽고 빠르게 만들도록 기본 틀과 규칙을 제공하는 전용 제작틀', metaphor: '기본 골조와 지붕이 완성되어 있는 집 키트', eduExample: 'Vite, Next.js 등 구조화된 웹 프레임워크 환경', related: ['라이브러리', '백엔드'] },

    // 연결과 자동화
    { id: 'dict-16', category: '연결과 자동화', name: 'API', diff: '중급', summary: '서로 다른 서비스나 프로그램이 데이터를 주고받도록 약속된 창구', metaphor: '식당에서 손님 주문을 주방에 전달하고 음식을 받아오는 식당 지배인', eduExample: '내 웹앱에서 생성형 AI에게 질문을 전달하고 답변 문장을 받아오는 연결선', related: ['MCP', 'Webhook', '인증'] },
    { id: 'dict-17', category: '연결과 자동화', name: 'MCP', diff: '중급', summary: 'AI가 필요한 연장(파일 읽기, 검색, 실행)을 스스로 찾아 쓰도록 연결해 주는 체계', metaphor: '맥가이버 칼처럼 AI 손에 맞춰주는 스마트 만능 툴 홀더', eduExample: 'Antigravity AI가 선생님 컴퓨터의 파일 목록을 열람하고 코드를 고치는 연결 기술', related: ['API', '에이전트', '클라우드'] },
    { id: 'dict-18', category: '연결과 자동화', name: 'Webhook', diff: '중급', summary: '어떤 사건(응답 제출 등)이 발생했을 때 다른 서비스로 실시간 알림을 쏘아주는 장치', metaphor: '우편함에 편지가 들어오면 집에 벨이 딩동 울리는 자동 벨', eduExample: '학부모가 상담 신청 폼을 제출하면 선생님 카카오톡/메일로 즉시 알림 전송', related: ['API', 'Google Forms', '자동화'] },
    { id: 'dict-19', category: '연결과 자동화', name: '인증 (Authentication)', diff: '초급', summary: '접속한 사용자가 진짜 그 선생님이 맞는지 확인하는 신원 확인 절차', metaphor: '학교 경비실에서 선생님 신분증을 확인하는 방문 확인', eduExample: '구글 계정으로 로그인하여 선생님 본인 확인하기', related: ['권한', '토큰'] },
    { id: 'dict-20', category: '연결과 자동화', name: '권한 (Authorization)', diff: '초급', summary: '확인된 사용자에게 특정 자료를 열람하거나 수정하도록 허용하는 범위', metaphor: '선생님 열쇠로는 교무실 문을 열 수 있지만 관리실 통제구역은 제한되는 것', eduExample: '유아는 퀴즈 풀기만 가능, 선생님은 문제 수정 권한 부여', related: ['인증', '토큰'] },
    { id: 'dict-21', category: '연결과 자동화', name: '토큰 (Token)', diff: '중급', summary: '로그인 상태를 유지하기 위해 브라우저에 임시로 보관하는 디지털 출입증 카드', metaphor: '놀이동산 자유이용권 팔찌', eduExample: '한 번 로그인하면 창을 닫아도 당분간 다시 비밀번호를 묻지 않는 이유', related: ['인증', '권한'] },
    { id: 'dict-22', category: '연결과 자동화', name: '배포 (Deploy)', diff: '초급', summary: '내가 만든 웹앱을 인터넷 세상에 올려 누구나 접속할 수 있게 만드는 과정', metaphor: '학급 안내문을 게시판에 깔끔하게 붙이는 출간 작업', eduExample: '만든 칭찬 스티커 웹앱을 GitHub Pages나 Vercel로 주소(URL) 생성하기', related: ['호스팅', '웹앱'] },
    { id: 'dict-23', category: '연결과 자동화', name: '호스팅 (Hosting)', diff: '초급', summary: '내 웹앱이 인터넷에 항상 떠 있을 수 있도록 인터넷 서버의 한 공간을 빌리는 것', metaphor: '상가를 열 수 있도록 상가 건물 한 칸을 임대하는 일', eduExample: '만든 웹사이트 파일을 인터넷 서버 공간에 보관해 두기', related: ['배포', '서버'] },

    // 화면과 사용자
    { id: 'dict-24', category: '화면과 사용자', name: 'UI (User Interface)', diff: '초급', summary: '사용자가 접하는 화면의 버튼, 색상, 배치 등 눈에 보이는 인터페이스 디자인', metaphor: '자동차의 운전대, 대시보드 계기판, 페달 모양', eduExample: '유아들이 누르기 쉽게 큼직하고 알록달록한 동물 버튼 디자인', related: ['UX', '접근성', 'CSS'] },
    { id: 'dict-25', category: '화면과 사용자', name: 'UX (User Experience)', diff: '초급', summary: '사용자가 웹앱을 사용하면서 느끼는 편안함, 만족도, 효율성의 전체 경험', metaphor: '자동차 시트에 앉았을 때 느끼는 승차감과 편안한 느낌', eduExample: '버튼을 눌렀을 때 헷갈리지 않고 즉시 반응하여 아이들이 좋아하는 경험', related: ['UI', '접근성', '사용자 테스트'] },
    { id: 'dict-26', category: '화면과 사용자', name: '접근성 (Accessibility)', diff: '중급', summary: '시각, 청각, 인지 특성이 다른 유아나 특수학생도 제약 없이 이용할 수 있게 돕는 설계', metaphor: '휠체어 경사로와 점자 보도블록', eduExample: '글자를 모르는 유아를 위해 음성 읽기 기능과 대비가 명확한 아이콘 제공', related: ['UI', 'UX'] },
    { id: 'dict-27', category: '화면과 사용자', name: '사용자 흐름 (User Flow)', diff: '초급', summary: '사용자가 웹앱에 들어와서 목표(퀴즈 완주 등)를 이룰 때까지 거치는 화면 단계 경로', metaphor: '유치원 현관에서 교실, 물품함, 자기 자리까지 걸어가는 동선', eduExample: '[시작 화면] → [이름 입력] → [문제 풀기] → [결과 도장 받기]', related: ['UX', '와이어프레임'] },
    { id: 'dict-28', category: '화면과 사용자', name: '와이어프레임', diff: '초급', summary: '디자인 전에 스케치북이나 종이에 화면 구성을 선과 상자로 간단히 그려보는 연필 도면', metaphor: '집을 짓기 전 스케치북에 그리는 간이 평면도', eduExample: '종이에 네모 상자를 그리고 "여기는 룰렛, 아래는 시작 버튼" 표시하기', related: ['프로토타입', 'UI'] },
    { id: 'dict-29', category: '화면과 사용자', name: '프로토타입', diff: '중급', summary: '실제 완성 전, 주요 기능이 어떻게 작동하는지 시연해 보는 시험용 샘플 모델', metaphor: '자동차 양산 전 만드는 시험용 시제차', eduExample: '버튼 1개만 눌러지는 퀴즈 웹앱 시제품으로 미리 놀아보기', related: ['와이어프레임', '사용자 테스트'] },
    { id: 'dict-30', category: '화면과 사용자', name: '사용자 테스트', diff: '초급', summary: '실제 이용자(동료 교사, 유아)에게 쓰게 해보고 불편한 점이나 오류를 관찰하는 과정', metaphor: '새로운 요리를 내놓기 전 학급 아이들에게 시식 테스트해보기', eduExample: '만 5세 반 아이들에게 앱을 주어 버튼 위치가 너무 작은지 직접 관찰하기', related: ['UX', '프로토타입'] },

    // AI 작업
    { id: 'dict-31', category: 'AI 작업', name: '프롬프트 (Prompt)', diff: '초급', summary: 'AI에게 내가 원하는 웹앱, 화면, 기능을 만들어 달라고 전달하는 지시 문장', metaphor: '선생님이 AI 보조 교사에게 내리는 명확한 업무 요청서', eduExample: '"유치원 출석체크 웹앱을 만들어 줘. 이름 클릭 시 칭찬 소리가 나게 해줘."', related: ['컨텍스트', '에이전트'] },
    { id: 'dict-32', category: 'AI 작업', name: '컨텍스트 (Context)', diff: '중급', summary: 'AI가 정확한 대답이나 코드를 만들 수 있도록 미리 제공하는 대화 배경 지식과 코드 맥락', metaphor: '선생님이 AI에게 전달하는 유치원 교실 규칙 사전 정보', eduExample: 'AI에게 "우리는 Google Apps Script로 시트 1행에 데이터를 기록할 거야"라고 미리 맥락 알리기', related: ['프롬프트', '에이전트'] },
    { id: 'dict-33', category: 'AI 작업', name: '에이전트 (Agent)', diff: '중급', summary: '단순 대화를 넘어 사용자의 목표를 이룰 때까지 도구 실행과 수정을 자율 수행하는 AI 프로그래머', metaphor: '지시만 내리면 알아서 파일 열고 작업해 오는 스마트 조교', eduExample: 'Antigravity AI가 코드 오류를 찾아 스스로 수정하는 기능', related: ['MCP', '디버깅'] },
    { id: 'dict-34', category: 'AI 작업', name: '디버깅 (Debugging)', diff: '초급', summary: '웹앱이 제대로 작동하지 않을 때 원인이 되는 오류(버그)를 찾아 고치는 작업', metaphor: '교실 교구에서 고장 난 부품을 찾아 나사를 다시 조이는 정비 작업', eduExample: '버튼을 눌러도 반응이 없을 때 코드 에러 메시지를 확인하여 오타 수정하기', related: ['오류 로그', '에이전트'] },
    { id: 'dict-35', category: 'AI 작업', name: '오류 로그 (Error Log)', diff: '초급', summary: '프로그램이 실행되다가 고장 났을 때 발생 원인과 줄 번호를 기록해 둔 진단서', metaphor: '병원의 건강검진 진단 기록지', eduExample: '개발자 도구 콘솔창에 빨간 글씨로 뜨는 "Uncaught ReferenceError"', related: ['디버깅', '브라우저'] },
    { id: 'dict-36', category: 'AI 작업', name: '버전 관리 (Git)', diff: '중급', summary: '코드 변경 기록을 타임머신처럼 남겨 두어 문제가 생겼을 때 이전 상태로 돌아가는 기능', metaphor: '문서 작업 시 [최종], [진짜최종]으로 되돌리기 타임머신을 만드는 것', eduExample: '수정하다 화면이 깨지면 10분 전 잘 작동하던 코드로 복원하기', related: ['로컬 환경', '배포'] },
    { id: 'dict-37', category: 'AI 작업', name: '로컬 환경', diff: '초급', summary: '인터넷에 배포하기 전 선생님의 내 컴퓨터 안에서만 시험 구동하는 연습 공간', metaphor: '공개 발표 전 내 방 거울 앞에서 연습하는 공간', eduExample: 'http://localhost:8080/ 주소로 내 컴퓨터에서 미리 테스트해보기', related: ['클라우드 환경', '배포'] },
    { id: 'dict-38', category: 'AI 작업', name: '클라우드 환경', diff: '초급', summary: '내 컴퓨터가 아니라 인터넷상에 존재하는 고성능 서버 환경', metaphor: '어디서나 접근할 수 있는 중앙 인터넷 서랍장', eduExample: 'Google Drive, Vercel, Firebase 등 웹서버 장소', related: ['로컬 환경', '호스팅'] }
];

// 2. UI·UX 실전 도감 데이터 (47개 항목)
const vibeUiuxData = [
    // [탐색과 이동 - 7개]
    {
        id: 'ui-1', category: '탐색과 이동', diff: '초급', name: '상단 내비게이션 (Header Nav)',
        useCase: '웹앱 상단에서 주요 메뉴 간 빠른 이동이 필요할 때',
        caution: '메뉴 항목이 너무 많으면 모바일에서 겹치므로 3~5개로 제한합니다.',
        eduExample: '유치원 교실 포트폴리오 상단 [소개 | 수업자료 | 업무자동화] 메뉴',
        prompt: '상단에 로고와 4개 메뉴(소개, 수업, 업무, 문의)가 포함된 반응형 내비게이션 바를 만들어 주세요. 모바일에서는 햄버거 메뉴로 전환되게 해 주세요.',
        previewHtml: `<div class="mini-nav"><span class="brand">🐧 펭맘</span><div class="links"><span class="active">홈</span><span>수업</span><span>업무</span></div></div>`
    },
    {
        id: 'ui-2', category: '탐색과 이동', diff: '초급', name: '사이드바 (Sidebar)',
        useCase: '화면 좌측 또는 우측에 보조 메뉴 및 필터를 상시 노출할 때',
        caution: '모바일 화면에서는 화면을 가리지 않도록 슬라이딩 서랍 방식으로 만듭니다.',
        eduExample: '학급 서류 관리 시스템의 좌측 폴더 분류 트리 메뉴',
        prompt: '좌측에 아이콘과 함께 카테고리 목록이 들어가는 깔끔한 사이드바 메뉴를 작성해 주세요.',
        previewHtml: `<div class="mini-sidebar"><div class="item active">📁 전체자료</div><div class="item">🎨 캔바</div><div class="item">☁️ 구글</div></div>`
    },
    {
        id: 'ui-3', category: '탐색과 이동', diff: '초급', name: '탭 (Tabs)',
        useCase: '한 공간에서 관련 카테고리 간 화면 전환을 페이지 이동 없이 처리할 때',
        caution: '현재 선택된 탭이 명확하게 색상과 하이라이트로 구분되어야 합니다.',
        eduExample: '수업 준비물의 [만 3세 | 만 4세 | 만 5세] 탭 전환',
        prompt: '페이지 전환 없이 3개 탭(공부방, 작업실, 강의)을 클릭할 때 해당 내용만 보여주는 탭 UI를 만들어 주세요.',
        previewHtml: `<div class="mini-tabs"><button class="tab btn-primary-sm">공부방</button><button class="tab">작업실</button><button class="tab">강의</button></div>`
    },
    {
        id: 'ui-4', category: '탐색과 이동', diff: '중급', name: '브레드크럼 (Breadcrumb)',
        useCase: '사용자가 현재 깊은 메뉴 중 어느 위치에 있는지 경로를 보여 줄 때',
        caution: '단계 구분을 > 또는 / 기호로 명확히 표시합니다.',
        eduExample: '홈 > 유유아교육 > 프로젝트 수업 > 동화 놀이 자료실',
        prompt: '홈 > 카테고리 > 상세페이지 형태로 현재 사용자의 이동 위치를 보여주는 브레드크럼을 디자인해 주세요.',
        previewHtml: `<div class="mini-breadcrumb">홈 <span>&gt;</span> 유아교육 <span>&gt;</span> <strong>동화놀이</strong></div>`
    },
    {
        id: 'ui-5', category: '탐색과 이동', diff: '초급', name: '페이지네이션 (Pagination)',
        useCase: '자료나 목록이 수십 개 이상으로 많아 번호별로 나누어 보여 줄 때',
        caution: '이전/다음 버튼 크기를 충분히 크게 만들어 터치 오류를 방지합니다.',
        eduExample: '학급 활동 사진 100장을 10장씩 1, 2, 3페이지로 나눌 때',
        prompt: '1, 2, 3 번호 버튼과 [이전], [다음] 버튼이 있는 깔끔한 페이지네이션 하단 바를 만들어 주세요.',
        previewHtml: `<div class="mini-pagination"><button class="p-btn">&lt;</button><button class="p-btn active">1</button><button class="p-btn">2</button><button class="p-btn">3</button><button class="p-btn">&gt;</button></div>`
    },
    {
        id: 'ui-6', category: '탐색과 이동', diff: '중급', name: '단계 표시기 (Stepper)',
        useCase: '설문, 신청, 퀴즈처럼 순서대로 진행되는 절차의 진행률을 시각화할 때',
        caution: '현재 몇 단계에 있는지와 남아 있는 단계를 숫자로 보여 줍니다.',
        eduExample: '학부모 상담 예약 3단계 [날짜 선택 → 시간 선택 → 완료]',
        prompt: '1단계(기본정보) -> 2단계(세부선택) -> 3단계(완료) 순서의 단계 표시기 스텝 바를 제작해 주세요.',
        previewHtml: `<div class="mini-stepper"><div class="step done">1</div><div class="line done"></div><div class="step active">2</div><div class="line"></div><div class="step">3</div></div>`
    },
    {
        id: 'ui-7', category: '탐색과 이동', diff: '초급', name: '아코디언 (Accordion)',
        useCase: 'Q&A나 긴 세부 설명글을 접어 두었다가 클릭 시 펼쳐 보여 줄 때',
        caution: '제목 우측에 펼침/접힘 화살표(▼/▲) 아이콘을 꼭 넣어 줍니다.',
        eduExample: '자주 묻는 질문(FAQ) 및 펭맘 용어사전의 상세설명 보기',
        prompt: '제목을 클릭하면 아래 숨겨진 설명이 부드럽게 펼쳐지는 아코디언 컴포넌트를 만들어 주세요.',
        previewHtml: `<div class="mini-accordion"><div class="acc-header" onclick="this.nextElementSibling.classList.toggle('show')"><span>❓ 아코디언이란?</span><span>▼</span></div><div class="acc-body show">클릭하면 열리는 접이식 설명창입니다.</div></div>`
    },

    // [버튼과 동작 - 6개]
    {
        id: 'ui-8', category: '버튼과 동작', diff: '초급', name: '주요 버튼 (Primary Button)',
        useCase: '제출, 저장, 시작 등 가장 중요한 핵심 행동을 유도할 때',
        caution: '한 화면에 주요 버튼은 1~2개로 제한하여 시선을 집중시킵니다.',
        eduExample: '[퀴즈 시작하기], [설문 제출하기] 핵심 버튼',
        prompt: '라운드 처리된 파란색 톤의 돋보이는 주요 행동(CTA) 버튼을 작성해 주세요.',
        previewHtml: `<button class="vibe-btn-primary" onclick="alert('주요 버튼이 클릭되었습니다!')">🚀 시작하기</button>`
    },
    {
        id: 'ui-9', category: '버튼과 동작', diff: '초급', name: '보조 버튼 (Secondary Button)',
        useCase: '취소, 이전, 임시저장 등 보조적인 행동을 제공할 때',
        caution: '주요 버튼보다 눈에 띄지 않게 연한 배경색이나 테두리 스타일을 사용합니다.',
        eduExample: '[다시 풀기], [취소], [목록으로]',
        prompt: '주요 버튼 옆에 어울리는 회색 테두리의 보조 버튼을 만들어 주세요.',
        previewHtml: `<button class="vibe-btn-secondary" onclick="alert('보조 버튼이 클릭되었습니다!')">↩️ 취소하기</button>`
    },
    {
        id: 'ui-10', category: '버튼과 동작', diff: '초급', name: '아이콘 버튼 (Icon Button)',
        useCase: '글자 없이 돋보기, 설정, 닫기 등의 직관적 기호로 동작시킬 때',
        caution: '글자가 없으므로 누구나 아는 표준 아이콘을 쓰고 툴팁을 추가합니다.',
        eduExample: '🔍 (검색), ⚙️ (설정), ❌ (닫기)',
        prompt: '돋보기, 톱니바퀴, 프린트 모양의 아이콘 버튼 그룹을 만들어 주세요.',
        previewHtml: `<div class="mini-icon-btns"><button title="검색">🔍</button><button title="설정">⚙️</button><button title="프린트">🖨️</button></div>`
    },
    {
        id: 'ui-11', category: '버튼과 동작', diff: '중급', name: '플로팅 버튼 (Floating Action Button)',
        useCase: '스크롤을 내려도 화면 오른쪽 아래에 떠 있어 언제든 클릭할 때',
        caution: '본문 콘텐츠를 가리지 않도록 적절한 여백과 투명도를 고려합니다.',
        eduExample: '화면 맨 위로 올라가는 [▲ TOP] 버튼 또는 [문의하기] 톡버튼',
        prompt: '화면 우하단에 고정되어 스크롤 위로 이동시키는 동그란 플로팅 버튼을 만들어 주세요.',
        previewHtml: `<div class="mini-fab"><span>🔝</span></div>`
    },
    {
        id: 'ui-12', category: '버튼과 동작', diff: '초급', name: '버튼 그룹 (Button Group)',
        useCase: '관련된 선택지 버튼들을 하나로 붙여 그룹화할 때',
        caution: '버튼 사이 경계선을 깔끔하게 맞추고 선택된 버튼 상태를 강조합니다.',
        eduExample: '연령 선택 [만 3세 | 만 4세 | 만 5세] 통합 버튼',
        prompt: '3개의 선택 버튼이 하나로 이어진 라디오 스타일 버튼 그룹을 제작해 주세요.',
        previewHtml: `<div class="mini-btn-group"><button class="active">만 3세</button><button>만 4세</button><button>만 5세</button></div>`
    },
    {
        id: 'ui-13', category: '버튼과 동작', diff: '중급', name: '드롭다운 메뉴 (Dropdown Menu)',
        useCase: '버튼을 누르면 아래로 여러 하위 옵션 목록이 펼쳐질 때',
        caution: '목록이 화면 밖으로 넘가지 않게 방향을 제어합니다.',
        eduExample: '[자료 다운로드 ▼] 누르면 [PDF | 한글 | 이미지] 선택 목록 노출',
        prompt: '버튼 클릭 시 아래로 메뉴 항목이 열리는 드롭다운 선택 메뉴를 구현해 주세요.',
        previewHtml: `<div class="mini-dropdown"><button onclick="this.nextElementSibling.classList.toggle('show')">다운로드 ▼</button><div class="menu"><a href="#">PDF 저장</a><a href="#">이미지 저장</a></div></div>`
    },

    // [입력 요소 - 10개]
    {
        id: 'ui-14', category: '입력 요소', diff: '초급', name: '한 줄 입력창 (Input Text)',
        useCase: '이름, 제목, 검색어 등 짧은 텍스트를 입력받을 때',
        caution: '입력 안내 문구(placeholder)와 뚜렷한 포커스 테두리를 제공합니다.',
        eduExample: '유아 이름 입력창, 학생 학번 입력란',
        prompt: '플레이스홀더 문구가 포함된 깨끗한 한 줄 텍스트 입력창을 만들어 주세요.',
        previewHtml: `<input type="text" class="vibe-input" placeholder="유아 이름을 입력하세요">`
    },
    {
        id: 'ui-15', category: '입력 요소', diff: '초급', name: '여러 줄 입력창 (Textarea)',
        useCase: '상담 소감, 일지 작성, 상세 문의 등 긴 글을 입력받을 때',
        caution: '기본 높이를 충분히 주고 우측 하단 조절 손잡이가 잘 보이게 합니다.',
        eduExample: '교사 관찰 일력 기록란, 학부모 상담 메모',
        prompt: '3줄 이상 작성할 수 있는 여러 줄 입력상자(textarea)를 작성해 주세요.',
        previewHtml: `<textarea class="vibe-textarea" placeholder="오늘의 관찰 기록을 적어 주세요"></textarea>`
    },
    {
        id: 'ui-16', category: '입력 요소', diff: '초급', name: '검색창 (Search Input)',
        useCase: '키워드를 입력하면 목록이 실시간으로 필터링되게 할 때',
        caution: '좌측에 돋보기 아이콘, 우측에 입력 지우기(X) 버튼을 함께 둡니다.',
        eduExample: '용어사전 키워드 검색, 학습 자료실 검색',
        prompt: '돋보기 아이콘이 안에 들어간 검색 입력창 컴포넌트를 만들어 주세요.',
        previewHtml: `<div class="mini-search-box"><span>🔍</span><input type="text" placeholder="검색어를 입력하세요"></div>`
    },
    {
        id: 'ui-17', category: '입력 요소', diff: '초급', name: '선택 상자 (Select / Option)',
        useCase: '여러 옵션 중 1개를 목록에서 골라 선택하게 할 때',
        caution: '기본 첫 선택 항목으로 "선택하세요" 지침 문구를 넣습니다.',
        eduExample: '학급 반 선택 [1반 | 2반 | 3반], 학년 선택',
        prompt: '드롭다운 형태의 기본 <select> 선택 상자를 생성해 주세요.',
        previewHtml: `<select class="vibe-select"><option>반을 선택하세요</option><option>햇살반</option><option>열매반</option></select>`
    },
    {
        id: 'ui-18', category: '입력 요소', diff: '초급', name: '체크박스 (Checkbox)',
        useCase: '여러 항목 중 0개 이상 다중 선택이 가능할 때',
        caution: '글자 부분을 클릭해도 체크박스가 선택되도록 <label>로 감쌉니다.',
        eduExample: '준비물 체크리스트, 희망 연수 주제 다중 선택',
        prompt: '글자 클릭 시 선택되는 3개의 체크박스 리스트를 만들어 주세요.',
        previewHtml: `<div class="mini-checks"><label><input type="checkbox" checked> 🎨 미술도구</label><label><input type="checkbox"> 📖 동화책</label></div>`
    },
    {
        id: 'ui-19', category: '입력 요소', diff: '초급', name: '라디오 버튼 (Radio Button)',
        useCase: '여러 항목 중 반드시 오직 1개만 선택해야 할 때',
        caution: '체크박스와 달리 1개만 동시 선택된다는 점을 명확히 안내합니다.',
        eduExample: '퀴즈 객관식 정답 선택, 만족도 조사 [매우만족 | 보통 | 불만족]',
        prompt: '하나만 선택되는 라디오 버튼 그룹을 작성해 주세요.',
        previewHtml: `<div class="mini-radios"><label><input type="radio" name="r1" checked> ⭕ 예</label><label><input type="radio" name="r1"> ❌ 아니오</label></div>`
    },
    {
        id: 'ui-20', category: '입력 요소', diff: '초급', name: '토글 스위치 (Toggle Switch)',
        useCase: '설정의 ON/OFF 상태를 한 번의 클릭으로 직관적으로 바꿀 때',
        caution: '켜짐 상태일 때 브랜드 강조 색상으로 바뀌어야 합니다.',
        eduExample: '소리 효과음 ON/OFF, 다크모드 켜기/끄기',
        prompt: '클릭하면 ON/OFF가 스위치처럼 움직이는 토글 버튼을 제작해 주세요.',
        previewHtml: `<label class="mini-switch"><input type="checkbox" checked onclick="this.nextElementSibling.classList.toggle('active')"><span class="slider active"></span></label>`
    },
    {
        id: 'ui-21', category: '입력 요소', diff: '중급', name: '날짜 선택 (Date Picker)',
        useCase: '달력에서 연도, 월, 일을 간편하게 지정할 때',
        caution: '직접 타핑도 가능하고 달력 아이콘 클릭도 지원합니다.',
        eduExample: '상담 신청 날짜 선택, 제출 기한 설정',
        prompt: '달력 아이콘이 부착된 날짜 선택 입력 요소를 만들어 주세요.',
        previewHtml: `<input type="date" class="vibe-date" value="2026-07-26">`
    },
    {
        id: 'ui-22', category: '입력 요소', diff: '중급', name: '파일 업로드 (File Upload)',
        useCase: '이미지, 문서, 과제 파일 등을 첨부받을 때',
        caution: '드래그 앤 드롭 구역과 허용 용량 제한 안내를 함께 줍니다.',
        eduExample: '활동 사진 제출함, 서류 파일 첨부',
        prompt: '점선 테두리의 파일 드래그 앤 드롭 업로드 박스를 작성해 주세요.',
        previewHtml: `<div class="mini-file-upload">📁 클릭하여 파일 선택 또는 드래그</div>`
    },
    {
        id: 'ui-23', category: '입력 요소', diff: '중급', name: '슬라이더 (Slider / Range)',
        useCase: '볼륨, 인원수, 난이도 등 연속적인 수치를 드래그로 조절할 때',
        caution: '현재 슬라이더 위치의 숫자가 실시간으로 옆에 노출되게 합니다.',
        eduExample: '타이머 분 설정 (1분~30분 슬라이더)',
        prompt: '드래그하면 옆에 수치가 실시간으로 변하는 슬라이더 조절바를 만들어 주세요.',
        previewHtml: `<div class="mini-slider"><input type="range" min="1" max="10" value="5" oninput="this.nextElementSibling.innerText=this.value+'분'"><span>5분</span></div>`
    },

    // [정보 표현 - 9개]
    {
        id: 'ui-24', category: '정보 표현', diff: '초급', name: '카드 (Card)',
        useCase: '관련된 제목, 이미지, 설명을 하나의 입체적인 둥근 상자로 묶을 때',
        caution: '마우스 호버 시 약간 떠오르는 그림자 효과로 입체감을 줍니다.',
        eduExample: '수업 활동 개별 카드, 펭맘 포트폴리오 카드',
        prompt: '테두리와 그림자가 적용된 깔끔한 둥근 카드 컴포넌트를 만들어 주세요.',
        previewHtml: `<div class="mini-card"><h4>🎨 캔바 활용</h4><p>수업자료 빠른 제작</p></div>`
    },
    {
        id: 'ui-25', category: '정보 표현', diff: '초급', name: '목록 (List)',
        useCase: '항목들을 위에서 아래로 정돈하여 보여 줄 때',
        caution: 'bullet 점이나 아이콘을 줘서 줄 간 구분을 명확히 합니다.',
        eduExample: '오늘의 일과 순서, 수업 준비물 목록',
        prompt: '체크 아이콘이 불릿으로 들어간 깔끔한 리스트 스타일을 작성해 주세요.',
        previewHtml: `<ul class="mini-list"><li>✅ 1. 자유놀이</li><li>✅ 2. 정리정돈</li></ul>`
    },
    {
        id: 'ui-26', category: '정보 표현', diff: '중급', name: '표 (Table)',
        useCase: '행과 열로 이루어진 데이터를 정돈하여 나열할 때',
        caution: '모바일에서는 가로 스크롤이 생기도록 감싸 줍니다.',
        eduExample: '유아별 출석 및 활동 참여 현황표',
        prompt: '헤더 배경색이 구분되는 깔끔한 데이터 테이블을 디자인해 주세요.',
        previewHtml: `<table class="mini-table"><tr><th>이름</th><th>상태</th></tr><tr><td>김유아</td><td>출석</td></tr></table>`
    },
    {
        id: 'ui-27', category: '정보 표현', diff: '초급', name: '배지 (Badge)',
        useCase: '상태(신규, 인기, 완료)나 카테고리를 작게 돋보이게 붙일 때',
        caution: '글자 수가 너무 길어지지 않게 2~4글자 이내로 씁니다.',
        eduExample: '[인기], [신규], [완료], [초급]',
        prompt: '알록달록한 파스텔 톤의 카테고리 둥근 배지를 만들어 주세요.',
        previewHtml: `<div class="mini-badges"><span class="badge b-blue">신규</span><span class="badge b-green">완료</span></div>`
    },
    {
        id: 'ui-28', category: '정보 표현', diff: '초급', name: '태그 (Tag)',
        useCase: '해시태그나 연관 키워드를 묶어서 나타낼 때',
        caution: '# 기호를 붙이거나 배경색을 살짝 주어 키워드임을 알립니다.',
        eduExample: '#유아교육 #AI #에듀테크',
        prompt: '# 기호가 붙은 클릭 가능한 태그 클라우드 그룹을 작성해 주세요.',
        previewHtml: `<div class="mini-tags"><span>#유아교육</span><span>#AI</span></div>`
    },
    {
        id: 'ui-29', category: '정보 표현', diff: '중급', name: '툴팁 (Tooltip)',
        useCase: '마우스를 올리거나 터치할 때 용어의 간단한 도움말을 보여 줄 때',
        caution: '도움말 상자가 화면 밖으로 튀어나가지 않게 위치를 맞춥니다.',
        eduExample: '어려운 용어 단어 위에 마우스 올리면 쉬운 설명 노출',
        prompt: '마우스 호버 시 검은색 둥근 말풍선 도움말이 나오는 툴팁을 제작해 주세요.',
        previewHtml: `<div class="mini-tooltip-wrap"><span class="tip-target">API란? ❓</span><div class="tip-box">프로그램 간 연결 창구</div></div>`
    },
    {
        id: 'ui-30', category: '정보 표현', diff: '초급', name: '아바타 (Avatar)',
        useCase: '선생님이나 유아의 동그란 프로필 사진/캐릭터 이미지를 표시할 때',
        caution: '원형 테두리에 overflow:hidden 처리하여 동그랗게 잘라냅니다.',
        eduExample: '펭맘 헤더 프로필 이미지, 유아 출석부 사진',
        prompt: '테두리가 포함된 동그란 원형 프로필 아바타 이미지를 만들어 주세요.',
        previewHtml: `<div class="mini-avatar">🐧</div>`
    },
    {
        id: 'ui-31', category: '정보 표현', diff: '중급', name: '이미지 갤러리 (Gallery)',
        useCase: '여러 장의 수업 활동 사진을 그리드 격자로 보여 줄 때',
        caution: '이미지 비율이 깨지지 않게 object-fit: cover를 적용합니다.',
        eduExample: '미술 활동 작품 갤러리',
        prompt: '3열 썸네일 격자로 정돈된 이미지 갤러리 그리드를 만들어 주세요.',
        previewHtml: `<div class="mini-gallery"><div class="g-item">🖼️</div><div class="g-item">🎨</div><div class="g-item">📸</div></div>`
    },
    {
        id: 'ui-32', category: '정보 표현', diff: '중급', name: '타임라인 (Timeline)',
        useCase: '연도별 경력이나 프로젝트의 순서를 세로선으로 연결하여 보여 줄 때',
        caution: '왼쪽 세로선과 동그란 지점(dot)의 간격을 일정하게 맞춥니다.',
        eduExample: '펭맘 선생님의 걸어온 길 6단계 히스토리',
        prompt: '세로선과 원형 점으로 이어진 경력 타임라인 컴포넌트를 디자인해 주세요.',
        previewHtml: `<div class="mini-timeline"><div class="t-item"><div class="dot"></div><span>2026. AI 연수</span></div></div>`
    },

    // [알림과 상태 - 7개]
    {
        id: 'ui-33', category: '알림과 상태', diff: '초급', name: '알림 상자 (Alert Box)',
        useCase: '중요한 안내, 성공, 경고 메시지를 강조된 상자로 보여 줄 때',
        caution: '성공(초록), 경고(노랑), 오류(빨강) 등 색상으로 상태를 구분합니다.',
        eduExample: '✨ 팁 안내 상자, ⚠️ 주의사항 배너',
        prompt: '좌측 아이콘과 유색 배경이 적용된 경고/안내 메세지 상자를 작성해 주세요.',
        previewHtml: `<div class="mini-alert alert-info">💡 <strong>팁:</strong> 프롬프트는 구체적일수록 좋습니다.</div>`
    },
    {
        id: 'ui-34', category: '알림과 상태', diff: '중급', name: '토스트 메시지 (Toast Notice)',
        useCase: '복사 완료, 저장 성공 등 짧은 반응 알림이 우하단에 나타났다 사라질 때',
        caution: '3초 후 자동으로 사라지며 다른 작업을 방해하지 않게 만듭니다.',
        eduExample: '"프롬프트가 복사되었습니다!" 우하단 팝업 알림',
        prompt: '화면 아래쪽에 나타났다 2초 뒤 사라지는 토스트 알림을 만들어 주세요.',
        previewHtml: `<button class="vibe-btn-secondary" onclick="showVibeToast('📋 프롬프트가 복사되었습니다!')">토스트 테스트</button>`
    },
    {
        id: 'ui-35', category: '알림과 상태', diff: '중급', name: '모달 (Modal / Dialog)',
        useCase: '화면 위에 어두운 배경과 함께 새 대화 상자를 띄워 집중시킬 때',
        caution: '우측 상단 ❌ 닫기 버튼과 ESC 키로 닫히는 기능을 필수로 제공합니다.',
        eduExample: '작업물 상세 보기 팝업창, 퀴즈 정답 확인창',
        prompt: '어두운 딤 배경과 중앙 팝업창이 있는 모달 컴포넌트를 제작해 주세요.',
        previewHtml: `<button class="vibe-btn-primary" onclick="alert('모달 창 예시입니다.')">모달 열기</button>`
    },
    {
        id: 'ui-36', category: '알림과 상태', diff: '초급', name: '확인 대화창 (Confirm Dialog)',
        useCase: '삭제, 제출 등 되돌릴 수 없는 중요한 결정을 한 번 더 물을 때',
        caution: '[확인]과 [취소] 두 가지 명확한 선택 버튼을 줍니다.',
        eduExample: '"정말 기록을 삭제하시겠습니까?" 묻기',
        prompt: '[확인] [취소] 버튼이 포함된 경고 확인 창을 작성해 주세요.',
        previewHtml: `<div class="mini-confirm"><span>정말 삭제할까요?</span><div><button class="b-red">삭제</button><button>취소</button></div></div>`
    },
    {
        id: 'ui-37', category: '알림과 상태', diff: '초급', name: '진행률 표시줄 (Progress Bar)',
        useCase: '로드맵 진행률, 다운로드 등 얼마나 완료되었는지 채워진 바 형태로 보여 줄 때',
        caution: '채워진 백분율(%) 숫자를 바 안에 또는 옆에 명시합니다.',
        eduExample: '바이브코딩 공부방 학습 진행률 (60% 완료)',
        prompt: '파란색으로 채워지는 애니메이션 진행률 스틱 바를 만들어 주세요.',
        previewHtml: `<div class="mini-progress"><div class="fill" style="width: 70%;"></div></div>`
    },
    {
        id: 'ui-38', category: '알림과 상태', diff: '중급', name: '로딩 스피너 (Loading Spinner)',
        useCase: 'AI 답변 생성이나 자료를 불러오는 중임을 회전하는 링으로 보여 줄 때',
        caution: '사용자가 먹통으로 오해하지 않도록 "불러오는 중..." 문구를 함께 적습니다.',
        eduExample: 'AI 답변 생성 중 뱅글뱅글 도는 회전 링',
        prompt: '빙글빙글 회전하는 원형 로딩 스피너 애니메이션을 만들어 주세요.',
        previewHtml: `<div class="mini-spinner-wrap"><div class="spinner"></div><span>생성 중...</span></div>`
    },
    {
        id: 'ui-39', category: '알림과 상태', diff: '중급', name: '스켈레톤 화면 (Skeleton Screen)',
        useCase: '데이터가 도착하기 전 회색 블록으로 화면 형태를 미리 뼈대만 보여 줄 때',
        caution: '실제 완성될 화면 카드 모양과 유사한 크기의 뼈대를 만듭니다.',
        eduExample: '카드 뉴스 로딩 중 깜빡이는 회색 뼈대 상자',
        prompt: '은은하게 깜빡이는 회색 스켈레톤 로딩 바를 제작해 주세요.',
        previewHtml: `<div class="mini-skeleton"><div class="s-img"></div><div class="s-line"></div></div>`
    },

    // [교육용 UI - 8개]
    {
        id: 'ui-40', category: '교육용 UI', diff: '초급', name: '퀴즈 카드 (Quiz Card)',
        useCase: '질문 하나와 보기들을 카드 형태로 보여 주고 정답을 즉시 채점할 때',
        caution: '정답 선택 시 즉시 ⭕ 초록색 / ❌ 빨간색 피드백을 보여 줍니다.',
        eduExample: '동물 소리 맞히기 AI 단어 퀴즈',
        prompt: '문제 제목, 보기 4개, 정답 확인 기능이 포함된 퀴즈 카드 UI를 제작해 주세요.',
        previewHtml: `<div class="mini-quiz"><h5>Q. 멍멍 짖는 동물은?</h5><button onclick="alert('정답입니다! 🎉')">1. 강아지</button><button onclick="alert('다시 생각해 보세요!')">2. 고양이</button></div>`
    },
    {
        id: 'ui-41', category: '교육용 UI', diff: '중급', name: '랜덤 뽑기 (Random Spinner)',
        useCase: '발표자 지정, 학급 모둠 구성, 이벤트 당첨자를 랜덤 추첨할 때',
        caution: '빙글빙글 돌아가는 효과나 룰렛 애니메이션으로 긴장감을 높입니다.',
        eduExample: '오늘의 학급 주번/발표자 뽑기 룰렛',
        prompt: '버튼을 누르면 이름 목록 중 하나가 랜덤으로 튀어나오는 뽑기 UI를 만들어 주세요.',
        previewHtml: `<div class="mini-picker"><button class="vibe-btn-primary" onclick="const names=['김유아','이유아','박유아']; alert('당첨: '+names[Math.floor(Math.random()*3)])">🎲 발표자 뽑기</button></div>`
    },
    {
        id: 'ui-42', category: '교육용 UI', diff: '초급', name: '타이머 (Timer)',
        useCase: '자유놀이 시간, 발표 시간, 활동 잔여 시간을 시각적으로 카운트다운할 때',
        caution: '남은 시간이 1분 이하일 때 빨간색으로 바뀌어 주의를 줍니다.',
        eduExample: '정리정돈 5분 카운트다운 타이머',
        prompt: '시작, 일시정지, 리셋 버튼이 있는 디지털 분/초 카운트다운 타이머를 만드세요.',
        previewHtml: `<div class="mini-timer"><span class="t-num">03:00</span><button class="vibe-btn-secondary" onclick="alert('타이머가 시작되었습니다.')">▶</button></div>`
    },
    {
        id: 'ui-43', category: '교육용 UI', diff: '초급', name: '준비물 체크리스트 (Checklist)',
        useCase: '오늘 수업에 필요한 준비물을 체크하며 챙길 때',
        caution: '체크된 항목은 취소선(strikethrough)과 옅은 색으로 변경합니다.',
        eduExample: '미술 수업 준비물: 색종이, 풀, 가위 점검표',
        prompt: '체크 시 글자에 줄이 그어지는 준비물 점검 리스트 컴포넌트를 작성해 주세요.',
        previewHtml: `<div class="mini-checklist"><label><input type="checkbox" onchange="this.nextElementSibling.classList.toggle('done')"> <span>✂️ 안전 가위</span></label></div>`
    },
    {
        id: 'ui-44', category: '교육용 UI', diff: '초급', name: '칭찬 스티커판 (Sticker Board)',
        useCase: '유아의 착한 행동이나 활동 완료 시 스티커를 쾅 찍어 줄 때',
        caution: '스티커가 찍힐 때 뿅! 하는 시각 효과를 줍니다.',
        eduExample: '참 잘했어요! 10개 칭찬 도장 모음판',
        prompt: '칸을 누르면 칭찬 도장 아이콘이 들어차는 칭찬 스티커 모음판을 제작해 주세요.',
        previewHtml: `<div class="mini-stickers"><span onclick="this.innerText='⭐'">⚪</span><span onclick="this.innerText='⭐'">⚪</span><span onclick="this.innerText='⭐'">⚪</span></div>`
    },
    {
        id: 'ui-45', category: '교육용 UI', diff: '초급', name: '출석 체크 (Attendance UI)',
        useCase: '매일 아침 유아들이 스스로 자기 얼굴/이름을 눌러 출석을 기록할 때',
        caution: '출석 완료 시 "OO이 왔구나!" 음성/문구 피드백을 줍니다.',
        eduExample: '유치원 자율 등원 출석 체크판',
        prompt: '이름 카드를 누르면 출석 상태로 색상이 바뀌는 출석 체크판을 작성해 주세요.',
        previewHtml: `<div class="mini-attend"><button onclick="this.classList.toggle('present')">👦 햇살이 (등원)</button></div>`
    },
    {
        id: 'ui-46', category: '교육용 UI', diff: '중급', name: '학부모 안내 카드 (Notice Card)',
        useCase: '가정통신문, 행사 준비물 등 중요한 소식을 카드뉴스로 전할 때',
        caution: '가독성이 뛰어난 폰트 크기와 이미지 배치를 사용합니다.',
        eduExample: '여름 방학 돌봄 교실 운영 안내 카드',
        prompt: '상단 띠지 배지와 제목, 내용이 정돈된 학부모 소통용 안내 카드를 디자인해 주세요.',
        previewHtml: `<div class="mini-notice"><span class="n-tag">안내</span><h6>📢 현장체험학습 안내</h6></div>`
    },
    {
        id: 'ui-47', category: '교육용 UI', diff: '중급', name: '학생 포트폴리오 그리드 (Portfolio Grid)',
        useCase: '유아별 그림 작품, 프로젝트 결과를 모아 앨범처럼 보여 줄 때',
        caution: '학생 이름과 제작 날짜 태그를 함께 보여 줍니다.',
        eduExample: '우리들의 미술 작품 전시회 웹 앨범',
        prompt: '유아 이름 태그와 작품 썸네일이 정돈된 갤러리 카드를 작성해 주세요.',
        previewHtml: `<div class="mini-student-port"><div class="thumb">🎨</div><span>김유아 작품</span></div>`
    }
];

// 3. 작업실 데이터 (vibeProjectsData)
const vibeProjectsData = [
    {
        id: 'proj-1',
        title: '펭맘 선생님의 AI 미래교육 스페이스',
        problem: '유아교육, 특수교육, AI·에듀테크, 바이브코딩 활동과 강의 자료가 여러 곳에 흩어져 있어 교사들과 나누기 어려웠습니다.',
        features: '반응형 SPA 레이아웃, 메뉴별 포트폴리오, 바이브코딩 학습 포털, 47종 UI·UX 실전 도감, 동화 출간작 소개',
        tools: 'Antigravity, Claude Code, Codex / HTML / CSS / JavaScript',
        target: '유치원 및 특수교육 교사, 학부모, 연수 담당자',
        status: '제작 중',
        tags: ['Antigravity', 'Claude Code', 'Codex', 'HTML', 'CSS', 'JavaScript', '포트폴리오'],
        isFeatured: true,
        previewUrl: '#'
    },
    {
        id: 'proj-2',
        title: '학급용 룰렛 & 카운트다운 타이머',
        problem: '수업 및 발표자 뽑기 시 아이들의 흥미를 끌고 시간을 직관적으로 보여주는 간단한 도구가 필요했습니다.',
        features: '이름 목록 룰렛 뽑기, 분/초 카운트다운 타이머, 정답 폭죽 애니메이션 효과',
        tools: 'HTML / CSS / JavaScript',
        target: '유치원 및 초등 교실 유아/학생',
        status: '준비 중',
        tags: ['수업·놀이', '웹앱', '타이머'],
        isFeatured: false,
        previewUrl: null
    },
    {
        id: 'proj-3',
        title: 'Google Apps Script 유치원 업무 자동화',
        problem: '학부모 설문지 응답 및 상담 신청 자료를 수동으로 정리하는 반복 업무에 많은 시간이 소요되었습니다.',
        features: 'Google Forms 응답 시 Google Sheets 자동 정리, 상담 통지문 Docs 자동 발행',
        tools: 'Google Apps Script (.gs) / Sheets / Forms',
        target: '유치원 교사 업무 처리',
        status: '준비 중',
        tags: ['교사업무', '구글자동화', '.gs'],
        isFeatured: false,
        previewUrl: null
    },
    {
        id: 'proj-4',
        title: '무궁화 술래잡기 (모션인식 놀이)',
        problem: '전자칠판 앞에서 아이들이 몸을 움직이며 즐길 수 있는 전통 놀이 콘텐츠가 필요했습니다.',
        features: '웹캠 프레임 차이로 움직임 감지, 인원수만큼 자리 구역을 나눠 개인별 탈락 판정, 브라우저 음성합성(TTS)으로 실제 구호 낭독, 자체 제작 배경 멜로디, 10라운드 생존 성공 판정',
        tools: 'Claude Code / HTML / CSS / JavaScript / Web Speech API / Web Audio API',
        target: '유치원 및 초등 교실, 전자칠판 활용 수업',
        status: '공개',
        tags: ['수업·놀이', '웹앱', '모션인식'],
        isFeatured: false,
        icon: '🧊',
        previewUrl: 'games/mugunghwa-taggame/index.html'
    },
    {
        id: 'proj-5',
        title: '무궁화 바구니 (모션인식 놀이)',
        problem: '전자칠판·웹캠 앞에서 몸을 움직여 노는 간단한 미니게임으로 무궁화(국화) 소재를 활용한 놀이 콘텐츠가 필요했습니다.',
        features: '웹캠 프레임 차이로 손·몸 움직임을 추적해 바구니 좌우 이동, 떨어지는 무궁화 꽃잎 받기, 바구니 완성 애니메이션, 카메라가 없을 때 마우스·터치·키보드 조작으로 자동 전환',
        tools: 'Claude Code / HTML / CSS / JavaScript (Canvas API)',
        target: '유치원 및 초등 교실, 전자칠판 활용 수업',
        status: '공개',
        tags: ['수업·놀이', '웹앱', '모션인식'],
        isFeatured: false,
        icon: '🧺',
        previewUrl: 'games/mugunghwa-basket/index.html'
    }
];

// 4. 강의 커리큘럼 데이터 (8개 주제)
const vibeLecturesData = [
    {
        id: 'lec-1',
        title: '1. 교사를 위한 바이브코딩 첫걸음',
        diff: '초급',
        target: '코딩을 전혀 모르는 비전공자 유치원 및 학교 교사',
        outcome: '간단한 학급 안내 페이지 및 참여형 퀴즈 웹앱 완성',
        tools: 'Antigravity, Claude Code, Codex / ChatGPT / HTML / CSS',
        desc: '바이브코딩의 개념과 제작 흐름을 이해하고 AI와 대화하며 나만의 첫 웹앱을 만들어 보는 입문 강의'
    },
    {
        id: 'lec-2',
        title: '2. 나에게 필요한 교육 웹앱 기획하기',
        diff: '초급',
        target: '교실 및 업무에서 해결하고 싶은 아이디어가 있는 교사',
        outcome: '아이디어 구체화 기획서 및 와이어프레임 화면 설계',
        tools: 'Canva / 종이 스케치 / AI 프롬프팅',
        desc: '교실과 업무에서 해결하고 싶은 문제를 찾고 꼭 필요한 기능과 화면을 구체화하는 실전 기획 워크숍'
    },
    {
        id: 'lec-3',
        title: '3. Google Apps Script로 교사업무 자동화하기',
        diff: '중급',
        target: '구글 워크스페이스 반복 업무를 줄이고 싶은 교사',
        outcome: '설문 정리, 문서 자동 생성, 일정 알림 자동화 시스템',
        tools: 'Google Sheets / Forms / Docs / Apps Script (.gs)',
        desc: 'Google Sheets, Forms, Docs 등을 서로 연결하여 반복되는 행정 및 기록 업무를 자동화하는 실습'
    },
    {
        id: 'lec-4',
        title: '4. 수업용 퀴즈·룰렛·타이머 만들기',
        diff: '초급',
        target: '수업 시간에 아이들과 함께 쓸 흥미진진한 앱이 필요한 교사',
        outcome: '학급 발표자 뽑기 룰렛 & 카운트다운 타이머 웹앱',
        tools: 'AI 에이전트 / JavaScript / HTML',
        desc: '유아와 학생이 교실 태블릿이나 스마트보드에서 직접 사용할 수 있는 참여형 수업 웹앱 제작'
    },
    {
        id: 'lec-5',
        title: '5. 교사를 위한 UI·UX 기초',
        diff: '중급',
        target: '내가 만든 교육 앱을 아이들이 더 쉽게 쓰게 만들고 싶은 교사',
        outcome: '사용자 친화적 버튼, 색상, 레이아웃 개편 경험',
        tools: 'UI·UX 실전 도감 / CSS / 웹 접근성',
        desc: '예쁘기만 한 화면이 아니라 교사와 학생들이 직관적이고 편안하게 사용할 수 있는 화면 설계 기법'
    },
    {
        id: 'lec-6',
        title: '6. AI 코딩 파트너로 교육 홈페이지 만들기',
        diff: '중급',
        target: '자신의 교육 활동, 수업자료, 강의를 소개하고 싶은 교사',
        outcome: '개인 교육 포트폴리오 웹사이트 제작 및 공개',
        tools: 'Antigravity, Claude Code, Codex / HTML / CSS / GitHub Pages',
        desc: 'Antigravity, Claude Code, Codex 등 AI 코딩 파트너를 활용하여 나만의 멋진 개인 교육 브랜드 포트폴리오 사이트 완성'
    },
    {
        id: 'lec-7',
        title: '7. 학부모 소통과 기록 도구 만들기',
        diff: '중급',
        target: '가정통신문, 상담 신청, 유아 기록 관리를 개선하고 싶은 교사',
        outcome: '학부모 소통 카드뉴스 & 상담 기록 웹앱',
        tools: 'Canva / 웹폼 / 구글 연동',
        desc: '안내, 설문, 상담과 기록에 활용할 수 있는 유치원/학급 맞춤형 웹 소통 도구 기획 및 제작'
    },
    {
        id: 'lec-8',
        title: '8. 제작한 웹앱 배포와 관리 기초',
        diff: '중급',
        target: '만든 웹앱을 인터넷 주소로 공개하고 지속 관리하고 싶은 교사',
        outcome: '나만의 웹 주소(URL) 생성 및 유지관리 노하우 습득',
        tools: 'GitHub Pages / Vercel / 브라우저',
        desc: '내 컴퓨터 미리보기에서 끝내지 않고 실제 인터넷 웹 주소로 공개하고 수정 사항을 반영하는 배포 기초'
    }
];


// 5. 토스트 알림 함수
function showVibeToast(msg) {
    let toast = document.getElementById('vibeToastNotice');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'vibeToastNotice';
        toast.className = 'vibe-toast-notice';
        document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// 6. 바이브코딩 학습 포털 메인 제어 객체
window.VibePortal = {
    currentTab: 'vibe-study',
    uiPageSize: 12,
    uiCurrentCount: 12,

    init() {
        this.bindEvents();
        this.checkHash();
        this.renderRoadmapProgress();
        this.renderDictionary();
        this.renderUiux();
        this.renderProjects();
        this.renderLectures();
    },

    bindEvents() {
        // 내부 탭 버튼 이벤트
        const tabBtns = document.querySelectorAll('.vibe-subtab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetTab = btn.getAttribute('data-tab');
                this.switchTab(targetTab, true);
            });

            // 키보드 접근성 (Left/Right arrow)
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                    const btnsArr = Array.from(tabBtns);
                    let idx = btnsArr.indexOf(btn);
                    if (e.key === 'ArrowRight') idx = (idx + 1) % btnsArr.length;
                    if (e.key === 'ArrowLeft') idx = (idx - 1 + btnsArr.length) % btnsArr.length;
                    btnsArr[idx].focus();
                    btnsArr[idx].click();
                }
            });
        });

        // 해시 변경 감지
        window.addEventListener('hashchange', () => {
            this.checkHash();
        });

        // 용어사전 검색 & 필터
        const dictSearch = document.getElementById('dictSearchInput');
        if (dictSearch) {
            dictSearch.addEventListener('input', () => this.filterDictionary());
        }

        const dictCats = document.querySelectorAll('.dict-cat-btn');
        dictCats.forEach(b => {
            b.addEventListener('click', () => {
                dictCats.forEach(cb => cb.classList.remove('active'));
                b.classList.add('active');
                this.filterDictionary();
            });
        });

        const dictDiffs = document.querySelectorAll('.dict-diff-btn');
        dictDiffs.forEach(b => {
            b.addEventListener('click', () => {
                dictDiffs.forEach(cb => cb.classList.remove('active'));
                b.classList.add('active');
                this.filterDictionary();
            });
        });

        // UIUX 도감 검색 & 필터
        const uiSearch = document.getElementById('uiuxSearchInput');
        if (uiSearch) {
            uiSearch.addEventListener('input', () => this.filterUiux());
        }

        const uiCats = document.querySelectorAll('.uiux-cat-btn');
        uiCats.forEach(b => {
            b.addEventListener('click', () => {
                uiCats.forEach(cb => cb.classList.remove('active'));
                b.classList.add('active');
                this.filterUiux();
            });
        });

        const uiDiffs = document.querySelectorAll('.uiux-diff-btn');
        uiDiffs.forEach(b => {
            b.addEventListener('click', () => {
                uiDiffs.forEach(cb => cb.classList.remove('active'));
                b.classList.add('active');
                this.filterUiux();
            });
        });

        const uiFavToggle = document.getElementById('uiuxFavToggle');
        if (uiFavToggle) {
            uiFavToggle.addEventListener('click', () => {
                uiFavToggle.classList.toggle('active');
                this.filterUiux();
            });
        }

        const loadMoreBtn = document.getElementById('uiuxLoadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.uiCurrentCount += 12;
                this.filterUiux();
            });
        }

        // 작업실 필터
        const projCats = document.querySelectorAll('.proj-cat-btn');
        projCats.forEach(b => {
            b.addEventListener('click', () => {
                projCats.forEach(cb => cb.classList.remove('active'));
                b.classList.add('active');
                this.filterProjects();
            });
        });
    },

    checkHash() {
        const hash = window.location.hash;
        if (hash === '#vibe-study' || hash === '#vibe-projects' || hash === '#vibe-lectures') {
            const targetTab = hash.substring(1);
            this.switchTab(targetTab, false);
            // 바이브코딩 메인 메뉴로도 전환
            const navVibeBtn = document.querySelector('.nav-btn[data-target="sec-vibecoding"]');
            if (navVibeBtn) navVibeBtn.click();
        }
    },

    switchTab(tabId, updateHash = true) {
        this.currentTab = tabId;

        // 탭 버튼 선택 상태 변경
        const tabBtns = document.querySelectorAll('.vibe-subtab-btn');
        tabBtns.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            }
        });

        // 탭 패널 전환
        const tabPanels = document.querySelectorAll('.vibe-tab-panel');
        tabPanels.forEach(panel => {
            if (panel.id === tabId) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        if (updateHash) {
            history.replaceState(null, null, '#' + tabId);
        }
    },

    // --- 로드맵 진행률 ---
    renderRoadmapProgress() {
        const savedProgress = JSON.parse(localStorage.getItem('vibe_roadmap_progress') || '{}');
        const checkboxes = document.querySelectorAll('.roadmap-step-check');
        
        let completedCount = 0;
        checkboxes.forEach(cb => {
            const stepId = cb.getAttribute('data-step');
            if (savedProgress[stepId]) {
                cb.checked = true;
                completedCount++;
            } else {
                cb.checked = false;
            }

            cb.onchange = () => {
                savedProgress[stepId] = cb.checked;
                localStorage.setItem('vibe_roadmap_progress', JSON.stringify(savedProgress));
                this.renderRoadmapProgress();
            };
        });

        const percent = Math.round((completedCount / 7) * 100); // Step 0~6 총 7단계
        const fill = document.getElementById('roadmapProgressFill');
        const txt = document.getElementById('roadmapProgressText');
        if (fill) fill.style.width = percent + '%';
        if (txt) txt.innerText = `${percent}% 완료 (${completedCount}/7 단계)`;
    },

    // --- 용어사전 렌더링 & 필터링 ---
    renderDictionary() {
        this.filterDictionary();
    },

    filterDictionary() {
        const container = document.getElementById('dictGridContainer');
        if (!container) return;

        const query = (document.getElementById('dictSearchInput')?.value || '').toLowerCase().trim();
        const activeCat = document.querySelector('.dict-cat-btn.active')?.getAttribute('data-cat') || '전체';
        const activeDiff = document.querySelector('.dict-diff-btn.active')?.getAttribute('data-diff') || '전체';

        const filtered = vibeDictionaryData.filter(item => {
            const matchesQuery = !query || item.name.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query) || item.eduExample.toLowerCase().includes(query);
            const matchesCat = activeCat === '전체' || item.category === activeCat;
            const matchesDiff = activeDiff === '전체' || item.diff === activeDiff;
            return matchesQuery && matchesCat && matchesDiff;
        });

        if (filtered.length === 0) {
            container.innerHTML = `<div class="vibe-empty-box">🔍 검색 조건에 해당하는 용어가 없습니다.</div>`;
            return;
        }

        container.innerHTML = filtered.map(item => `
            <div class="dict-card" id="${item.id}">
                <div class="dict-header" onclick="this.parentElement.classList.toggle('open')">
                    <div class="dict-title-group">
                        <span class="dict-name">${item.name}</span>
                        <span class="badge b-cyan">${item.category}</span>
                        <span class="badge b-blue">${item.diff}</span>
                    </div>
                    <span class="dict-toggle-icon">▼</span>
                </div>
                <div class="dict-summary-short">${item.summary}</div>
                <div class="dict-details">
                    <div class="dict-detail-item">
                        <strong>💡 쉬운 비유:</strong> ${item.metaphor}
                    </div>
                    <div class="dict-detail-item">
                        <strong>🏫 교육 웹앱 활용 예:</strong> ${item.eduExample}
                    </div>
                    <div class="dict-detail-item">
                        <strong>🔗 관련 용어:</strong> ${item.related.map(r => `<span class="tag-sm">#${r}</span>`).join(' ')}
                    </div>
                </div>
            </div>
        `).join('');
    },

    // --- UIUX 실전 도감 렌더링 & 필터링 ---
    renderUiux() {
        this.filterUiux();
    },

    filterUiux() {
        const container = document.getElementById('uiuxGridContainer');
        if (!container) return;

        const query = (document.getElementById('uiuxSearchInput')?.value || '').toLowerCase().trim();
        const activeCat = document.querySelector('.uiux-cat-btn.active')?.getAttribute('data-cat') || '전체';
        const activeDiff = document.querySelector('.uiux-diff-btn.active')?.getAttribute('data-diff') || '전체';
        const isFavOnly = document.getElementById('uiuxFavToggle')?.classList.contains('active');
        const favs = JSON.parse(localStorage.getItem('vibe_fav_uis') || '[]');

        const filtered = vibeUiuxData.filter(item => {
            const matchesQuery = !query || item.name.toLowerCase().includes(query) || item.useCase.toLowerCase().includes(query) || item.eduExample.toLowerCase().includes(query);
            const matchesCat = activeCat === '전체' || item.category === activeCat;
            const matchesDiff = activeDiff === '전체' || item.diff === activeDiff;
            const matchesFav = !isFavOnly || favs.includes(item.id);
            return matchesQuery && matchesCat && matchesDiff && matchesFav;
        });

        const loadMoreBtn = document.getElementById('uiuxLoadMoreBtn');
        const displayed = filtered.slice(0, this.uiCurrentCount);

        if (loadMoreBtn) {
            if (filtered.length > this.uiCurrentCount) {
                loadMoreBtn.style.display = 'inline-flex';
                loadMoreBtn.innerText = `UI 더 보기 (${displayed.length} / ${filtered.length})`;
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }

        if (filtered.length === 0) {
            container.innerHTML = `<div class="vibe-empty-box">🎨 조건에 맞는 UI 요소가 없습니다.</div>`;
            return;
        }

        container.innerHTML = displayed.map(item => {
            const isFav = favs.includes(item.id);
            return `
                <div class="uiux-card" id="${item.id}">
                    <div class="uiux-card-header">
                        <div>
                            <h4>${item.name}</h4>
                            <div class="uiux-badges">
                                <span class="badge b-purple">${item.category}</span>
                                <span class="badge b-blue">${item.diff}</span>
                            </div>
                        </div>
                        <button class="fav-btn ${isFav ? 'active' : ''}" onclick="VibePortal.toggleFav('${item.id}', this)" title="즐겨찾기">
                            ${isFav ? '⭐' : '☆'}
                        </button>
                    </div>

                    <!-- 실시간 동작 미리보기 -->
                    <div class="uiux-preview-area">
                        ${item.previewHtml}
                    </div>

                    <div class="uiux-card-body">
                        <div class="uiux-info-row">
                            <strong>🎯 사용 시기:</strong> ${item.useCase}
                        </div>
                        <div class="uiux-info-row">
                            <strong>⚠️ 주의사항:</strong> ${item.caution}
                        </div>
                        <div class="uiux-info-row">
                            <strong>🏫 활용 예:</strong> ${item.eduExample}
                        </div>
                    </div>

                    <!-- 프롬프트 요청문 영역 -->
                    <div class="uiux-prompt-box">
                        <div class="uiux-prompt-title">
                            <span>🤖 AI 요청 프롬프트</span>
                            <button class="vibe-btn-copy" onclick="VibePortal.copyPrompt('${encodeURIComponent(item.prompt)}')">📋 복사</button>
                        </div>
                        <p class="uiux-prompt-text">${item.prompt}</p>
                    </div>
                </div>
            `;
        }).join('');
    },

    toggleFav(id, btn) {
        let favs = JSON.parse(localStorage.getItem('vibe_fav_uis') || '[]');
        if (favs.includes(id)) {
            favs = favs.filter(f => f !== id);
            btn.innerText = '☆';
            btn.classList.remove('active');
            showVibeToast('즐겨찾기에서 해제되었습니다.');
        } else {
            favs.push(id);
            btn.innerText = '⭐';
            btn.classList.add('active');
            showVibeToast('즐겨찾기에 추가되었습니다!');
        }
        localStorage.setItem('vibe_fav_uis', JSON.stringify(favs));
    },

    copyPrompt(encodedPrompt) {
        const text = decodeURIComponent(encodedPrompt);
        navigator.clipboard.writeText(text).then(() => {
            showVibeToast('📋 프롬프트가 클립보드에 복사되었습니다!');
        }).catch(() => {
            showVibeToast('복사에 실패했습니다. 수동으로 복사해 주세요.');
        });
    },

    // --- 펭맘의 작업실 렌더링 ---
    renderProjects() {
        this.filterProjects();
    },

    filterProjects() {
        const container = document.getElementById('projectsGridContainer');
        if (!container) return;

        const activeCat = document.querySelector('.proj-cat-btn.active')?.getAttribute('data-cat') || '전체';

        const filtered = vibeProjectsData.filter(p => {
            if (activeCat === '전체') return true;
            return p.tags.includes(activeCat);
        });

        let html = filtered.map(p => `
            <div class="project-item-card">
                <div class="project-img-placeholder">
                    <span class="p-icon">${p.icon || (p.isFeatured ? '🌟' : '🛠️')}</span>
                    <span class="p-status">${p.status}</span>
                </div>
                <div class="project-body">
                    <h4>${p.title}</h4>
                    <p class="project-problem"><strong>📌 목적:</strong> ${p.problem}</p>
                    <div class="canva-tag-group mt-auto">
                        ${p.tags.map(t => `<span class="tag-sm">#${t}</span>`).join(' ')}
                    </div>
                    <div class="project-actions">
                        <button class="vibe-btn-secondary" onclick="VibePortal.openProjectModal('${p.id}')">자세히 보기</button>
                        ${p.previewUrl && p.previewUrl !== '#' ? `<a href="${p.previewUrl}" target="_blank" class="vibe-btn-primary">미리보기</a>` : `<span class="status-tag disabled">공개 준비 중</span>`}
                    </div>
                </div>
            </div>
        `).join('');

        // 추가 준비 중 카드 안내
        html += `
            <div class="project-item-card placeholder-card">
                <div class="project-img-placeholder">
                    <span class="p-icon">⏳</span>
                    <span class="p-status">준비 중</span>
                </div>
                <div class="project-body">
                    <h4>작업물 정보를 준비하고 있습니다</h4>
                    <p class="project-problem">유치원 수업 도구 및 업무 자동화 프로젝트를 순차적으로 업로드 중입니다.</p>
                    <div class="project-actions">
                        <span class="status-tag disabled">공개 준비 중</span>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    },

    openProjectModal(id) {
        const proj = vibeProjectsData.find(p => p.id === id);
        if (!proj) return;

        const modal = document.getElementById('vibeProjectModal');
        const content = document.getElementById('vibeProjectModalContent');
        if (!modal || !content) return;

        content.innerHTML = `
            <h3>${proj.title}</h3>
            <p class="mb-12"><strong>상태:</strong> <span class="badge b-blue">${proj.status}</span></p>
            <div class="modal-sec">
                <strong>📌 해결하고 싶었던 문제:</strong>
                <p>${proj.problem}</p>
            </div>
            <div class="modal-sec">
                <strong>⚡ 주요 기능:</strong>
                <p>${proj.features}</p>
            </div>
            <div class="modal-sec">
                <strong>🛠️ 사용한 도구:</strong>
                <p>${proj.tools}</p>
            </div>
            <div class="modal-sec">
                <strong>👥 대상 사용자:</strong>
                <p>${proj.target}</p>
            </div>
        `;
        modal.classList.add('active');
    },

    closeProjectModal() {
        const modal = document.getElementById('vibeProjectModal');
        if (modal) modal.classList.remove('active');
    },

    // --- 바이브코딩 강의 렌더링 ---
    renderLectures() {
        const container = document.getElementById('vibeLecturesGrid');
        if (!container) return;

        container.innerHTML = vibeLecturesData.map(lec => `
            <div class="vibe-lecture-card">
                <div class="vibe-lec-header">
                    <h4>${lec.title}</h4>
                    <span class="badge b-purple">${lec.diff}</span>
                </div>
                <p class="vibe-lec-desc">${lec.desc}</p>
                <div class="vibe-lec-meta">
                    <div><strong>👥 추천 대상:</strong> ${lec.target}</div>
                    <div><strong>🎁 실습 결과물:</strong> ${lec.outcome}</div>
                    <div><strong>🛠️ 주요 도구:</strong> ${lec.tools}</div>
                    <div><strong>⏱️ 강의 시간:</strong> 기관과 협의 진행</div>
                </div>
                <a href="#sec-lectures" onclick="document.querySelector('.nav-btn[data-target=sec-lectures]').click()" class="vibe-btn-primary mt-12 text-center" style="display:block;">문의하기</a>
            </div>
        `).join('');
    }
};

// DOM 완료 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.VibePortal.init();
});
