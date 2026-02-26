import React, { useState, useEffect } from 'react';
import { ChevronLeft, Star } from 'lucide-react';
import StickerBurst from './StickerBurst';
import { playCorrectSound, playWrongSound, playClearSound, playPopSound } from '../utils/audio';

// Helpers for game logic
const generateQuestion = () => {
    const a = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const b = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const result = a * b;
    const answer = b; // We are hiding 'b'

    // Generate choices
    const choices = new Set([answer]);
    while (choices.size < 4) {
        const wrong = Math.floor(Math.random() * 9) + 1;
        if (wrong !== answer) choices.add(wrong);
    }

    return {
        a,
        answer,
        result,
        choices: Array.from(choices).sort(() => Math.random() - 0.5)
    };
};

const VILLAGE_ITEMS = ['🌳', '🌷', '🏠', ' fences?', '🐶', '🚗'];
const MAX_PROGRESS = 5;

export default function MissingNumberMode({ onBack }) {
    const [question, setQuestion] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [progress, setProgress] = useState(0);
    const [showBurst, setShowBurst] = useState(false);

    useEffect(() => {
        setQuestion(generateQuestion());
    }, []);

    const handleChoiceClick = (number) => {
        if (isCorrect !== null) return; // Wait for current animation to finish

        playPopSound();
        setSelectedItem(number);

        if (number === question.answer) {
            setIsCorrect(true);
            playCorrectSound();
            const newProgress = progress + 1;

            setTimeout(() => {
                setIsCorrect(null);
                setSelectedItem(null);
                setProgress(newProgress);

                if (newProgress >= MAX_PROGRESS) {
                    playClearSound();
                    setShowBurst(true);
                } else {
                    setQuestion(generateQuestion());
                }
            }, 1000);
        } else {
            setIsCorrect(false);
            playWrongSound();
            setTimeout(() => {
                setIsCorrect(null);
                setSelectedItem(null);
            }, 1000);
        }
    };

    if (!question) return null;

    return (
        <div style={styles.container}>
            {showBurst && <StickerBurst onComplete={() => { setShowBurst(false); onBack(); }} />}
            {/* Header */}
            <div style={styles.header}>
                <button onClick={onBack} style={styles.backButton}>
                    <ChevronLeft size={24} color="var(--color-primary)" />
                </button>
                <span style={styles.title}>빈칸 채우기</span>
                <div style={{ width: 24 }} />
            </div>

            {/* Village Visual Area (Reward) */}
            <div style={styles.villageArea}>
                <div style={styles.villageProgress}>
                    {[...Array(MAX_PROGRESS)].map((_, i) => (
                        <div key={i} style={styles.progressDot}>
                            {i < progress ? <Star size={20} color="var(--color-accent)" fill="var(--color-accent)" className="animate-pop" /> : <div style={styles.dotEmpty} />}
                        </div>
                    ))}
                </div>
                <div style={styles.villageScene}>
                    <div style={styles.houseIcon} className={isCorrect ? 'animate-pop' : ''}>🏠</div>
                    <div style={styles.itemsContainer}>
                        {/* Show items based on progress */}
                        {progress >= 1 && <span style={{ ...styles.sceneItem, left: '10%', bottom: '10%' }} className="animate-pop">🌷</span>}
                        {progress >= 2 && <span style={{ ...styles.sceneItem, right: '15%', bottom: '20%' }} className="animate-pop">🌳</span>}
                        {progress >= 3 && <span style={{ ...styles.sceneItem, left: '20%', bottom: '30%' }} className="animate-pop">🐶</span>}
                        {progress >= 4 && <span style={{ ...styles.sceneItem, right: '5%', bottom: '5%' }} className="animate-pop">🚗</span>}
                    </div>
                </div>
            </div>

            {/* Question Area */}
            <div style={styles.questionArea}>
                <span style={styles.number} className="font-number">{question.a}</span>
                <span style={styles.operator}>x</span>
                <div
                    style={{
                        ...styles.dropZone,
                        borderColor: isCorrect === true ? 'var(--color-success)' : (isCorrect === false ? 'var(--color-primary)' : 'var(--bg-secondary)'),
                        backgroundColor: isCorrect === true ? 'var(--bg-tertiary)' : 'var(--bg-primary)'
                    }}
                    className={isCorrect === false ? 'animate-shake' : ''}
                >
                    {(isCorrect !== null && selectedItem !== null) && <span style={styles.number} className="font-number">{selectedItem}</span>}
                </div>
                <span style={styles.operator}>=</span>
                <span style={styles.number} className="font-number">{question.result}</span>
            </div>

            {/* Choices Area */}
            <div style={styles.choicesArea}>
                {question.choices.map((num, i) => (
                    <button
                        key={i}
                        onClick={() => handleChoiceClick(num)}
                        style={styles.choiceCard}
                        className="font-number animate-pop"
                        disabled={isCorrect !== null}
                    >
                        {num}
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
    villageArea: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-tertiary)',
        margin: '1rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-inner)',
        position: 'relative',
        overflow: 'hidden'
    },
    villageProgress: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '1rem'
    },
    progressDot: {
        width: '24px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dotEmpty: {
        width: '10px',
        height: '10px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '50%'
    },
    villageScene: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    houseIcon: {
        fontSize: '6rem',
        zIndex: 10
    },
    itemsContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
    },
    sceneItem: {
        position: 'absolute',
        fontSize: '3rem'
    },
    questionArea: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        padding: '2rem 1rem',
    },
    number: {
        fontSize: '3.5rem',
        color: 'var(--text-main)',
    },
    operator: {
        fontSize: '2.5rem',
        color: 'var(--text-muted)',
        fontWeight: '700',
    },
    dropZone: {
        width: '80px',
        height: '80px',
        borderRadius: 'var(--radius-md)',
        border: '4px dashed var(--color-secondary)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.3s ease',
    },
    choicesArea: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2rem',
        backgroundColor: 'var(--bg-primary)',
        borderTopLeftRadius: 'var(--radius-lg)',
        borderTopRightRadius: 'var(--radius-lg)',
        boxShadow: '0 -10px 20px rgba(0,0,0,0.03)',
    },
    choiceCard: {
        width: '60px',
        height: '60px',
        backgroundColor: '#fff',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        fontWeight: '700',
        color: 'var(--color-secondary)',
        boxShadow: 'var(--shadow-md)',
        cursor: 'grab',
    }
};
