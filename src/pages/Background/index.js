chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    checkUrl(tabId, changeInfo.url);
  }
});
const checkUrl = (tabId, url) => {
  chrome.storage.local.get(['blockUrlList', 'todos']).then((result) => {
    const blockedUrls = result.blockUrlList || [];
    const todos = result.todos || [];
    if (todos.length) {
      if (blockedUrls.some(blockedUrl => url.includes(blockedUrl))) {
        chrome.tabs.remove(tabId);
      }
    }
  });
};
