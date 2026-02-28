import { useState, useEffect } from 'react';
import Home from './components/Home';
import AdditionMode from './components/AdditionMode';
import MultiplicationMode from './components/MultiplicationMode';
import BingoMode from './components/BingoMode';
import CanvasMode from './components/CanvasMode';

function App() {
  // 'home', 'addition', 'multiplication', 'bingo', 'canvas'
  const [currentMode, setCurrentMode] = useState('home');
  const [progress, setProgress] = useState(0);

  // Mock progress simulation for demonstration
  useEffect(() => {
    if (currentMode !== 'home') {
      setProgress(50); // specific modes show 50%
    } else {
      setProgress(0);
    }
  }, [currentMode]);

  const renderView = () => {
    switch (currentMode) {
      case 'addition':
        return <AdditionMode onBack={() => setCurrentMode('home')} />;
      case 'multiplication':
        return <MultiplicationMode onBack={() => setCurrentMode('home')} />;
      case 'bingo':
        return <BingoMode onBack={() => setCurrentMode('home')} />;
      case 'canvas':
        return <CanvasMode onBack={() => setCurrentMode('home')} />;
      case 'home':
      default:
        return <Home onSelectMode={setCurrentMode} />;
    }
  };

  const getPageTitle = () => {
    switch (currentMode) {
      case 'addition': return '덧셈 팡팡';
      case 'multiplication': return '구구단 톡톡';
      case 'bingo': return '빙고 챌린지';
      case 'canvas': return '나의 캔버스';
      case 'home':
      default: return '구구수학';
    }
  };

  return (
    <>
      <div className="app-container">
        {/* Progress Bar (Thin 1px Line) */}
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Sticky GNB */}
        <div className="sticky-gnb">
          <div className="title font-number">{getPageTitle()}</div>
          {currentMode !== 'home' && (
            <button
              className="btn-neumorph"
              style={{ width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem', paddingBottom: '2px' }}
              onClick={() => setCurrentMode('home')}
            >
              ×
            </button>
          )}
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, paddingTop: '60px', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent' }}>
          {renderView()}
        </div>
      </div>
    </>
  );
}

export default App;
