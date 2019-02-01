/// <reference path="bgCode.ts" />

namespace CodeZen.Bg.Cm {
  // These are the context menus available on the page
  // ID and Key name has to be same
  const _CONTEXT_MENUS: CodeZen.ContextMenuOptions = {
    "modes": {
      "id": "mode",
      "title": "Mode",
      "children": [{
        "id": "normal",
        "title": "Normal",
        "type": CodeZen.Enums.ContextMenuItemType.radio,
        "checked": true
      },
      {
        "id": "zen",
        "title": "Zen",
        "type": CodeZen.Enums.ContextMenuItemType.radio
      }, {
        "id": "focus",
        "title": "Focus",
        "type": CodeZen.Enums.ContextMenuItemType.radio
      }]
    },
    "view": {
      "id": "changeView",
      "title": "Change View",
      "children": [{
        "id": "pen",
        "title": "Editor",
        "type": CodeZen.Enums.ContextMenuItemType.radio,
        "checked": true
      }, {
        "id": "details",
        "title": "Details",
        "type": CodeZen.Enums.ContextMenuItemType.radio
      }, {
        "id": "fullPage",
        "title": "Full Page",
        "type": CodeZen.Enums.ContextMenuItemType.radio
      }, {
        "id": "debug",
        "title": "Debug",
        "type": CodeZen.Enums.ContextMenuItemType.radio
      }, {
        "id": "live",
        "title": "Live (PRO)",
        "type": CodeZen.Enums.ContextMenuItemType.radio
      }, {
        "id": "collab",
        "title": "Collab (PRO)",
        "type": CodeZen.Enums.ContextMenuItemType.radio
      }, {
        "id": "professor",
        "title": "Professor (PRO)",
        "type": CodeZen.Enums.ContextMenuItemType.radio
      }, {
        "id": "presentation",
        "title": "Presentation (PRO)",
        "type": CodeZen.Enums.ContextMenuItemType.radio
      }]
    },
    "layout": {
      "id": "layout",
      "title": "Change Layout",
      "children": [{
        "id": "toLeft",
        "title": "Left",
        "type": CodeZen.Enums.ContextMenuItemType.radio,
        "checked": true
      }, {
        "id": "toTop",
        "title": "Top",
        "type": CodeZen.Enums.ContextMenuItemType.radio
      }, {
        "id": "toRight",
        "title": "Right",
        "type": CodeZen.Enums.ContextMenuItemType.radio
      }]
    },
    "fav": {
      "id": "fav",
      "title": "Add to Favourites"
    }
  },
  _CONTEXT_MENUS_CONTEXT: CodeZen.Enums.ContextType[] = [CodeZen.Enums.ContextType.all];

  const createCm = function (): void {
    for (const m in _CONTEXT_MENUS) {
      const menu: CodeZen.ContextMenu = JSON.parse(JSON.stringify((_CONTEXT_MENUS as any)[m]));
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

  const _createMenu = function (menu: CodeZen.ContextMenu) {
    chrome.contextMenus.create(menu);
  };

  const _updateContextMenuConfig = function (menu: CodeZen.ContextMenu) {
    menu.id = EXT_NAME + menu.id;
    menu.contexts = _CONTEXT_MENUS_CONTEXT;
    menu.documentUrlPatterns = [URL + "*", FRAME_URL + "*"];
    menu.targetUrlPatterns = [URL + "*", FRAME_URL + "*"];
  };

  const _createSubMenus = function (c: CodeZen.ContextMenuItem, menu: CodeZen.ContextMenu) {
    c.parentId = menu.id;
    c.id = menu.id + "_-_" + c.id;
    c.contexts = _CONTEXT_MENUS_CONTEXT;
    c.targetUrlPatterns = [URL + "*", FRAME_URL + "*"];
    c.documentUrlPatterns = [URL + "*/pen/*", FRAME_URL + "*"];
    _createMenu(c);
  };

  const _sendModeRequest = function (mode: any) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (tabs && tabs.length) {
        activeTabId = tabs[0].id;
      }
      sendMsgToTab(mode);
    });
  };

  const sendMsgToTab = function (mode: any) {
    if (activeTabId) {
      chrome.tabs.sendMessage(activeTabId, {
        _czMode: mode
      }, function (response) {
        // console.log(mode + "mode request was sent and current status is -> ", response.status);
      });
    } else {
      throw "There is no active tab (" + activeTabId + ")!! Strange but true :(";
    }
  };

  const _initCmHandlers = function () {
    chrome.contextMenus.onClicked.addListener(i => {
      _sendModeRequest(i.menuItemId);
    });
  };

  // Exports
  export const create = function (): void {
    createCm();
    _initCmHandlers();
  };
}
