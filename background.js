function checkForValidUrl(tabId, changeInfo, tab) {

  if (tab.url.match(/okcupid\.com\/crazyblinddate/g)) {    
    chrome.pageAction.show(tabId);
  }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);