import React, { useState } from 'react';

export default function CanvasMode({ onBack }) {
    // 0: Empty, 1: Ground, 2: Tree, 3: Cloud, 4: Sun, 5: House
    const [progress, setProgress] = useState(0);

    const handleDraw = () => {
        if (progress < 5) {
            setProgress(prev => prev + 1);
        }
    };

    const handleReset = () => {
        setProgress(0);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>나의 캔버스</h3>
                <p style={styles.subtitle}>오늘의 학습을 끝내고 그림을 채워보세요.</p>
            </div>

            <div style={styles.canvasArea}>
                <div className="slot-neumorph" style={styles.canvasFrame}>
                    <svg viewBox="0 0 400 300" style={styles.svg}>

                        {/* 1. Ground */}
                        {progress >= 1 && (
                            <line x1="20" y1="250" x2="380" y2="250" stroke="var(--text-main)" strokeWidth="3" strokeLinecap="round" className="animate-pop-subtle" />
                        )}

                        {/* 2. Tree */}
                        {progress >= 2 && (
                            <g className="animate-pop-subtle" stroke="var(--text-main)" strokeWidth="3" strokeLinecap="round" fill="none">
                                <line x1="80" y1="250" x2="80" y2="150" />
                                <circle cx="80" cy="130" r="30" />
                                <circle cx="60" cy="150" r="20" />
                                <circle cx="100" cy="150" r="20" />
                            </g>
                        )}

                        {/* 3. Cloud */}
                        {progress >= 3 && (
                            <g className="animate-pop-subtle" stroke="var(--text-muted)" strokeWidth="3" strokeLinecap="round" fill="none">
                                <path d="M 250 80 Q 250 50 280 50 Q 320 50 320 80 Q 340 80 340 100 Q 340 120 310 120 L 250 120 Q 220 120 220 100 Q 220 80 250 80 Z" />
                            </g>
                        )}

                        {/* 4. Sun */}
                        {progress >= 4 && (
                            <g className="animate-pop-subtle" stroke="var(--color-point-orange)" strokeWidth="3" strokeLinecap="round" fill="none">
                                <circle cx="340" cy="40" r="25" />
                                <line x1="340" y1="5" x2="340" y2="10" />
                                <line x1="340" y1="70" x2="340" y2="75" />
                                <line x1="305" y1="40" x2="310" y2="40" />
                                <line x1="370" y1="40" x2="375" y2="40" />
                            </g>
                        )}

                        {/* 5. House */}
                        {progress >= 5 && (
                            <g className="animate-pop-subtle" stroke="var(--color-point-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
                                <rect x="180" y="170" width="100" height="80" />
                                <polygon points="170,170 230,120 290,170" />
                                <rect x="215" y="210" width="30" height="40" />
                                <circle cx="238" cy="230" r="2" fill="var(--color-point-blue)" />
                                <rect x="190" y="180" width="20" height="20" />
                                <rect x="250" y="180" width="20" height="20" />
                            </g>
                        )}

                    </svg>
                </div>
            </div>

            <div style={styles.actionArea}>
                <p style={styles.statusText}>
                    {progress < 5 ? `현재 진행률: ${progress}/5` : '🎉 그림 완성! 내일 또 만나요!'}
                </p>
                <div style={styles.btnRow}>
                    <button
                        className="btn-neumorph"
                        style={styles.drawBtn}
                        onClick={handleDraw}
                        disabled={progress >= 5}
                    >
                        오늘의 그림 얻기
                    </button>
                    <button
                        className="btn-neumorph"
                        style={styles.resetBtn}
                        onClick={handleReset}
                    >
                        초기화
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        padding: '2rem',
        textAlign: 'center',
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: '900',
        color: 'var(--text-main)',
        marginBottom: '0.5rem'
    },
    subtitle: {
        fontSize: '1rem',
        color: 'var(--text-muted)'
    },
    canvasArea: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 2rem'
    },
    canvasFrame: {
        width: '100%',
        maxWidth: '400px',
        aspectRatio: '4/3',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    svg: {
        width: '100%',
        height: '100%'
    },
    actionArea: {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        backgroundColor: 'rgba(249, 249, 247, 0.5)',
        borderTop: 'var(--border-thin)'
    },
    statusText: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'var(--text-main)'
    },
    btnRow: {
        display: 'flex',
        gap: '1rem'
    },
    drawBtn: {
        padding: '1rem 2rem',
        fontSize: '1.1rem',
        fontWeight: '900',
        color: 'var(--color-point-blue)',
    },
    resetBtn: {
        padding: '1rem 2rem',
        fontSize: '1.1rem',
        fontWeight: '900',
        color: 'var(--text-muted)',
    }
};
