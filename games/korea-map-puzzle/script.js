/**
 * 우리나라 지도 퍼즐 (Korea Map Puzzle)
 * 유아 및 초등 저학년을 위한 드래그 앤 드롭 우리나라 8도 지도 맞추기 놀이
 */

// ------------------------------------------------------------------
// 1. 데이터: 전통 8도 기준 14개 조각 (남한 + 북한 포함)
//    points 좌표는 보드(정답판) 위치 기준으로 이미 오프셋(+700, +40)이 반영되어 있습니다.
//    tray 값은 시작 시 조각이 놓이는 위치까지의 이동값(translate)입니다.
// ------------------------------------------------------------------
const PROVINCES = [
    {
        id: 'pyeonganbuk', name: '평안북도', color: '#38bdf8',
        points: [[760, 55], [850, 50], [910, 85], [925, 150], [890, 205], [810, 210], [755, 170], [720, 110]],
        label: [822, 130], tray: [-715, -20]
    },
    {
        id: 'hamgyeongbuk', name: '함경북도', color: '#2f9e44',
        points: [[930, 85], [1000, 55], [1070, 50], [1130, 80], [1180, 130], [1185, 190], [1130, 230], [1060, 215], [1000, 190], [940, 150]],
        label: [1050, 135], tray: [-770, -25]
    },
    {
        id: 'pyeongannam', name: '평안남도', color: '#fbbf24',
        points: [[725, 200], [810, 190], [890, 215], [915, 270], [890, 320], [820, 340], [750, 315], [710, 260]],
        label: [812, 265], tray: [-362, -155]
    },
    {
        id: 'hamgyeongnam', name: '함경남도', color: '#a5b4fc',
        points: [[980, 195], [1050, 180], [1130, 190], [1175, 240], [1170, 300], [1120, 350], [1050, 360], [990, 330], [965, 270]],
        label: [1070, 270], tray: [-480, -160]
    },
    {
        id: 'hwanghae', name: '황해도', color: '#ec4899',
        points: [[715, 330], [790, 320], [860, 340], [890, 380], [875, 430], [810, 450], [740, 435], [700, 390]],
        label: [797, 385], tray: [-687, -105]
    },
    {
        id: 'gangwon', name: '강원도', color: '#22c55e',
        points: [[915, 225], [1000, 215], [1080, 230], [1130, 270], [1165, 330], [1160, 390], [1140, 450], [1100, 500], [1040, 510], [980, 480], [950, 430], [930, 370], [900, 300]],
        label: [1032, 340], tray: [-752, -82]
    },
    {
        id: 'gyeonggi', name: '경기도', color: '#fde047',
        points: [[775, 435], [850, 430], [910, 450], [925, 490], [900, 530], [840, 540], [780, 520], [755, 480]],
        label: [842, 485], tray: [-392, -205]
    },
    {
        id: 'chungbuk', name: '충청북도', color: '#fb923c',
        points: [[925, 475], [990, 470], [1030, 500], [1025, 550], [990, 595], [940, 600], [915, 550], [915, 505]],
        label: [972, 535], tray: [-382, -255]
    },
    {
        id: 'chungnam', name: '충청남도', color: '#15803d',
        points: [[710, 525], [780, 520], [850, 530], [900, 550], [915, 590], [890, 625], [820, 630], [750, 610], [705, 570]],
        label: [810, 575], tray: [-700, -125]
    },
    {
        id: 'gyeongbuk', name: '경상북도', color: '#3b82f6',
        points: [[1005, 485], [1080, 480], [1150, 500], [1190, 550], [1185, 610], [1140, 655], [1070, 660], [1015, 635], [1000, 580], [1000, 525]],
        label: [1095, 570], tray: [-815, -120]
    },
    {
        id: 'jeonbuk', name: '전라북도', color: '#f472b6',
        points: [[730, 615], [800, 610], [870, 625], [920, 650], [925, 690], [880, 700], [810, 695], [755, 670], [725, 640]],
        label: [825, 655], tray: [-375, -205]
    },
    {
        id: 'gyeongnam', name: '경상남도', color: '#7c3aed',
        points: [[995, 645], [1070, 640], [1140, 655], [1185, 690], [1180, 725], [1120, 730], [1050, 715], [1000, 690]],
        label: [1090, 685], tray: [-500, -235]
    },
    {
        id: 'jeonnam', name: '전라남도', color: '#f9a8d4',
        points: [[710, 690], [790, 685], [860, 690], [920, 695], [965, 710], [960, 745], [910, 775], [840, 780], [770, 760], [710, 735]],
        label: [837, 730], tray: [-727, -110]
    },
    {
        id: 'jeju', name: '제주도', color: '#f97316',
        points: [[870, 820], [920, 810], [970, 825], [985, 850], [950, 868], [895, 870], [855, 855]],
        label: [920, 838], tray: [-640, -215]
    }
];

const SVG_NS = 'http://www.w3.org/2000/svg';
const SNAP_TOLERANCE = 42;
const TAP_THRESHOLD = 6;

const state = {
    solvedCount: 0,
    muted: false,
    namesHidden: false,
    pieces: new Map() // id -> { el, dx, dy, solved }
};

let svgEl, piecesLayer, boardLayer, progressText, progressFill, celebrateOverlay;

document.addEventListener('DOMContentLoaded', () => {
    svgEl = document.getElementById('puzzleSvg');
    piecesLayer = document.getElementById('piecesLayer');
    boardLayer = document.getElementById('boardLayer');
    progressText = document.getElementById('progressText');
    progressFill = document.getElementById('progressFill');
    celebrateOverlay = document.getElementById('celebrateOverlay');

    buildBoard();
    buildPieces();
    buildLegend();
    updateProgress();
    bindControls();
});

function buildLegend() {
    const grid = document.getElementById('legendGrid');
    if (!grid) return;
    PROVINCES.forEach(p => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `<span class="legend-dot" style="background:${p.color}"></span>${p.name}`;
        grid.appendChild(item);
    });
}

// ------------------------------------------------------------------
// 2. 보드(정답판) 및 조각 생성
// ------------------------------------------------------------------
function buildBoard() {
    PROVINCES.forEach(p => {
        const poly = document.createElementNS(SVG_NS, 'polygon');
        poly.setAttribute('points', p.points.map(pt => pt.join(',')).join(' '));
        poly.setAttribute('class', 'slot');
        poly.dataset.id = p.id;
        boardLayer.appendChild(poly);

        const text = document.createElementNS(SVG_NS, 'text');
        text.setAttribute('x', p.label[0]);
        text.setAttribute('y', p.label[1]);
        text.setAttribute('class', 'slot-label');
        text.textContent = p.name;
        boardLayer.appendChild(text);
    });
}

function buildPieces() {
    PROVINCES.forEach(p => {
        const g = document.createElementNS(SVG_NS, 'g');
        g.setAttribute('class', 'piece');
        g.dataset.id = p.id;
        g.setAttribute('transform', `translate(${p.tray[0]},${p.tray[1]})`);
        g.setAttribute('tabindex', '0');
        g.setAttribute('role', 'button');
        g.setAttribute('aria-label', p.name + ' 조각');

        const poly = document.createElementNS(SVG_NS, 'polygon');
        poly.setAttribute('points', p.points.map(pt => pt.join(',')).join(' '));
        poly.setAttribute('fill', p.color);
        poly.setAttribute('class', 'piece-shape');
        g.appendChild(poly);

        const text = document.createElementNS(SVG_NS, 'text');
        text.setAttribute('x', p.label[0]);
        text.setAttribute('y', p.label[1]);
        text.setAttribute('class', 'piece-label');
        text.textContent = p.name;
        g.appendChild(text);

        piecesLayer.appendChild(g);

        state.pieces.set(p.id, { el: g, dx: p.tray[0], dy: p.tray[1], solved: false });
        attachDrag(g, p);
    });
}

// ------------------------------------------------------------------
// 3. 드래그 앤 드롭 (포인터 이벤트: 마우스 + 터치 공용)
// ------------------------------------------------------------------
function attachDrag(g, province) {
    let dragging = false;
    let startClientX = 0, startClientY = 0;
    let startDx = 0, startDy = 0;
    let moved = 0;

    g.addEventListener('pointerdown', (e) => {
        const pieceState = state.pieces.get(province.id);
        piecesLayer.appendChild(g); // 맨 앞으로 가져오기

        startClientX = e.clientX;
        startClientY = e.clientY;
        startDx = pieceState.dx;
        startDy = pieceState.dy;
        moved = 0;
        dragging = !pieceState.solved;

        g.setPointerCapture(e.pointerId);
        e.preventDefault();
    });

    g.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const scale = getSvgScale();
        const deltaX = (e.clientX - startClientX) / scale;
        const deltaY = (e.clientY - startClientY) / scale;
        moved = Math.hypot(e.clientX - startClientX, e.clientY - startClientY);

        const pieceState = state.pieces.get(province.id);
        pieceState.dx = startDx + deltaX;
        pieceState.dy = startDy + deltaY;
        g.setAttribute('transform', `translate(${pieceState.dx},${pieceState.dy})`);
    });

    g.addEventListener('pointerup', (e) => {
        const pieceState = state.pieces.get(province.id);

        if (moved < TAP_THRESHOLD) {
            speakName(province.name);
            dragging = false;
            return;
        }

        if (!dragging) return;
        dragging = false;

        const distance = Math.hypot(pieceState.dx, pieceState.dy);
        if (distance <= SNAP_TOLERANCE) {
            pieceState.dx = 0;
            pieceState.dy = 0;
            pieceState.solved = true;
            g.setAttribute('transform', 'translate(0,0)');
            g.classList.add('solved', 'just-solved');
            setTimeout(() => g.classList.remove('just-solved'), 420);
            state.solvedCount++;
            playTone('correct');
            updateProgress();
            checkWin();
        } else {
            g.classList.add('shake');
            setTimeout(() => g.classList.remove('shake'), 350);
            playTone('wrong');
        }
    });
}

function getSvgScale() {
    const rect = svgEl.getBoundingClientRect();
    const viewBox = svgEl.viewBox.baseVal;
    return rect.width / viewBox.width;
}

// ------------------------------------------------------------------
// 4. 진행 상황 / 완료 처리
// ------------------------------------------------------------------
function updateProgress() {
    const total = PROVINCES.length;
    progressText.textContent = `${state.solvedCount} / ${total} 완성`;
    progressFill.style.width = `${(state.solvedCount / total) * 100}%`;
}

function checkWin() {
    if (state.solvedCount === PROVINCES.length) {
        setTimeout(() => {
            celebrateOverlay.classList.add('show');
            spawnConfetti();
            playTone('win');
            speakName('우리나라 지도를 모두 완성했어요. 참 잘했어요!');
        }, 350);
    }
}

function spawnConfetti() {
    const colors = PROVINCES.map(p => p.color);
    const container = document.getElementById('confettiLayer');
    container.innerHTML = '';
    for (let i = 0; i < 70; i++) {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.left = Math.random() * 100 + '%';
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.animationDuration = (2.2 + Math.random() * 1.6) + 's';
        el.style.animationDelay = (Math.random() * 0.6) + 's';
        el.style.width = el.style.height = (6 + Math.random() * 8) + 'px';
        container.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
    }
}

// ------------------------------------------------------------------
// 5. 컨트롤 버튼 (다시 섞기 / 이름 숨기기 / 정답 보기 / 소리)
// ------------------------------------------------------------------
function bindControls() {
    document.getElementById('resetBtn').addEventListener('click', resetPuzzle);

    document.getElementById('toggleNamesBtn').addEventListener('click', (e) => {
        state.namesHidden = !state.namesHidden;
        piecesLayer.classList.toggle('hide-labels', state.namesHidden);
        e.currentTarget.classList.toggle('active', state.namesHidden);
        e.currentTarget.textContent = state.namesHidden ? '🔤 이름 보이기' : '🙈 이름 숨기기';
    });

    document.getElementById('toggleAnswersBtn').addEventListener('click', (e) => {
        const showing = boardLayer.classList.toggle('show-answers');
        e.currentTarget.classList.toggle('active', showing);
    });

    document.getElementById('muteBtn').addEventListener('click', (e) => {
        state.muted = !state.muted;
        e.currentTarget.textContent = state.muted ? '🔇' : '🔊';
    });

    document.getElementById('playAgainBtn').addEventListener('click', () => {
        celebrateOverlay.classList.remove('show');
        resetPuzzle();
    });
}

function resetPuzzle() {
    state.solvedCount = 0;
    celebrateOverlay.classList.remove('show');
    PROVINCES.forEach(p => {
        const pieceState = state.pieces.get(p.id);
        const jitterX = (Math.random() - 0.5) * 24;
        const jitterY = (Math.random() - 0.5) * 24;
        pieceState.dx = p.tray[0] + jitterX;
        pieceState.dy = p.tray[1] + jitterY;
        pieceState.solved = false;
        pieceState.el.classList.remove('solved');
        pieceState.el.setAttribute('transform', `translate(${pieceState.dx},${pieceState.dy})`);
    });
    updateProgress();
}

// ------------------------------------------------------------------
// 6. 소리 (Web Audio API - 외부 파일 없이 즉석 생성) + 한국어 음성 읽기
// ------------------------------------------------------------------
let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx) audioCtx = new Ctx();
    }
    return audioCtx;
}

function playTone(type) {
    if (state.muted) return;
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = type === 'correct' ? [523.25, 659.25, 783.99]
        : type === 'win' ? [523.25, 659.25, 783.99, 1046.5]
        : [220, 174.6];

    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type === 'wrong' ? 'sawtooth' : 'sine';
        osc.frequency.value = freq;
        const start = now + i * (type === 'wrong' ? 0.09 : 0.1);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + (type === 'wrong' ? 0.16 : 0.28));
        osc.connect(gain).connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.32);
    });
}

function speakName(text) {
    if (state.muted) return;
    if (!('speechSynthesis' in window)) return;
    try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'ko-KR';
        utter.rate = 0.92;
        window.speechSynthesis.speak(utter);
    } catch (err) {
        // 음성 합성을 지원하지 않는 환경에서는 조용히 무시합니다.
    }
}
