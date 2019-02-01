namespace CodeZenContent {
  declare var document: CodeZen.FSDocument;

  export abstract class Utils {
    private readonly classPrefix: string = "_codeZen_mode_";

    public FullScreen = class {
      constructor(private elem: CodeZen.HTMLElementWithFullScreenApi = Utils.elem("body")) {
        this.elem = elem;
      }

      /**
       * Open any element in fullscreen mode
       * If no element is provided, default behaviour is to make body element go full screen
       * @param {CodeZen.HTMLElementWithFullScreenApi} elem
       */
      public open = function (elem: CodeZen.HTMLElementWithFullScreenApi): void {
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

      /**
       * Exits the fullscreen mode
       *
       */
      private close = function (): void {
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
    };

    public static elems = function (sel: string): NodeListOf<CodeZen.HTMLElementWithFullScreenApi> {
      return document.querySelectorAll(sel);
    };

    public static elem = function (sel: string): CodeZen.HTMLElementWithFullScreenApi {
      return this.elems(sel)[0];
    }

  }
}
