/// <reference path="bgCode.ts" />

namespace CodeZenBg {
  export let activeTabId: number;
  // Handles code that runs on extension installation
  chrome.runtime.onInstalled.addListener(function () {
    init();
  });

  // Handles code that runs on web navigation
  chrome.webNavigation.onCompleted.addListener(function () {
    pageNavigated();
  }, {
      url: [{
        urlMatches: URL
      }]
    });

  chrome.tabs.onActivated.addListener(function (activeInfo) {
    activeTabId = activeInfo.tabId;
  });
}

// TODO:
// Update context menu about current editor view on every web navigation within codepen
// Declarative content should not be exclusive to codepen so as to view favs and go to codepen from any page
