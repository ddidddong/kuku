import React, { useState, useEffect } from 'react';
import { ChevronLeft, Clock, Zap } from 'lucide-react';
import ComboSystem from './ComboSystem';
import { playCorrectSound, playWrongSound, playClearSound, playPopSound } from '../utils/audio';

const TIME_LIMIT = 30; // 30 seconds

const generateQuestion = (prev = null) => {
    let a, b;
    do {
        a = Math.floor(Math.random() * 8) + 2;
        b = Math.floor(Math.random() * 9) + 1;
    } while (prev && a === prev.a && b === prev.b);
    return { a, b, answer: a * b };
};

export default function SpeedRunMode({ onBack }) {
    const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [questionCount, setQuestionCount] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
    const [inputVal, setInputVal] = useState('');
    const [combo, setCombo] = useState(0);

    // Timer logic
    useEffect(() => {
        if (gameState !== 'playing') return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameState('lost');
                    playWrongSound(); // Final buzz on loss
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameState]);

    const handleNumPress = (numStr) => {
        if (gameState !== 'playing') return;
        playPopSound();
        setInputVal(prev => prev.length < 3 ? prev + numStr : prev);
    };

    const handleDelPress = () => {
        if (gameState !== 'playing') return;
        playPopSound();
        setInputVal(prev => prev.slice(0, -1));
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        if (gameState !== 'playing' || !inputVal) return;

        playPopSound();

        if (parseInt(inputVal, 10) === currentQuestion.answer) {
            // Correct!
            playCorrectSound();
            const nextCount = questionCount + 1;
            setQuestionCount(nextCount);
            setCombo(prev => prev + 1);
            setInputVal('');
            setCurrentQuestion(prev => generateQuestion(prev));
        } else {
            // Wrong! Reset combo, maybe shake effect
            playWrongSound();
            setCombo(0);
            setInputVal('');
        }
    };

    const renderContent = () => {
        if (gameState === 'lost') {
            return (
                <div style={styles.centerContent} className="animate-pop">
                    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⏰</div>
                    <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem' }}>시간 종료!</h2>
                    <p style={{ fontSize: '1.2rem', margin: '1rem 0' }}>총 <span style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>{questionCount}</span>문제 맞혔어요!</p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={styles.secondaryBtn} onClick={onBack}>그만풀기</button>
                        <button style={styles.primaryBtn} onClick={() => {
                            setGameState('playing');
                            setTimeLeft(TIME_LIMIT);
                            setQuestionCount(0);
                            setCombo(0);
                            setCurrentQuestion(generateQuestion());
                        }}>다시하기</button>
                    </div>
                </div>
            );
        }

        return (
            <div style={styles.playArea}>
                <div style={styles.statsBar}>
                    <div style={styles.statBox}>
                        <Clock size={20} color="var(--color-secondary)" />
                        <span style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>{timeLeft}초</span>
                    </div>
                    <div style={styles.statBox}>
                        <span style={{ fontWeight: 'bold', color: 'var(--color-success)' }}>{questionCount}개 정답</span>
                    </div>
                </div>

                <ComboSystem combo={combo} />

                <div style={styles.questionBox}>
                    <span style={styles.number} className="font-number">{currentQuestion.a}</span>
                    <span style={styles.operator}>x</span>
                    <span style={styles.number} className="font-number">{currentQuestion.b}</span>
                    <span style={styles.operator}>=</span>
                </div>

                <div style={styles.inputDisplay} className="font-number text-shadow">
                    {inputVal || <span style={{ color: 'var(--bg-secondary)' }}>?</span>}
                </div>

                <div style={styles.numpad}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <button key={num} onClick={() => handleNumPress(num.toString())} style={styles.numBtn} className="font-number animate-pop">
                            {num}
                        </button>
                    ))}
                    <button onClick={handleDelPress} style={styles.delBtn}>지우기</button>
                    <button onClick={() => handleNumPress('0')} style={styles.numBtn} className="font-number animate-pop">0</button>
                    <button onClick={handleSubmit} style={styles.numpadSubmitBtn}>OK</button>
                </div>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={onBack} style={styles.backButton}>
                    <ChevronLeft size={20} />
                    <span style={{ marginLeft: '4px' }}>그만풀기</span>
                </button>
                <span style={styles.title}>스피드 런</span>
                <div style={{ width: 90 }} />
            </div>
            <div style={styles.content}>
                {renderContent()}
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
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius-full)',
        border: 'none',
        color: 'var(--color-primary)',
        fontWeight: 'bold',
        fontSize: '1rem',
        cursor: 'pointer'
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: '700',
        color: 'var(--text-main)',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    centerContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
    },
    primaryBtn: {
        padding: '1rem 1.5rem',
        backgroundColor: 'var(--color-secondary)',
        color: '#fff',
        borderRadius: 'var(--radius-md)',
        fontSize: '1.2rem',
        boxShadow: 'var(--shadow-sm)',
        fontWeight: 'bold'
    },
    secondaryBtn: {
        padding: '1rem 1.5rem',
        backgroundColor: 'var(--bg-secondary)',
        color: 'var(--text-main)',
        borderRadius: 'var(--radius-md)',
        fontSize: '1.2rem',
        fontWeight: 'bold'
    },
    playArea: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        gap: '2rem'
    },
    statsBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
    },
    statBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        backgroundColor: 'var(--bg-secondary)',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-full)',
        fontSize: '1.2rem'
    },
    questionBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        padding: '3rem 0',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
    },
    number: {
        fontSize: '4rem',
        color: 'var(--text-main)'
    },
    operator: {
        fontSize: '3rem',
        color: 'var(--text-muted)'
    },
    inputDisplay: {
        width: '100%',
        maxWidth: '300px',
        margin: '0 auto 1rem auto',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3.5rem',
        borderRadius: 'var(--radius-md)',
        border: '4px solid var(--color-secondary)',
        color: 'var(--color-secondary)',
        backgroundColor: '#fff',
    },
    numpad: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.8rem',
        width: '100%',
        maxWidth: '300px',
        margin: '0 auto auto auto'
    },
    numBtn: {
        backgroundColor: '#fff',
        border: '2px solid var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        padding: '0.8rem',
        fontSize: '2rem',
        color: 'var(--text-main)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    },
    delBtn: {
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'var(--color-secondary)',
        border: 'none',
    },
    numpadSubmitBtn: {
        backgroundColor: 'var(--color-secondary)',
        borderRadius: 'var(--radius-md)',
        fontSize: '1.5rem',
        fontWeight: '800',
        color: '#fff',
        border: 'none',
        boxShadow: 'var(--shadow-sm)',
    }
};
