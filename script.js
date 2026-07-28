/**
 * 펭맘 선생님의 AI미래교육 스페이스 - 스크립트 (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. 요소 참조
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const mobileBackdrop = document.getElementById('mobileBackdrop');

    /**
     * 2. 메뉴 전환 (오른쪽 본문 교체) 기능
     */
    function switchSection(targetId) {
        // 모든 본문 섹션 숨기기
        contentSections.forEach(section => {
            section.classList.remove('active');
        });

        // 지정된 대상 섹션 보이기
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // 모든 네비게이션 버튼 비활성화 및 선택된 버튼 활성화
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-target') === targetId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 모바일 화면의 경우 상단으로 스크롤
        if (window.innerWidth <= 768) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // 모바일 메뉴 닫기
            closeMobileMenu();
        }
    }

    // 메뉴 버튼 클릭 이벤트 리스너 등록
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = btn.getAttribute('data-target');
            if (targetId) {
                switchSection(targetId);
            }
        });
    });

    /**
     * 3. 모바일 서랍 메뉴 열기 / 닫기 기능
     */
    function openMobileMenu() {
        sidebar.classList.add('open');
        mobileBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden'; // 화면 스크롤 방지
    }

    function closeMobileMenu() {
        sidebar.classList.remove('open');
        mobileBackdrop.classList.remove('active');
        document.body.style.overflow = ''; // 화면 스크롤 해제
    }

    // 햄버거 버튼 클릭 -> 메뉴 열기
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openMobileMenu);
    }

    // 닫기 버튼 클릭 -> 메뉴 닫기
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', closeMobileMenu);
    }

    // 배경 어두운 부분 클릭 -> 메뉴 닫기
    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', closeMobileMenu);
    }

    // 키보드 ESC 누를 시 모바일 메뉴 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    console.log('펭맘 선생님의 AI미래교육 스페이스 시제품이 성공적으로 로드되었습니다.');
});
