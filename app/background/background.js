// Handles code that runs on extension installation
chrome.runtime.onInstalled.addListener(function () {
  CodeZenBG.init();
});

// Handles code that runs on web navigation
chrome.webNavigation.onCompleted.addListener(function () {
  CodeZenBG.pageNavigated();
}, {
  url: [{
    urlMatches: CodeZenBG.URL
  }]
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  CodeZenBG.activeTabId = activeInfo.tabId;
});

// TODO:
// Update context menu about current editor view on every web navigation within codepen
// Declarative content should not be exclusive to codepen so as to view favs and go to codepen from any page
