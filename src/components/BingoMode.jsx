import React, { useState, useEffect } from 'react';

export default function BingoMode({ onBack }) {
    const [grid, setGrid] = useState([]); // 9 items { id, value, isMatched }
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [isBingo, setIsBingo] = useState(false);
    const [wrongCell, setWrongCell] = useState(null);

    // Initialize 3x3 Bingo
    const initGame = () => {
        // Generate 9 unique answers for tables 2~9
        const answers = new Set();
        const questionsPool = [];

        while (answers.size < 9) {
            const n1 = Math.floor(Math.random() * 8) + 2;
            const n2 = Math.floor(Math.random() * 9) + 1;
            const ans = n1 * n2;
            if (!answers.has(ans)) {
                answers.add(ans);
                questionsPool.push({ text: `${n1} × ${n2}`, answer: ans });
            }
        }

        const gridData = Array.from(answers).map((val, i) => ({
            id: i,
            value: val,
            isMatched: false
        })).sort(() => Math.random() - 0.5);

        setGrid(gridData);
        // pick random question from unmatched
        setCurrentQuestion(questionsPool[Math.floor(Math.random() * questionsPool.length)]);
        setIsBingo(false);
    };

    useEffect(() => {
        initGame();
    }, []);

    const checkBingo = (newGrid) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
            [0, 4, 8], [2, 4, 6]           // diags
        ];
        for (let line of lines) {
            if (line.every(idx => newGrid[idx].isMatched)) return true;
        }
        return false;
    };

    const handleCellClick = (cell) => {
        if (isBingo || cell.isMatched) return;

        if (cell.value === currentQuestion.answer) {
            // Correct!
            const newGrid = grid.map(c => c.id === cell.id ? { ...c, isMatched: true } : c);
            setGrid(newGrid);

            if (checkBingo(newGrid)) {
                setIsBingo(true);
            } else {
                // Next question based on unmatched
                const unmatched = newGrid.filter(c => !c.isMatched);
                if (unmatched.length > 0) {
                    const target = unmatched[Math.floor(Math.random() * unmatched.length)];
                    // reverse find a multiplication for this target
                    // for simplicity just find factors
                    let n1 = 2;
                    let n2 = target.value / 2;
                    for (let i = 2; i <= 9; i++) {
                        if (target.value % i === 0 && (target.value / i) <= 9) {
                            n1 = i;
                            n2 = target.value / i;
                            break;
                        }
                    }
                    setTimeout(() => {
                        setCurrentQuestion({ text: `${n1} × ${n2}`, answer: target.value });
                    }, 500);
                }
            }
        } else {
            // Wrong
            setWrongCell(cell.id);
            setTimeout(() => setWrongCell(null), 500);
        }
    };

    return (
        <div style={styles.container}>
            {/* White Confetti Overlay */}
            {isBingo && (
                <div className="confetti-overlay">
                    {Array.from({ length: 50 }).map((_, i) => {
                        const style = {
                            position: 'absolute',
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#fff',
                            top: '-10px',
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() + 0.5,
                            transform: `rotate(${Math.random() * 360}deg)`,
                            animation: `fall ${Math.random() * 3 + 2}s linear forwards`
                        };
                        return <div key={i} style={style} />;
                    })}
                    <style>{`
                        @keyframes fall {
                            to { transform: translateY(100vh) rotate(720deg); }
                        }
                    `}</style>
                </div>
            )}

            <div style={styles.questionArea}>
                <h3 style={styles.missionText}>이 숫자를 맞춰보세요!</h3>
                <div className="slot-neumorph" style={styles.questionBox}>
                    <span className="font-number" style={styles.questionValue}>
                        {isBingo ? '🎉 빙고!' : currentQuestion?.text || '...'}
                    </span>
                </div>
            </div>

            <div style={styles.boardArea}>
                <div style={styles.grid}>
                    {grid.map(cell => (
                        <button
                            key={cell.id}
                            className="btn-neumorph"
                            style={{
                                ...styles.cellBtn,
                                ...(cell.isMatched ? styles.cellMatched : {}),
                                ...(wrongCell === cell.id ? styles.cellWrong : {})
                            }}
                            onClick={() => handleCellClick(cell)}
                        >
                            <span className="font-number" style={{
                                color: cell.isMatched ? '#fff' : 'var(--color-point-blue)',
                                fontSize: '2.5rem'
                            }}>
                                {cell.value}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {isBingo && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <button className="btn-neumorph" style={styles.replayBtn} onClick={initGame}>
                        다시 하기
                    </button>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    questionArea: {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    },
    missionText: {
        fontSize: '1.2rem',
        color: 'var(--text-muted)',
        fontWeight: 'bold'
    },
    questionBox: {
        padding: '1.5rem 3rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionValue: {
        fontSize: '3rem',
        color: 'var(--text-main)',
        letterSpacing: '2px'
    },
    boardArea: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.2rem',
        padding: '2rem',
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 'var(--radius-lg)',
        border: 'var(--border-thin)'
    },
    cellBtn: {
        width: '80px',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.3s ease'
    },
    cellMatched: {
        backgroundColor: 'var(--color-semantic-mint)',
        boxShadow: 'var(--shadow-neumorph-in)',
        border: 'none',
        transform: 'scale(0.95)'
    },
    cellWrong: {
        backgroundColor: 'var(--color-semantic-coral)',
        animation: 'bounce-subtle 0.3s ease'
    },
    replayBtn: {
        padding: '1rem 2rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'var(--color-point-orange)'
    }
};
