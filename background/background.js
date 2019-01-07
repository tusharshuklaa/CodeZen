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

// TODO: Make context menu only on codepen.io and not on all sites
