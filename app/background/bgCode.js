const CodeZenBG = {};

(function (cz, chrome) {
  "use strict";

  const _SCHEME = "https://";
  const _HOST = "codepen.io";
  const URL = _SCHEME + _HOST + "/";
  const FRAME_URL = _SCHEME + "s." + _HOST + "/";
  const EXT_NAME = "CodeZen";
  // These are the context menus available on the page
  // ID and Key name has to be same
  const _CONTEXT_MENUS = {
    "modes": {
      "id": "mode",
      "title": "Mode",
      "children": [{
        "id": "normal",
        "title": "Normal",
        "type": "radio",
        "checked": true
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
    "view": {
      "id": "changeView",
      "title": "Change View",
      "children": [{
        "id": "pen",
        "title": "Editor",
        "type": "radio",
        "checked": true
      }, {
        "id": "details",
        "title": "Details",
        "type": "radio"
      }, {
        "id": "fullPage",
        "title": "Full Page",
        "type": "radio"
      }, {
        "id": "debug",
        "title": "Debug",
        "type": "radio"
      }, {
        "id": "live",
        "title": "Live (PRO)",
        "type": "radio"
      }, {
        "id": "collab",
        "title": "Collab (PRO)",
        "type": "radio"
      }, {
        "id": "professor",
        "title": "Professor (PRO)",
        "type": "radio"
      }, {
        "id": "presentation",
        "title": "Presentation (PRO)",
        "type": "radio"
      }]
    },
    "layout": {
      "id": "layout",
      "title": "Change Layout",
      "children": [{
        "id": "toLeft",
        "title": "Left",
        "type": "radio",
        "checked": true
      }, {
        "id": "toTop",
        "title": "Top",
        "type": "radio"
      }, {
        "id": "toRight",
        "title": "Right",
        "type": "radio"
      }]
    },
    "fav": {
      "id": "fav",
      "title": "Add to Favourites"
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
    for (const m in _CONTEXT_MENUS) {
      const menu = JSON.parse(JSON.stringify(_CONTEXT_MENUS[m]));
      if (_CONTEXT_MENUS.hasOwnProperty(m) && typeof menu === "object") {
        _updateContextMenuConfig(menu);
        if (menu.children) {
          const { children, ..._menu } = menu;
          _menu.documentUrlPatterns = [URL + "*/pen/*", FRAME_URL + "*"];
          _createMenu(_menu);
          children.forEach(c => {
            _createSubMenus(JSON.parse(JSON.stringify(c)), menu);
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

  const _updateContextMenuConfig = function(menu) {
    menu.id = EXT_NAME + menu.id;
    menu.contexts = _CONTEXT_MENUS_CONTEXT;
    menu.documentUrlPatterns = [URL + "*", FRAME_URL + "*"];
    menu.targetUrlPatterns = [URL + "*", FRAME_URL + "*"];
  };

  const _createSubMenus = function(c, menu) {
    c.parentId = menu.id;
    c.id = menu.id + "_-_" + c.id;
    c.contexts = _CONTEXT_MENUS_CONTEXT;
    c.targetUrlPatterns = [URL + "*", FRAME_URL + "*"];
    c.documentUrlPatterns = [URL + "*/pen/*", FRAME_URL + "*"];
    _createMenu(c);
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
      if(tabs && tabs.length) {
        cz.activeTabId = tabs[0].id;
      }
      sendMsgToTab(mode);
    });
  };

  const sendMsgToTab = function(mode) {
    if (cz.activeTabId) {
      chrome.tabs.sendMessage(cz.activeTabId, {
        _czMode: mode
      }, function (response) {
        // console.log(mode + "mode request was sent and current status is -> ", response.status);
      });
    } else {
      throw "There is no active tab (" + cz.activeTabId + ")!! Strange but true :(";
    }
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
    // createContextMenus();
  };

  // Public Properties
  cz.init = init;
  cz.pageNavigated = pageNavigated;
  cz.URL = URL;
  // This is set in background.js on tab activated listener
  cz.activeTabId = null;

})(CodeZenBG, chrome);
