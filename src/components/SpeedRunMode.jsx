import React, { useState, useEffect } from 'react';
import { ChevronLeft, Clock, Zap } from 'lucide-react';
import ComboSystem from './ComboSystem';
import { playCorrectSound, playWrongSound, playClearSound, playPopSound } from '../utils/audio';

const TOTAL_QUESTIONS = 10;
const TIME_LIMIT = 30; // 30 seconds for 10 questions

const generateQuestion = () => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 9) + 1;
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (gameState !== 'playing' || !inputVal) return;

        playPopSound();

        if (parseInt(inputVal, 10) === currentQuestion.answer) {
            // Correct!
            playCorrectSound();
            const nextCount = questionCount + 1;
            setCombo(prev => prev + 1);
            setInputVal('');

            if (nextCount >= TOTAL_QUESTIONS) {
                playClearSound();
                setGameState('won');
            } else {
                setQuestionCount(nextCount);
                setCurrentQuestion(generateQuestion());
            }
        } else {
            // Wrong! Reset combo, maybe shake effect
            playWrongSound();
            setCombo(0);
            setInputVal('');
        }
    };

    const renderContent = () => {
        if (gameState === 'won') {
            return (
                <div style={styles.centerContent} className="animate-pop">
                    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🏆</div>
                    <h2 style={{ color: 'var(--color-success)', fontSize: '2rem' }}>성공!</h2>
                    <p>시간 안에 모두 맞혔어요!</p>
                    <button style={styles.primaryBtn} onClick={onBack}>돌아가기</button>
                </div>
            );
        }

        if (gameState === 'lost') {
            return (
                <div style={styles.centerContent} className="animate-pop">
                    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⏰</div>
                    <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem' }}>시간 초과!</h2>
                    <p>아쉽지만 다음에 다시 도전해요!</p>
                    <button style={styles.primaryBtn} onClick={onBack}>돌아가기</button>
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
                        <span style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>{questionCount} / {TOTAL_QUESTIONS}</span>
                    </div>
                </div>

                <ComboSystem combo={combo} />

                <div style={styles.questionBox}>
                    <span style={styles.number} className="font-number">{currentQuestion.a}</span>
                    <span style={styles.operator}>x</span>
                    <span style={styles.number} className="font-number">{currentQuestion.b}</span>
                    <span style={styles.operator}>=</span>
                </div>

                <form onSubmit={handleSubmit} style={styles.inputForm}>
                    <input
                        type="number"
                        autoFocus
                        style={styles.input}
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        className="font-number"
                        placeholder="정답"
                    />
                    <button type="submit" style={styles.submitBtn}>
                        <span style={styles.submitText}>OK</span>
                    </button>
                </form>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={onBack} style={styles.backButton}>
                    <ChevronLeft size={24} color="var(--color-primary)" />
                </button>
                <span style={styles.title}>스피드 런</span>
                <div style={{ width: 24 }} />
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
        padding: '0.5rem',
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius-full)',
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
        marginTop: '2rem',
        padding: '1rem 2rem',
        backgroundColor: 'var(--color-secondary)',
        color: '#fff',
        borderRadius: 'var(--radius-md)',
        fontSize: '1.2rem',
        boxShadow: 'var(--shadow-sm)'
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
    inputForm: {
        display: 'flex',
        gap: '1rem',
        marginTop: 'auto',
        marginBottom: '2rem'
    },
    input: {
        flex: 1,
        padding: '1rem',
        fontSize: '2.5rem',
        textAlign: 'center',
        borderRadius: 'var(--radius-md)',
        border: '4px solid var(--color-secondary)',
        outline: 'none',
        color: 'var(--text-main)',
        backgroundColor: '#fff'
    },
    submitBtn: {
        padding: '1rem 2rem',
        backgroundColor: 'var(--color-secondary)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 10px rgba(79, 172, 254, 0.3)',
        color: '#fff',
        border: '4px solid var(--color-secondary)'
    },
    submitText: {
        fontSize: '1.5rem',
        fontWeight: '800',
        fontFamily: 'var(--font-main)'
    }
};
