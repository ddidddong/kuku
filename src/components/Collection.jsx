import React from 'react';
import { ChevronLeft, Lock } from 'lucide-react';

const CHARACTERS = [
    { table: 2, name: '이단의 토끼', emoji: '🐰', unlocked: true, color: '#ff8fa3' },
    { table: 3, name: '삼단의 고양이', emoji: '🐱', unlocked: true, color: '#4facfe' },
    { table: 4, name: '사단의 강아지', emoji: '🐶', unlocked: false, color: '#38bdf8' },
    { table: 5, name: '오단의 곰돌이', emoji: '🐻', unlocked: false, color: '#fcd34d' },
    { table: 6, name: '육단의 원숭이', emoji: '🐵', unlocked: false, color: '#ffb347' },
    { table: 7, name: '칠단의 사자', emoji: '🦁', unlocked: false, color: '#ff6b6b' },
    { table: 8, name: '팔단의 개구리', emoji: '🐸', unlocked: false, color: '#4ade80' },
    { table: 9, name: '구단의 공룡', emoji: '🦖', unlocked: false, color: '#a78bfa' },
];

export default function Collection({ onBack }) {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={onBack} style={styles.backButton}>
                    <ChevronLeft size={24} color="var(--color-primary)" />
                </button>
                <span style={styles.title}>캐릭터 도감</span>
                <div style={{ width: 24 }} />
            </div>

            <div style={styles.scrollArea}>
                <p style={styles.subtitle}>구구단을 외우고 친구들을 모아보세요!</p>
                <div style={styles.grid}>
                    {CHARACTERS.map((char) => (
                        <div
                            key={char.table}
                            style={{
                                ...styles.card,
                                backgroundColor: char.unlocked ? char.color + '20' : 'var(--bg-secondary)', // 20 is low opacity hex
                                borderColor: char.unlocked ? char.color : 'transparent',
                                opacity: char.unlocked ? 1 : 0.6
                            }}
                            className="animate-pop"
                        >
                            <div style={styles.cardHeader}>
                                <span className="font-number" style={{ color: char.unlocked ? char.color : 'var(--text-muted)' }}>
                                    {char.table}단
                                </span>
                                {!char.unlocked && <Lock size={16} color="var(--text-muted)" />}
                            </div>
                            <div style={styles.cardEmoji}>
                                {char.unlocked ? char.emoji : '❓'}
                            </div>
                            <div style={styles.cardName}>
                                {char.unlocked ? char.name : '???'}
                            </div>
                        </div>
                    ))}
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
        backgroundColor: '#fff',
        height: '100%',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
    },
    backButton: {
        padding: '0.5rem',
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius-full)',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: '700',
        color: 'var(--text-main)',
    },
    scrollArea: {
        flex: 1,
        overflowY: 'auto',
        padding: '1.5rem',
    },
    subtitle: {
        textAlign: 'center',
        color: 'var(--text-muted)',
        marginBottom: '2rem',
        fontWeight: '600'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        paddingBottom: '2rem'
    },
    card: {
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '2px solid',
        boxShadow: 'var(--shadow-sm)'
    },
    cardHeader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: '800',
        fontSize: '1.1rem'
    },
    cardEmoji: {
        fontSize: '3.5rem',
        margin: '1rem 0'
    },
    cardName: {
        fontWeight: '700',
        color: 'var(--text-main)',
        fontSize: '0.9rem'
    }
};
