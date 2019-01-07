const CodeZenContent = (function() {

  const classPrefix = "_codeZen_mode_";
  const mode = {
    "zen": {
      "id": "zen",
      "className": classPrefix  + "zen"
    },
    "focus": {
      "id": "focus",
      "className": classPrefix  + "fm"
    }
  };

  let _INIT_EDITOR_PANE_WIDTH = "216px";

  const init = function() {
    initListeners();
  };

  const initListeners = function() {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      _toggleMode(request._czMode);
      sendResponse({
        status: "active"
      });
    });
  };

  const _toggleMode = function(type) {
    const rootElem = document.getElementsByTagName("html")[0];
    const editorPane = document.querySelectorAll("body.layout-side .top-boxes");
    const modeClass = mode[type].className;
    const isInTypeMode = rootElem.classList.contains(modeClass);
    let isInAnyMode = false;
    const fs = _fullScreen(document.getElementsByTagName("body")[0]);
    rootElem.classList.forEach(className => {
      if (className.startsWith(classPrefix)) {
        isInAnyMode = true;
        rootElem.classList.remove(className);
      }
    });
    fs.close();
    if (!isInTypeMode) {
      rootElem.classList.add(modeClass);
      _INIT_EDITOR_PANE_WIDTH = editorPane ? editorPane[0].style.width : _INIT_EDITOR_PANE_WIDTH;
    }

    if (editorPane) {
      editorPane[0].style.width = isInAnyMode ? _INIT_EDITOR_PANE_WIDTH : "100%";
    }

    if (type === mode.zen.id && !isInAnyMode) {
      fs.open();
    }
  };

  const _fullScreen = function(elem) {
    function open() {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }

    function isFullScreen() {
      return document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement;
    };

    function close() {
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
    }

    return {
      open: open,
      close: close
    }
  };

  return {
    init: init
  }

})();

CodeZenContent.init();

// TODO: Issue with toggling from Zen mode to Focus Mode to Zen Mode
// TODO: Issue with retaining editor panes width