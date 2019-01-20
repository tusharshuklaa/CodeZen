const CZMode = (function(u){
  let _INIT_EDITOR_PANE_WIDTH = "";
  const mode = {
    "zen": {
      "id": "zen",
      "className": u.classPrefix + "zen"
    },
    "focus": {
      "id": "focus",
      "className": u.classPrefix + "fm"
    },
    "normal": {
      "id": "normal"
    }
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
      if (className.startsWith(u.classPrefix)) {
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

  return {
    init: _initMode
  };
})(CZUtils);

const CZView = (function(u) {
  const url = document.location.href,
    domain = "https://codepen.io",
    URLMeta = url.split(domain)[1],
    URLDetails = URLMeta.split("/"),
    userName = URLDetails[1],
    currView = URLDetails[2],
    penId = URLDetails[3],
    view = [
      "pen",
      "details",
      "full",
      "debug",
      "live",
      "collab",
      "professor",
      "pres"
    ];

  const getViewType = function(type) {
    return view.filter(v => type.indexOf(v) > -1)[0];
  };

  const initChangeView = function(type) {
    if(type.indexOf(currView) === -1) {
      const targetView = getViewType(type);
      goToView(targetView);
    }
  };

  const goToView = function(view) {
    document.location.href = [domain, userName, view, penId].join("/");
  };

  return {
    init: initChangeView
  };
})(CZUtils);

const CodeZenMain = (function (u, mode, view) {
  const cmItems = ["mode", "changeView", "layout", "fav"];
  const cmEnum = u.makeEnum(cmItems);

  const init = function () {
    initListeners();
  };

  const initListeners = function () {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      const reqType = getReqType(request);
      switch(reqType) {
      case cmEnum[cmEnum.mode]: mode.init(request._czMode);
        break;

      case cmEnum[cmEnum.changeView]: view.init(request._czMode);
        break;

      default:
        console.log("No request of type:", reqType);
      }
      sendResponse({
        status: "active"
      });
    });
  };

  const getReqType = function(req) {
    return cmItems.filter(cm => req._czMode.indexOf(cmEnum[cmEnum[cm]]) > -1)[0];
  };

  return {
    init: init
  };

})(CZUtils, CZMode, CZView);

CodeZenMain.init();