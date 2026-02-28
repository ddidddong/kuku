import React, { useState, useEffect } from 'react';

export default function MultiplicationMode({ onBack }) {
    const [level, setLevel] = useState(2); // table 2~9
    const [num1, setNum1] = useState(2);
    const [num2, setNum2] = useState(1);
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [options, setOptions] = useState([]);

    const generateQuestion = (forcedLevel) => {
        const activeLevel = forcedLevel || level;
        const n1 = activeLevel;
        const n2 = Math.floor(Math.random() * 9) + 1;
        setNum1(n1);
        setNum2(n2);
        setAnswer('');
        setIsCorrect(null);

        // Generate choices
        const correctAns = n1 * n2;
        const opts = new Set([correctAns]);
        while (opts.size < 4) {
            let offset = Math.floor(Math.random() * 5) + 1;
            opts.add(Math.random() > 0.5 ? correctAns + offset : Math.abs(correctAns - offset));
        }
        setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    };

    useEffect(() => {
        generateQuestion(level);
    }, [level]);

    const handleSelectOption = (num) => {
        if (isCorrect) return; // already solved
        setAnswer(num);
        if (num === num1 * num2) {
            setIsCorrect(true);
            setTimeout(() => {
                generateQuestion();
            }, 1500);
        } else {
            setIsCorrect(false);
            setTimeout(() => setAnswer(''), 800);
        }
    };

    // Render Baskets and Apples (Soft Minimal Line Art)
    const renderVisuals = () => {
        // limit rows to avoid spilling, visual metaphor for N x M
        const displayGroups = Math.min(num2, 9);
        const dotsPerGroup = Math.min(num1, 9);

        return (
            <div style={styles.visualContainer}>
                {Array.from({ length: displayGroups }).map((_, i) => (
                    <div key={i} style={styles.basket} className="animate-pop-subtle">
                        <div style={styles.applesContainer}>
                            {Array.from({ length: dotsPerGroup }).map((_, j) => (
                                <div key={j} style={styles.apple} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            {/* Table Selector */}
            <div style={styles.tableSelector}>
                {[2, 3, 4, 5, 6, 7, 8, 9].map((tbl) => (
                    <button
                        key={tbl}
                        className={`btn-neumorph ${level === tbl ? 'active' : ''}`}
                        style={level === tbl ? styles.tableBtnActive : styles.tableBtn}
                        onClick={() => setLevel(tbl)}
                    >
                        {tbl}단
                    </button>
                ))}
            </div>

            {/* Play Area */}
            <div style={styles.playArea}>

                {/* Visual Representation Area */}
                <div style={styles.illustrationArea}>
                    {renderVisuals()}
                </div>

                <div style={styles.equationRow}>
                    <div style={styles.numberBox}>
                        <span className="font-number" style={styles.numberText}>{num1}</span>
                    </div>

                    <span style={styles.operator}>×</span>

                    <div style={styles.numberBox}>
                        <span className="font-number" style={styles.numberText}>{num2}</span>
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
    tableSelector: {
        display: 'flex',
        gap: '0.8rem',
        padding: '1rem',
        overflowX: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
    },
    tableBtn: {
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: 'var(--text-muted)',
        whiteSpace: 'nowrap'
    },
    tableBtnActive: {
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: 'var(--color-point-blue)',
        boxShadow: 'var(--shadow-neumorph-in)',
        borderColor: 'transparent',
        whiteSpace: 'nowrap'
    },
    playArea: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 2rem'
    },
    illustrationArea: {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2rem'
    },
    visualContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'center',
        maxWidth: '400px'
    },
    basket: {
        width: '45px',
        height: '40px',
        border: 'var(--border-thin)',
        borderTop: 'none',
        borderRadius: '0 0 16px 16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '4px',
        position: 'relative'
    },
    applesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '2px',
        width: '100%',
        padding: '0 4px'
    },
    apple: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-semantic-coral)'
    },
    equationRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        width: '100%',
        justifyContent: 'center',
        marginBottom: '2rem'
    },
    numberBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    slot: {
        width: '80px',
        height: '90px',
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
        gap: '1.2rem',
        padding: '2rem',
        borderTop: '1.5px solid var(--line-color)',
        backgroundColor: 'rgba(249, 249, 247, 0.5)'
    },
    optionChip: {
        width: '65px',
        height: '65px',
        fontSize: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--color-point-blue)',
    }
};
