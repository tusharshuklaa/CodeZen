/// <reference path="../dto/codezen.ts" />
namespace CodeZen.Content {
  declare var document: CodeZen.IFSDocument;

  export const classPrefix: string = "_codeZen_mode_";

  export const elems = function (sel: string): NodeListOf<CodeZen.IHTMLElementWithFullScreenApi> {
    return document.querySelectorAll(sel);
  };

  export const elem = function (sel: string): CodeZen.IHTMLElementWithFullScreenApi {
    return this.elems(sel)[0];
  }

  /**
   * Abstract class with open and close methods
   * Can be used like 'FullScreen.open();'
   * @export
   * @class FullScreen
   */
  export abstract class FullScreen {
    /**
     * Open any element in fullscreen mode
     * If no element is provided, default behaviour is to make body element go full screen
     * @param {CodeZen.IHTMLElementWithFullScreenApi} elem
    */
    public static open(el: CodeZen.IHTMLElementWithFullScreenApi = elem("body")): void {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.mozRequestFullScreen) { /* Firefox */
        el.mozRequestFullScreen();
      } else if (el.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) { /* IE/Edge */
        el.msRequestFullscreen();
      }
    };

    /**
     * Exits the fullscreen mode if already in full screen mode
     * else do nothing
     *
    */
    public static close(): void {
      if (this.status()) {
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

    /**
     * Tells if the current view is in FUllScreen mode or not
     *
     * @returns {boolean}
    */
    public static status = function (): boolean {
      return !!(document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement);
    };
  }
}
