namespace CodeZen.Content.Main {
  const initListeners = function () {
    chrome.runtime.onMessage.addListener(function (request: CodeZen.TabsMessageData, sender, sendResponse) {
      const reqType = getReqType(request);
      switch (reqType) {
        case CodeZen.Enums.ContextMenuItemId.mode: mode.init(request._czMode);
          break;

        case CodeZen.Enums.ContextMenuItemId.changeView: view.init(request._czMode);
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
    const reqMode = (CodeZen.Enums.ContextMenuItemId as any)[req._czMode];
    return Object.values(CodeZen.Enums.ContextMenuItemId).includes(reqMode) ? reqMode : null;
  };

  export const init = function () {
    initListeners();
  };
}

CodeZen.Content.Main.init();
