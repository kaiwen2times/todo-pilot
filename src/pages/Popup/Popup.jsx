import React from 'react';
import './Popup.css';

const Popup = () => {
  const goToOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>🌟 Getting Started is Easy</p>
        <p><b>Stay Focused:</b> In Settings, add websites you want to block. We'll keep them off-limits until your to-do list is clear.</p>
       <button className="go-to-option" onClick={goToOptions}>Go to Settings</button>
      </header>
    </div>
  );
};

export default Popup;
