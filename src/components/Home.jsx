import React from 'react';
import { Play, Zap, Grid } from 'lucide-react';

export default function Home({ onSelectMode }) {
    return (
        <div style={styles.container} className="animate-pop">
            <div style={styles.header}>
                <div style={styles.villageIcon} className="animate-float">🏡</div>
                <h1 style={styles.title} className="font-number">구구단 빌리지</h1>
                <p style={styles.subtitle}>재미있게 구구단을 배워보아요!</p>
            </div>

            <div style={styles.menuContainer}>
                <button
                    style={{ ...styles.menuButton, backgroundColor: 'var(--color-primary)' }}
                    onClick={() => onSelectMode('missing_number')}
                >
                    <div style={styles.iconWrapper}><Play size={32} color="var(--color-primary)" /></div>
                    <div style={styles.buttonText}>
                        <span style={styles.buttonTitle}>빈칸 채우기</span>
                        <span style={styles.buttonDesc}>마을을 예쁘게 꾸며요!</span>
                    </div>
                </button>

                <button
                    style={{ ...styles.menuButton, backgroundColor: 'var(--color-secondary)' }}
                    onClick={() => onSelectMode('speed_run')}
                >
                    <div style={styles.iconWrapper}><Zap size={32} color="var(--color-secondary)" /></div>
                    <div style={styles.buttonText}>
                        <span style={styles.buttonTitle}>스피드 런</span>
                        <span style={styles.buttonDesc}>빠르게 맞혀봐요!</span>
                    </div>
                </button>

                <button
                    style={{ ...styles.menuButton, backgroundColor: 'var(--color-accent)' }}
                    onClick={() => onSelectMode('collection')}
                >
                    <div style={styles.iconWrapper}><Grid size={32} color="var(--color-accent)" /></div>
                    <div style={styles.buttonText}>
                        <span style={styles.buttonTitle}>캐릭터 도감</span>
                        <span style={styles.buttonDesc}>내가 모은 친구들</span>
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
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, #fff 100%)',
        height: '100%'
    },
    header: {
        textAlign: 'center',
        marginBottom: '3rem'
    },
    villageIcon: {
        fontSize: '5rem',
        marginBottom: '1rem',
        display: 'inline-block'
    },
    title: {
        fontSize: '2.5rem',
        color: 'var(--color-primary)',
        marginBottom: '0.5rem',
        textShadow: '2px 2px 0px rgba(255,143,163,0.2)'
    },
    subtitle: {
        color: 'var(--text-muted)',
        fontSize: '1.1rem',
        fontWeight: '600'
    },
    menuContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    menuButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '1.2rem',
        borderRadius: 'var(--radius-md)',
        color: 'white',
        boxShadow: 'var(--shadow-md)',
        gap: '1rem'
    },
    iconWrapper: {
        backgroundColor: 'white',
        borderRadius: 'var(--radius-sm)',
        padding: '0.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    buttonTitle: {
        fontSize: '1.4rem',
        fontWeight: '800',
        marginBottom: '0.2rem'
    },
    buttonDesc: {
        fontSize: '0.9rem',
        opacity: 0.9,
        fontWeight: '600'
    }
};
