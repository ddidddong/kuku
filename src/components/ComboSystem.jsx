import React from 'react';

export default function ComboSystem({ combo }) {
    if (combo < 2) return null;

    // Dynamic style based on combo
    let color = 'var(--color-secondary)';
    let scale = 1;
    let text = `${combo} 콤보!`;

    if (combo >= 3) {
        color = 'var(--color-success)';
        scale = 1.1;
        text = `🔥 연속 ${combo}번!`;
    }
    if (combo >= 5) {
        color = 'var(--color-accent)';
        scale = 1.2;
        text = `✨ 대단해요! ${combo} 콤보! ✨`;
    }

    return (
        <div style={styles.absoluteWrapper}>
            <div key={combo} style={{ ...styles.container, color, transform: `scale(${scale})` }} className="animate-pop">
                {text}
            </div>
        </div>
    );
}

const styles = {
    absoluteWrapper: {
        position: 'absolute',
        top: '20%',
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
        pointerEvents: 'none'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem',
        fontWeight: '900',
        textShadow: '2px 2px 0px white',
        transition: 'all 0.3s ease',
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: '0.4rem 1.2rem',
        borderRadius: 'var(--radius-full)',
        border: '4px solid rgba(0,0,0,0.1)',
        boxShadow: 'var(--shadow-md)',
    }
};
