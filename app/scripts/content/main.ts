/// <reference path="../dto/codezen.ts" />

namespace CodeZen.Content.Main {
  export enum ContextMenuItemId {
    mode = "mode",
    changeView = "changeView",
    layout = "layout",
    fav = "fav"
  }

  const initListeners = function () {
    chrome.runtime.onMessage.addListener(function (request: ITabsMessageData, sender, sendResponse) {
      const reqType = getReqType(request);
      switch (reqType) {
        case ContextMenuItemId.mode: Content.Mode.init(request._czMode);
          break;

        case ContextMenuItemId.changeView: CodeZen.Content.View.init(request._czMode);
          break;

        default:
          console.log("No request of type:", reqType);
      }
      sendResponse({
        status: "active"
      });
    });
  };

  const getReqType = function (req: ITabsMessageData): string {
    const reqMode = (ContextMenuItemId as any)[req._czMode];
    return (<any>Object).values(ContextMenuItemId).includes(reqMode) ? reqMode : null;
  };

  // Exports

  export const init = function () {
    initListeners();
  };
}

CodeZen.Content.Main.init();
