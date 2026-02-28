import React from 'react';

export default function Home({ onSelectMode }) {
    return (
        <div style={styles.container} className="animate-pop-subtle">
            <div style={styles.header}>
                <div style={styles.villageIcon} className="animate-bounce-subtle">🕊️</div>
                <h1 style={styles.title}>구구단 빌리지</h1>
                <p style={styles.subtitle}>수학과 친해지는 조용한 시간</p>
            </div>

            <div style={styles.menuContainer}>
                <button
                    className="btn-neumorph"
                    style={styles.menuButton}
                    onClick={() => onSelectMode('addition')}
                >
                    <div style={{ ...styles.iconWrapper, color: 'var(--color-point-orange)' }}>＋</div>
                    <div style={styles.buttonText}>
                        <span style={styles.buttonTitle}>덧셈 팡팡</span>
                        <span style={styles.buttonDesc}>기초 수 개념 익히기</span>
                    </div>
                </button>

                <button
                    className="btn-neumorph"
                    style={styles.menuButton}
                    onClick={() => onSelectMode('multiplication')}
                >
                    <div style={{ ...styles.iconWrapper, color: 'var(--color-point-blue)' }}>×</div>
                    <div style={styles.buttonText}>
                        <span style={styles.buttonTitle}>구구단 톡톡</span>
                        <span style={styles.buttonDesc}>리듬감 있는 곱셈 학습</span>
                    </div>
                </button>

                <button
                    className="btn-neumorph"
                    style={styles.menuButton}
                    onClick={() => onSelectMode('bingo')}
                >
                    <div style={{ ...styles.iconWrapper, color: 'var(--color-semantic-mint)' }}>⊞</div>
                    <div style={styles.buttonText}>
                        <span style={styles.buttonTitle}>빙고 챌린지</span>
                        <span style={styles.buttonDesc}>혼합 연산 퍼즐 풀기</span>
                    </div>
                </button>

                <button
                    className="btn-neumorph"
                    style={styles.menuButton}
                    onClick={() => onSelectMode('canvas')}
                >
                    <div style={{ ...styles.iconWrapper, color: 'var(--text-muted)' }}>✎</div>
                    <div style={styles.buttonText}>
                        <span style={styles.buttonTitle}>나의 캔버스</span>
                        <span style={styles.buttonDesc}>학습 기록 그리기</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
        background: 'transparent',
        height: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        width: '100%'
    },
    header: {
        textAlign: 'center',
        marginBottom: '2.5rem'
    },
    villageIcon: {
        fontSize: '4rem',
        marginBottom: '0.8rem',
        display: 'inline-block',
        color: 'var(--text-main)'
    },
    title: {
        fontSize: '2.2rem',
        color: 'var(--text-main)',
        marginBottom: '0.3rem',
        fontWeight: '900',
        letterSpacing: '-1px'
    },
    subtitle: {
        color: 'var(--text-muted)',
        fontSize: '1rem',
        fontWeight: '600',
        letterSpacing: '-0.5px'
    },
    menuContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem'
    },
    menuButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '1.2rem 1.5rem',
        gap: '1.2rem',
        position: 'relative'
    },
    iconWrapper: {
        fontSize: '1.8rem',
        fontWeight: '900',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-paper-alt)'
    },
    buttonText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1
    },
    buttonTitle: {
        fontSize: '1.3rem',
        fontWeight: '800',
        marginBottom: '0.1rem',
        color: 'var(--text-main)'
    },
    buttonDesc: {
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        fontWeight: '600'
    }
};
