import React, { useState, useEffect } from 'react';
import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  const [blockedUrls, setBlockedUrls] = useState([])

  useEffect(() => {
    chrome.storage.local.get(['blockedUrls']).then((results) => {
      if (results && results.blockedUrls) {
        setBlockedUrls(results.blockedUrls)
      }
    });
  }, []);

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="setting-item">
        <label>Username</label>
        <input type="text" placeholder="Enter your username"/>
      </div>
      <div className="setting-item">
        <label>Email</label>
        <input type="email" placeholder="Enter your email"/>
      </div>
      <div className="setting-item">
        <label>Enable Notifications</label>
        <input type="checkbox"/>
      </div>
      <div className="setting-item">
        <button>Save Changes</button>
      </div>
    </div>
  );
};

export default Options;
