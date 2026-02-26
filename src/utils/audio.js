// Simple Web Audio API Synthesizer for game sound effects

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const playTone = (frequency, type, duration, vol = 0.1) => {
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
};

export const playCorrectSound = () => {
    // Ding-dong (Major third)
    playTone(523.25, 'sine', 0.15, 0.2); // C5
    setTimeout(() => {
        playTone(659.25, 'sine', 0.4, 0.2); // E5
    }, 100);
};

export const playWrongSound = () => {
    // Buzz
    playTone(150, 'sawtooth', 0.3, 0.1);
};

export const playPopSound = () => {
    // Short pop for interactions
    playTone(800, 'sine', 0.1, 0.05);
};

export const playClearSound = () => {
    // Fanfare (C E G C)
    playTone(523.25, 'square', 0.1, 0.1); // C5
    setTimeout(() => playTone(659.25, 'square', 0.1, 0.1), 100); // E5
    setTimeout(() => playTone(783.99, 'square', 0.1, 0.1), 200); // G5
    setTimeout(() => playTone(1046.50, 'square', 0.4, 0.15), 300); // C6
};
