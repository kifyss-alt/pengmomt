/**
 * 우리나라 지도 퍼즐 (Korea Map Puzzle)
 * 유아 및 초등 저학년을 위한 드래그 앤 드롭 우리나라 8도 지도 맞추기 놀이
 */

// ------------------------------------------------------------------
// 1. 데이터: 전통 8도 기준 14개 조각 (남한 + 북한 포함)
//    points 좌표는 "원본(raw) 좌표"이며, 실제 렌더링 시 BOARD_OFFSET 만큼 이동해
//    정답판 위치를 만듭니다. 조각끼리 맞닿는 변은 좌표를 동일하게 맞춰
//    이어 붙였을 때 우리나라 모양 윤곽선이 그대로 나오도록 설계했습니다.
// ------------------------------------------------------------------

// 공용 경계 꼭짓점 (해안선 + 내륙 경계가 만나는 지점)
const V = {
    // --- 외곽 해안선(북→동→남→서 시계방향) ---
    b1: [60, 10], b2: [140, 0], b2b: [185, 8], b3: [230, 15], b4: [300, 45],
    b5: [355, 95], b6: [330, 155], b7: [348, 225], b8: [338, 295], b9: [358, 365],
    b10: [350, 445], b11: [338, 515], b12: [356, 555], b13: [334, 615], b14: [308, 665],
    b15: [268, 690], b16: [222, 684], b17: [192, 706], b18: [160, 684], b19: [112, 700],
    b20: [72, 678], b21: [42, 652], b22: [16, 628], b23: [32, 588], b24: [10, 538],
    b25: [36, 498], b26: [16, 448], b27: [4, 398], b28: [30, 358], b29: [26, 318],
    b30: [46, 288], b31: [34, 248], b32: [56, 208], b33: [20, 188], b34: [44, 153],
    b35: [34, 108], b36: [56, 68], b37: [30, 38],
    // --- 내륙 경계 교차점 ---
    q1: [200, 120], q2: [145, 175], q4: [250, 270], q5: [140, 285], q6: [150, 330],
    q7: [215, 335], q8: [225, 375], q9: [120, 400], q10: [280, 440], q11: [175, 470],
    q12: [240, 500], q13: [115, 510], q14: [285, 570], q15: [185, 600]
};

function pts(...keys) {
    return keys.map(k => V[k]);
}

const PROVINCES = [
    { id: 'pyeonganbuk', name: '평안북도', color: '#38bdf8',
        points: pts('b36', 'b37', 'b1', 'b2', 'b2b', 'q1', 'q2') },
    { id: 'hamgyeongbuk', name: '함경북도', color: '#2f9e44',
        points: pts('b2b', 'b3', 'b4', 'b5', 'b6', 'q1') },
    { id: 'hamgyeongnam', name: '함경남도', color: '#a5b4fc',
        points: pts('b6', 'b7', 'b8', 'q4', 'q2', 'q1') },
    { id: 'pyeongannam', name: '평안남도', color: '#fbbf24',
        points: pts('b34', 'b35', 'b36', 'q2', 'q4', 'q5') },
    { id: 'hwanghae', name: '황해도', color: '#ec4899',
        points: pts('b30', 'b31', 'b32', 'b33', 'b34', 'q5', 'q6') },
    { id: 'gyeonggi', name: '경기도', color: '#fde047',
        points: pts('b29', 'q6', 'q5', 'q4', 'q7', 'q8', 'q9') },
    { id: 'gangwon', name: '강원도', color: '#22c55e',
        points: pts('b8', 'b9', 'b10', 'b11', 'q10', 'q8', 'q7', 'q4') },
    { id: 'chungbuk', name: '충청북도', color: '#fb923c',
        points: pts('q8', 'q10', 'q12', 'q11', 'q9') },
    { id: 'chungnam', name: '충청남도', color: '#15803d',
        points: pts('b28', 'q9', 'q11', 'q13', 'b26', 'b27') },
    { id: 'jeonbuk', name: '전라북도', color: '#f472b6',
        points: pts('b25', 'q13', 'q11', 'q12', 'q14', 'q15', 'b24') },
    { id: 'gyeongbuk', name: '경상북도', color: '#3b82f6',
        points: pts('b11', 'b12', 'b13', 'q14', 'q12', 'q10') },
    { id: 'gyeongnam', name: '경상남도', color: '#7c3aed',
        points: pts('b13', 'b14', 'b15', 'b16', 'b17', 'q15', 'q14') },
    { id: 'jeonnam', name: '전라남도', color: '#f9a8d4',
        points: pts('b17', 'b18', 'b19', 'b20', 'b21', 'b22', 'b23', 'b24', 'q15') },
    { id: 'jeju', name: '제주도', color: '#f97316',
        points: [[140, 800], [180, 778], [225, 788], [245, 815], [220, 845], [165, 850], [125, 830]] }
];

const SVG_NS = 'http://www.w3.org/2000/svg';
const SNAP_TOLERANCE = 40;
const TAP_THRESHOLD = 6;
const BOARD_OFFSET = { x: 780, y: 40 };

// 조각 상자(트레이) 영역 - 각 조각의 실제 크기에 맞춰 겹치지 않게 자동 배치
const TRAY_BOUNDS = { x: 10, y: 40, width: 740 };
const TRAY_GAP = 18;

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

// ------------------------------------------------------------------
// 2. 좌표 계산 헬퍼
// ------------------------------------------------------------------
function toBoardPoints(rawPoints) {
    return rawPoints.map(([x, y]) => [x + BOARD_OFFSET.x, y + BOARD_OFFSET.y]);
}

function bboxCenter(points) {
    const xs = points.map(p => p[0]);
    const ys = points.map(p => p[1]);
    return [
        (Math.min(...xs) + Math.max(...xs)) / 2,
        (Math.min(...ys) + Math.max(...ys)) / 2
    ];
}

function pointsToAttr(points) {
    return points.map(p => p.join(',')).join(' ');
}

// 조각들의 실제 가로/세로 크기에 맞춰 줄바꿈하며 배치해 서로 겹치지 않게 함
function packTray(sizes) {
    let cursorX = TRAY_BOUNDS.x;
    let cursorY = TRAY_BOUNDS.y;
    let rowHeight = 0;
    const positions = [];

    sizes.forEach(({ width, height }) => {
        if (cursorX !== TRAY_BOUNDS.x && cursorX + width > TRAY_BOUNDS.x + TRAY_BOUNDS.width) {
            cursorX = TRAY_BOUNDS.x;
            cursorY += rowHeight + TRAY_GAP;
            rowHeight = 0;
        }
        positions.push([cursorX + width / 2, cursorY + height / 2]);
        cursorX += width + TRAY_GAP;
        rowHeight = Math.max(rowHeight, height);
    });

    return positions;
}

// ------------------------------------------------------------------
// 3. 보드(정답판) 및 조각 생성
// ------------------------------------------------------------------
function buildBoard() {
    PROVINCES.forEach(p => {
        const boardPts = toBoardPoints(p.points);
        const center = bboxCenter(boardPts);

        const poly = document.createElementNS(SVG_NS, 'polygon');
        poly.setAttribute('points', pointsToAttr(boardPts));
        poly.setAttribute('class', 'slot');
        poly.dataset.id = p.id;
        boardLayer.appendChild(poly);

        const text = document.createElementNS(SVG_NS, 'text');
        text.setAttribute('x', center[0]);
        text.setAttribute('y', center[1]);
        text.setAttribute('class', 'slot-label');
        text.textContent = p.name;
        boardLayer.appendChild(text);
    });
}

function buildPieces() {
    const sizes = PROVINCES.map(p => {
        const boardPts = toBoardPoints(p.points);
        const xs = boardPts.map(pt => pt[0]);
        const ys = boardPts.map(pt => pt[1]);
        return { width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys) };
    });
    const trayTargets = packTray(sizes);

    PROVINCES.forEach((p, i) => {
        const boardPts = toBoardPoints(p.points);
        const center = bboxCenter(boardPts);
        const trayTarget = trayTargets[i];
        const dx = trayTarget[0] - center[0];
        const dy = trayTarget[1] - center[1];

        const g = document.createElementNS(SVG_NS, 'g');
        g.setAttribute('class', 'piece');
        g.dataset.id = p.id;
        g.setAttribute('transform', `translate(${dx},${dy})`);
        g.setAttribute('tabindex', '0');
        g.setAttribute('role', 'button');
        g.setAttribute('aria-label', p.name + ' 조각');

        const poly = document.createElementNS(SVG_NS, 'polygon');
        poly.setAttribute('points', pointsToAttr(boardPts));
        poly.setAttribute('fill', p.color);
        poly.setAttribute('class', 'piece-shape');
        g.appendChild(poly);

        const text = document.createElementNS(SVG_NS, 'text');
        text.setAttribute('x', center[0]);
        text.setAttribute('y', center[1]);
        text.setAttribute('class', 'piece-label');
        text.textContent = p.name;
        g.appendChild(text);

        piecesLayer.appendChild(g);

        state.pieces.set(p.id, { el: g, dx, dy, homeDx: dx, homeDy: dy, solved: false });
        attachDrag(g, p);
    });
}

// ------------------------------------------------------------------
// 4. 드래그 앤 드롭 (포인터 이벤트: 마우스 + 터치 공용)
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

        const homeDistance = Math.hypot(pieceState.dx, pieceState.dy);
        if (homeDistance <= SNAP_TOLERANCE) {
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
// 5. 진행 상황 / 완료 처리
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
// 6. 컨트롤 버튼 (다시 섞기 / 이름 숨기기 / 정답 보기 / 소리)
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
        pieceState.dx = pieceState.homeDx + jitterX;
        pieceState.dy = pieceState.homeDy + jitterY;
        pieceState.solved = false;
        pieceState.el.classList.remove('solved');
        pieceState.el.setAttribute('transform', `translate(${pieceState.dx},${pieceState.dy})`);
    });
    updateProgress();
}

// ------------------------------------------------------------------
// 7. 소리 (Web Audio API - 외부 파일 없이 즉석 생성) + 한국어 음성 읽기
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
