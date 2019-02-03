/// <reference path="utils.ts" />

namespace CodeZenContent.Mode {
  let _INIT_EDITOR_PANE_WIDTH = "";
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

  export const init = function (type: string) {
    const rootElem = elem("html"),
      editorPane = elem("body.layout-side .top-boxes"),
      modeClass = _getClassName(type),
      isInTypeMode = rootElem.classList.contains(modeClass);

    if (!isInTypeMode) {
      _resetMode(rootElem);

      if (type.indexOf(mode.normal.id) > -1) {
        _normalMode(editorPane);
      } else {
        _abnormalMode(rootElem, modeClass, editorPane, type);
      }
    }
  };

  const _resetMode = function (rootElem: CodeZen.HTMLElementWithFullScreenApi) {
    rootElem.classList.forEach(className => {
      if (className.startsWith(classPrefix)) {
        rootElem.classList.remove(className);
      }
    });
    FullScreen.close();
  };

  const _normalMode = function (editorPane: CodeZen.HTMLElementWithFullScreenApi) {
    if (editorPane) {
      if (_INIT_EDITOR_PANE_WIDTH) {
        editorPane.style.width = _INIT_EDITOR_PANE_WIDTH;
      } else {
        editorPane.style.removeProperty("width");
      }
    }
  };

  const _abnormalMode = function (rootElem: CodeZen.HTMLElementWithFullScreenApi,
    modeClass: string, editorPane: CodeZen.HTMLElementWithFullScreenApi, type: string) {
    rootElem.classList.add(modeClass);
    _INIT_EDITOR_PANE_WIDTH = editorPane && editorPane.style.width.indexOf("100%") === -1 ?
      editorPane.style.width : _INIT_EDITOR_PANE_WIDTH;
    editorPane.style.width = "100%";
    if (type.indexOf(mode.zen.id) > -1) {
      FullScreen.open();
    }
  };

  const _getClassName = function (type: string) {
    return type.indexOf(mode.zen.id) > -1 ? mode.zen.className :
      (type.indexOf(mode.focus.id) > -1 ? mode.focus.className : "");
  };
}
