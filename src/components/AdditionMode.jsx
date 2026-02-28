import React, { useState, useEffect } from 'react';

export default function AdditionMode({ onBack }) {
    const [level, setLevel] = useState(1); // 1: <10, 2: >10, 3: carry
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [options, setOptions] = useState([]);

    const generateQuestion = () => {
        let n1, n2;
        if (level === 1) { // 10 이하의 합
            n1 = Math.floor(Math.random() * 5) + 1;
            n2 = Math.floor(Math.random() * 4) + 1;
        } else if (level === 2) { // 두 자릿수 기초
            n1 = Math.floor(Math.random() * 10) + 10;
            n2 = Math.floor(Math.random() * 9) + 1;
        } else { // 받아올림
            n1 = Math.floor(Math.random() * 9) + 7;
            n2 = Math.floor(Math.random() * 9) + 6;
        }
        setNum1(n1);
        setNum2(n2);
        setAnswer('');
        setIsCorrect(null);

        // Generate choices
        const correctAns = n1 + n2;
        const opts = new Set([correctAns]);
        while (opts.size < 4) {
            let offset = Math.floor(Math.random() * 5) + 1;
            opts.add(Math.random() > 0.5 ? correctAns + offset : Math.abs(correctAns - offset));
        }
        setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    };

    useEffect(() => {
        generateQuestion();
    }, [level]);

    const handleSelectOption = (num) => {
        if (isCorrect) return; // already solved
        setAnswer(num);
        if (num === num1 + num2) {
            setIsCorrect(true);
            setTimeout(() => {
                generateQuestion();
            }, 1500);
        } else {
            setIsCorrect(false);
            setTimeout(() => setAnswer(''), 800);
        }
    };

    // Render Dot Particles
    const renderDots = (count) => {
        // limit dots to 20 visually for space, even if number is higher
        const displayCount = Math.min(count, 20);
        return (
            <div style={styles.dotContainer}>
                {Array.from({ length: displayCount }).map((_, i) => (
                    <div key={i} style={styles.dot} className="animate-pop-subtle" />
                ))}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            {/* Level Selector */}
            <div style={styles.levelSelector}>
                <button className={`btn-neumorph ${level === 1 ? 'active' : ''}`} style={level === 1 ? styles.levelBtnActive : styles.levelBtn} onClick={() => setLevel(1)}>1단계</button>
                <button className={`btn-neumorph ${level === 2 ? 'active' : ''}`} style={level === 2 ? styles.levelBtnActive : styles.levelBtn} onClick={() => setLevel(2)}>2단계</button>
                <button className={`btn-neumorph ${level === 3 ? 'active' : ''}`} style={level === 3 ? styles.levelBtnActive : styles.levelBtn} onClick={() => setLevel(3)}>3단계</button>
            </div>

            {/* Play Area */}
            <div style={styles.playArea}>
                <div style={styles.equationRow}>
                    <div style={styles.numberBox}>
                        <span className="font-number" style={styles.numberText}>{num1}</span>
                        {renderDots(num1)}
                    </div>

                    <span style={styles.operator}>+</span>

                    <div style={styles.numberBox}>
                        <span className="font-number" style={styles.numberText}>{num2}</span>
                        {renderDots(num2)}
                    </div>

                    <span style={styles.operator}>=</span>

                    <div style={{ ...styles.slot, ...(isCorrect === true ? styles.slotCorrect : isCorrect === false ? styles.slotWrong : {}) }} className="slot-neumorph">
                        <span className="font-number" style={{ ...styles.numberText, color: isCorrect ? 'var(--color-semantic-mint)' : isCorrect === false ? 'var(--color-semantic-coral)' : 'var(--color-point-blue)' }}>
                            {answer !== '' ? answer : '?'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Card & Slot UI (Bottom Options) */}
            <div style={styles.optionsArea}>
                {options.map((opt, i) => (
                    <button
                        key={i}
                        className="btn-neumorph"
                        style={styles.optionChip}
                        onClick={() => handleSelectOption(opt)}
                    >
                        <span className="font-number">{opt}</span>
                    </button>
                ))}
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
    levelSelector: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.8rem',
        padding: '1rem',
    },
    levelBtn: {
        padding: '0.5rem 1.2rem',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: 'var(--text-muted)'
    },
    levelBtnActive: {
        padding: '0.5rem 1.2rem',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: 'var(--color-point-orange)',
        boxShadow: 'var(--shadow-neumorph-in)',
        borderColor: 'transparent'
    },
    playArea: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
    },
    equationRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        justifyContent: 'center'
    },
    numberBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.8rem'
    },
    numberText: {
        fontSize: '3.5rem',
        color: 'var(--text-main)',
    },
    operator: {
        fontSize: '2.5rem',
        color: 'var(--text-muted)',
        fontWeight: '300'
    },
    dotContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        width: '60px',
        justifyContent: 'center'
    },
    dot: {
        width: '8px',
        height: '8px',
        backgroundColor: 'var(--line-color)',
        borderRadius: '50%'
    },
    slot: {
        width: '90px',
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.3s ease'
    },
    slotCorrect: {
        borderColor: 'var(--color-semantic-mint)',
        backgroundColor: 'rgba(72,197,168,0.05)'
    },
    slotWrong: {
        borderColor: 'var(--color-semantic-coral)',
        backgroundColor: 'rgba(255,138,138,0.05)',
        animation: 'bounce-subtle 0.3s ease'
    },
    optionsArea: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '2rem',
        borderTop: '1.5px solid var(--line-color)',
        backgroundColor: 'rgba(249, 249, 247, 0.5)'
    },
    optionChip: {
        width: '70px',
        height: '70px',
        fontSize: '2.2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--color-point-orange)',
    }
};
