const CodeZenBG = (function (chrome) {
  "use strict";

  const _HOST = "codepen.io";
  const URL = "https://" + _HOST + "/";
  const EXT_NAME = "CodeZen";
  // These are the context menus available on the page
  // ID and Key name has to be same
  const _CONTEXT_MENUS = {
    "modes": {
      "id": "mode",
      "title": "View Modes",
      "children": [{
        "id": "normal",
        "title": "Normal",
        "type": "radio"
      },
      {
        "id": "zen",
        "title": "Zen",
        "type": "radio"
      }, {
        "id": "focus",
        "title": "Focus",
        "type": "radio"
      }]
    },
    "fav": {
      "id": "fav",
      "title": "Add to Favourites"
    },
    "vFav": {
      "id": "vFav",
      "title": "View Favourites"
    }
  };

  const _CONTEXT_MENUS_CONTEXT = ["all"];
  // const _DEFAULT_SETTING = {};
  // const _preFix = EXT_NAME + "_-_";
  // _DEFAULT_SETTING[_preFix + _CONTEXT_MENUS.modes.zen.id] = false;
  // _DEFAULT_SETTING[_preFix + _CONTEXT_MENUS.modes.focus.id] = false;

  const init = function () {
    handleDeclarativeContent();
    setDefaults();
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
    for (const m in _CONTEXT_MENUS) {
      const menu = _CONTEXT_MENUS[m];
      if (_CONTEXT_MENUS.hasOwnProperty(m) && typeof menu === "object") {
        menu.id = EXT_NAME + menu.id;
        menu.contexts = _CONTEXT_MENUS_CONTEXT;
        if (menu.children) {
          const {
            children,
            ..._menu
          } = menu;
          _createMenu(_menu);
          children.forEach(c => {
            c.parentId = menu.id;
            c.id = menu.id + "_-_" + c.id;
            c.contexts = _CONTEXT_MENUS_CONTEXT;
            if (c.id.indexOf("normal") > -1) {
              c.checked = true;
            }
            _createMenu(c);
          });
        } else {
          _createMenu(menu);
        }
      }
    }
  };

  const _createMenu = function (menu) {
    chrome.contextMenus.create(menu);
  };

  const _initCmHandlers = function () {
    chrome.contextMenus.onClicked.addListener(i => {
      _sendModeRequest(i.menuItemId);
    });
  };

  const _sendModeRequest = function (mode) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        _czMode: mode
      }, function (response) {
        // console.log(mode + "mode request was sent and current status is -> ", response.status);
      });
    });
  };

  const setDefaults = function () {
    // chrome.storage.sync.set(_DEFAULT_SETTING, function () {
    //   console.log("DEFAULT SETTING: ", _DEFAULT_SETTING);
    // });
  };

  /**
   * Runs when page navigation has taken place
   *
   */
  const pageNavigated = function () {
    // alert("Welcome to CodePen! You can use the Code Pen Tools now!");
    createContextMenus();
  };

  // Public Properties
  return {
    init: init,
    pageNavigated: pageNavigated,
    URL: URL
  };

})(chrome);
