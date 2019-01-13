const CZUtils = (function() {
  const makeEnum = function (arr) {
    return arr.reduce(function (acc, cv, i) {
      const idx = ++i;
      if (!acc[cv]) {
        acc[cv] = idx;
        acc[idx] = cv;
      }
      return acc;
    }, {});
  };

  const _fsOpen = function (elem) {
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

  const _fsClose = function () {
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

  const isFullScreen = function () {
    return document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement;
  };

  const fullScreen = function (elem) {
    function open() {
      _fsOpen(elem);
    }

    return {
      open: open,
      close: _fsClose
    };
  };

  const elems = function(sel) {
    return document.querySelectorAll(sel);
  };

  return {
    makeEnum: makeEnum,
    isFullScreen: isFullScreen,
    fullScreen: fullScreen,
    elems: elems,
    elem: sel => elems(sel)[0]
  };
})();

const CodeZenContent = (function (u) {
  const classPrefix = "_codeZen_mode_";
  const cmItems = ["mode", "changeView", "layout", "fav"];
  const cmEnum = u.makeEnum(cmItems);
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
      const reqType = getReqType(request);
      switch(reqType) {
      case cmEnum[cmEnum.mode]: _initMode(request._czMode);
        break;

      default:
        console.log("No request", reqType);
      }
      sendResponse({
        status: "active"
      });
    });
  };

  const _initMode = function (type) {
    const rootElem = u.elem("html"),
      editorPane = u.elem("body.layout-side .top-boxes"),
      modeClass = _getClassName(type),
      isInTypeMode = rootElem.classList.contains(modeClass),
      fs = u.fullScreen(u.elem("body"));

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

  const getReqType = function(req) {
    return cmItems.filter(cm => req._czMode.indexOf(cmEnum[cmEnum[cm]]) > -1)[0];
  };

  return {
    init: init
  };

})(CZUtils);

CodeZenContent.init();
