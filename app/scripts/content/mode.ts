namespace CodeZenContent {

  export const CZMode = (function (u) {
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

}
