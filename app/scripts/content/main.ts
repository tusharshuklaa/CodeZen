/// <reference path="utils.ts" />

namespace CodeZenContent.Main {
  export enum ContextMenuItemId {
    mode = "mode",
    changeView = "changeView",
    layout = "layout",
    fav = "fav"
  }

  const initListeners = function () {
    chrome.runtime.onMessage.addListener(function (request: CodeZen.TabsMessageData, sender, sendResponse) {
      const reqType = getReqType(request);
      switch (reqType) {
        case ContextMenuItemId.mode: mode.init(request._czMode);
          break;

        case ContextMenuItemId.changeView: view.init(request._czMode);
          break;

        default:
          console.log("No request of type:", reqType);
      }
      sendResponse({
        status: "active"
      });
    });
  };

  const getReqType = function (req: CodeZen.TabsMessageData): string {
    const reqMode = (ContextMenuItemId as any)[req._czMode];
    return Object.values(ContextMenuItemId).includes(reqMode) ? reqMode : null;
  };

  // Exports

  export const init = function () {
    initListeners();
  };
}

CodeZenContent.Main.init();
