const CodeZenContent = (function () {

  const classPrefix = "_codeZen_mode_";
  const mode = {
    "zen": {
      "id": "zen",
      "className": classPrefix + "zen"
    },
    "focus": {
      "id": "focus",
      "className": classPrefix + "fm"
    },
    "normal": {
      "id": "normal"
    }
  };

  let _INIT_EDITOR_PANE_WIDTH = "";

  const init = function () {
    initListeners();
  };

  const initListeners = function () {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      _initMode(request._czMode);
      sendResponse({
        status: "active"
      });
    });
  };

  const _initMode = function (type) {
    const rootElem = document.getElementsByTagName("html")[0],
      editorPane = document.querySelectorAll("body.layout-side .top-boxes")[0],
      modeClass = _getClassName(type),
      isInTypeMode = rootElem.classList.contains(modeClass),
      fs = _fullScreen(document.getElementsByTagName("body")[0]);

    if (!isInTypeMode) {
      _resetMode(rootElem, fs);

      if (type.indexOf(mode.normal.id) > -1) {
        _normalMode(editorPane);
      } else {
        _abnormalMode(rootElem, modeClass, editorPane, type, fs);
      }
    }
  };

  const _resetMode = function (rootElem, fs) {
    rootElem.classList.forEach(className => {
      if (className.startsWith(classPrefix)) {
        rootElem.classList.remove(className);
      }
    });
    fs.close();
  };

  const _normalMode = function (editorPane) {
    if (editorPane) {
      if (_INIT_EDITOR_PANE_WIDTH) {
        editorPane.style.width = _INIT_EDITOR_PANE_WIDTH;
      } else {
        editorPane.style.removeProperty("width");
      }
    }
  };

  const _abnormalMode = function (rootElem, modeClass, editorPane, type, fs) {
    rootElem.classList.add(modeClass);
    _INIT_EDITOR_PANE_WIDTH = editorPane && editorPane.style.width.indexOf("100%") === -1 ?
      editorPane.style.width : _INIT_EDITOR_PANE_WIDTH;
    editorPane.style.width = "100%";
    if (type.indexOf(mode.zen.id) > -1) {
      fs.open();
    }
  };

  const _getClassName = function (type) {
    let className = "";
    if (type.indexOf(mode.zen.id) > -1)
      className = mode.zen.className;
    if (type.indexOf(mode.focus.id) > -1)
      className = mode.focus.className;
    return className;
  };

  const _fullScreen = function (elem) {
    function open() {
      _fsOpen(elem);
    }

    return {
      open: open,
      close: _fsClose
    };
  };

  const _fsOpen = function(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const isFullScreen = function() {
    return document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement;
  };

  const _fsClose = function() {
    if (isFullScreen()) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  };

  return {
    init: init
  };

})();

CodeZenContent.init();

// TODO: Issue with toggling from Zen mode to Focus Mode to Zen Mode
// TODO: Issue with retaining editor panes width
