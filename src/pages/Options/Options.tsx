import React, { useState, useEffect } from 'react';
import './Options.css';

const URL_REGEX =
  /(http(s)?:\/\/.)?(www\.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

const Options = () => {
  const [url, setUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [blockUrlList, setBlockUrlList] = useState<string[]>([]);

  useEffect(() => {
    chrome.storage.local.get(['blockUrlList']).then((results) => {
      if (results && results.blockUrlList) {
        setBlockUrlList(results.blockUrlList);
      }
    });
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (url.trim() !== '') {
      if (isValidUrl(url)) {
        const newList = [...blockUrlList, url];
        setBlockUrlList(newList);
        chrome.storage.local.set({ blockUrlList: newList });
        setUrl('');
      } else {
        setErrorMessage(
          'Invalid URL. make sure to include www. in the beginning'
        );
      }
    }
  };

  const handleDelete = (index: number) => {
    const newList = blockUrlList.filter((_, i) => i !== index);
    setBlockUrlList(newList);
    chrome.storage.local.set({ blockUrlList: newList });
  };

  const isValidUrl = (url: string) => {
    const res = url.match(URL_REGEX);
    if (res == null) {
      return false;
    }
    return true;
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="setting-item">
        <label>Website to block</label>
        <input
          type="url"
          placeholder="Enter website URL"
          value={url}
          onChange={handleUrlChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <div className="url-list">
        <h2>Websites to block</h2>
        <ul>
          {blockUrlList.map((url, index) => (
            <li key={index}>
              {url}
              <span className="delete-icon" onClick={() => handleDelete(index)}>
                {' '}
                X{' '}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Options;
