import React, { useEffect, useState } from 'react';

const STICKERS = ['⭐', '💯', '✨', '🎉', '🌟', '🏆', '🎈', '👍'];

export default function StickerBurst({ onComplete }) {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate 30 random particles
        const newParticles = Array.from({ length: 30 }).map((_, i) => {
            const sticker = STICKERS[Math.floor(Math.random() * STICKERS.length)];
            const startX = 50; // center
            const startY = 50;

            const angle = (Math.random() * Math.PI * 2);
            const velocity = 20 + Math.random() * 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            const rot = (Math.random() - 0.5) * 720;

            return { id: i, sticker, startX, startY, tx, ty, rot };
        });

        setParticles(newParticles);

        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 2500); // Effect duration

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div style={styles.overlay}>
            <style>
                {`
          @keyframes burstOut {
            0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 1; }
            50% { opacity: 1; }
            100% { transform: translate(var(--tx), var(--ty)) scale(1.5) rotate(var(--rot)); opacity: 0; }
          }
          @keyframes fadeOverlay {
            0% { background-color: rgba(255, 255, 255, 0.4); }
            100% { background-color: rgba(255, 255, 255, 0); }
          }
        `}
            </style>
            <div style={styles.centerText} className="animate-pop">
                참 잘했어요!
            </div>
            {particles.map(p => (
                <div
                    key={p.id}
                    style={{
                        ...styles.particle,
                        left: `${p.startX}%`,
                        top: `${p.startY}%`,
                        '--tx': `${p.tx}vw`,
                        '--ty': `${p.ty}vh`,
                        '--rot': `${p.rot}deg`,
                        animation: 'burstOut 2s cubic-bezier(0.25, 1, 0.5, 1) forwards'
                    }}
                >
                    {p.sticker}
                </div>
            ))}
        </div>
    );
}

const styles = {
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // Allow clicks to pass through
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'fadeOverlay 2.5s forwards'
    },
    centerText: {
        fontSize: '3rem',
        fontWeight: '900',
        color: 'var(--color-primary)',
        textShadow: '0 4px 10px rgba(255,143,163,0.4), 0 0 20px #fff',
        zIndex: 10000
    },
    particle: {
        position: 'absolute',
        fontSize: '2.5rem',
        zIndex: 9999
    }
};
