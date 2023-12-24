chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    checkUrl(tabId, changeInfo.url);
  }
});
const checkUrl = (tabId, url) => {
  chrome.storage.local.get(['blockUrlList']).then((result) => {
    const blockedUrls = result.blockUrlList || [];
    if (blockedUrls.some(blockedUrl => url.includes(blockedUrl))) {
      chrome.tabs.remove(tabId);
    }
  });
};
