import { useState } from 'react';
import Home from './components/Home';
import MissingNumberMode from './components/MissingNumberMode';
import SpeedRunMode from './components/SpeedRunMode';
import Collection from './components/Collection';

function App() {
  // 'home', 'missing_number', 'speed_run', 'collection'
  const [currentMode, setCurrentMode] = useState('home');

  const renderView = () => {
    switch (currentMode) {
      case 'missing_number':
        return <MissingNumberMode onBack={() => setCurrentMode('home')} />;
      case 'speed_run':
        return <SpeedRunMode onBack={() => setCurrentMode('home')} />;
      case 'collection':
        return <Collection onBack={() => setCurrentMode('home')} />;
      case 'home':
      default:
        return <Home onSelectMode={setCurrentMode} />;
    }
  };

  return (
    <>
      <div className="app-container">
        {renderView()}
      </div>
      <div className="copyright-footer">
        &copy; 2026 YES Gugudan. All rights reserved.
      </div>
    </>
  );
}

export default App;
