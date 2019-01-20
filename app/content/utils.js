const CZUtils = (function () {
  const classPrefix = "_codeZen_mode_";

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

  const elems = function (sel) {
    return document.querySelectorAll(sel);
  };

  return {
    makeEnum: makeEnum,
    isFullScreen: isFullScreen,
    fullScreen: fullScreen,
    elems: elems,
    elem: sel => elems(sel)[0],
    classPrefix: classPrefix
  };
})();
