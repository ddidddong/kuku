import React from 'react';

export default function ComboSystem({ combo }) {
    if (combo < 2) return <div style={styles.placeholder} />;

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
        <div key={combo} style={{ ...styles.container, color, transform: `scale(${scale})` }} className="animate-pop">
            {text}
        </div>
    );
}

const styles = {
    placeholder: {
        height: '40px',
        width: '100%'
    },
    container: {
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem',
        fontWeight: '800',
        textShadow: '1px 1px 0px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
    }
};
