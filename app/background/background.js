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
// Add keybindings for most of the features
// Update context menu about current editor view on every web navigation within codepen
// Add editor layout/position toggle
// Add fav feature (CRUD operations)
// Declarative content should not be exclusive to codepen so as to view favs and go to codepen from any page
// Add RSS feed Reader for CodePen Spark
// Add RSS feed Reader for CodePen Jobs
// Add RSS feed Reader for CodePen Blog
// Add RSS feed Reader for Editor Picked Pens
// Add RSS feed Reader for Popular Pens
// Add RSS feed Reader for Recent Pens
// Add RSS feed Reader for Editor Picked Blog Posts
// Add push notification on RSS update
// Check why there is an occasional error of creating duplicate context menu - happens coz context menu is created on every web navigation
// Make an options page for RSS settings, contact developer, default link opening behaviour, change key bindings
// Make an introduction page that opens on extension installation that would guide on how to use the extension
// make a small form to send email to dev for uninstallation
// Make Fav managr in popup, show logged in user and his image
// Go TO Dashboard links - pens, posts, collections, projects
// Scrap profile page to show info of followers/following/username and full name
// Last visited date
// Open html/css/js of current pen in new page
// Link to Codepen Support and Documentation
// Link to local Extension documentation
