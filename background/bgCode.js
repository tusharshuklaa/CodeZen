const CodeZenBG = (function (chrome) {
  "use strict";

  const _HOST = "codepen.io";
  const URL = "https://" + _HOST + "/";
  const EXT_NAME = "CodeZen";
  // These are the context menus available on the page
  // ID and Key name has to be same
  const _CONTEXT_MENUS = {
    "zen": {
      "id": "zen",
      "name": "Zen Mode",
      "className": "_codeZen_fm"
    },
    "focus": {
      "id": "focus",
      "name": "Focus Mode"
    },
    "fav": {
      "id": "fav",
      "name": "Add to Favourites"
    },
    "vFav": {
      "id": "vFav",
      "name": "View Favourites"
    }
  };

  const _DEFAULT_SETTING = {};
  const _preFix = EXT_NAME + "_-_";
  _DEFAULT_SETTING[_preFix + _CONTEXT_MENUS.zen.id] = false;
  _DEFAULT_SETTING[_preFix + _CONTEXT_MENUS.focus.id] = false;

  const init = function () {
    handleDeclarativeContent();
    setDefaults();
    createContextMenus();
  };

  const handleDeclarativeContent = function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            hostEquals: _HOST
            // queryContains: "editors",
            // pathContains: "pen"
          },
        })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  };

  const createContextMenus = function () {
    createCm();
    _initCmHandlers();
  };

  const createCm = function () {
    Object.entries(_CONTEXT_MENUS).forEach(([key, value]) => {
      chrome.contextMenus.create({
        "title": value.name,
        "id": EXT_NAME + value.id,
        "contexts": ["all"]
      });
    });
  };

  const _initCmHandlers = function() {
    chrome.contextMenus.onClicked.addListener(function (itemData) {
      if (itemData.menuItemId === EXT_NAME + _CONTEXT_MENUS.zen.id)
        _sendModeRequest(_CONTEXT_MENUS.zen.id);
      if (itemData.menuItemId === EXT_NAME + _CONTEXT_MENUS.focus.id)
        _sendModeRequest(_CONTEXT_MENUS.focus.id);
    });
  };

  const _sendModeRequest = function(mode) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        _czMode: mode
      }, function (response) {
        console.log(mode + "mode request was sent and current status is -> ", response.status);
      });
    });
  };

  const setDefaults = function () {
    chrome.storage.sync.set(_DEFAULT_SETTING, function () {
      console.log("DEFAULT SETTING: ", _DEFAULT_SETTING);
    });
  };

  /**
   * Runs when page navigation has taken place
   *
   */
  const pageNavigated = function () {
    alert("Welcome to CodePen! You can use the Code Pen Tools now!");
  };

  // Public Properties
  return {
    init: init,
    pageNavigated: pageNavigated,
    URL: URL
  };

})(chrome);
