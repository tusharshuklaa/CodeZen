namespace CodeZenBg {
  export const _SCHEME: string = "https://",
    _HOST: string = "codepen.io",
    FRAME_URL: string = _SCHEME + "s." + _HOST + "/",
    EXT_NAME: string = "CodeZen",
    URL: string = _SCHEME + _HOST + "/";

  const handleDeclarativeContent = function (): void {
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

  const setDefaults = function () {
    // chrome.storage.sync.set(_DEFAULT_SETTING, function () {
    //   console.log("DEFAULT SETTING: ", _DEFAULT_SETTING);
    // });
  };

  // Exports
  /**
   * Init function that runs when application is installed
   *
  */
  export const init = function (): void {
    handleDeclarativeContent();
    setDefaults();
    CodeZenBg.Cm.create();
  };

  /**
   * Runs when page navigation has taken place
   *
   */
  export const pageNavigated = function () {
    // alert("Welcome to CodePen! You can use the Code Pen Tools now!");
    // createContextMenus();
  };
}
