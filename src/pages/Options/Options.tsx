import React, { useState, useEffect } from 'react';
import './Options.css';

const Options: React.FC<Props> = () => {
  const [url, setUrl] = useState('');
  const [blockUrlList, setBlockUrlList] = useState([]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      setBlockUrlList([...blockUrlList, url]);
      setUrl('');
    }
  };

  useEffect(() => {
    chrome.storage.local.get(['blockUrlList']).then((results) => {
      if (results && results.blockUrlList) {
        setBlockUrlList(results.blockUrlList)
      }
    });
  }, []);

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="setting-item">
        <label>Website URL</label>
        <input 
          type="url" 
          placeholder="Enter website URL"
          value={url}
          onChange={handleUrlChange}
        />
        <button type="submit" onClick={handleSubmit}>Add URL</button>
      </div>

      <div className="url-list">
        <h2>Saved URLs</h2>
        <ul>
          {blockUrlList.map((url, index) => (
            <li key={index}>{url}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Options;
