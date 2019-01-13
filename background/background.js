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

// TODO: 
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
// Check why there is an occasional error of creating duplicate context menu
// Make an options page to view FAVs, RSS settings, contact developer
