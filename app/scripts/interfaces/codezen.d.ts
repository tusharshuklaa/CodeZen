declare namespace CodeZen {
  export interface ContextMenuItem extends chrome.contextMenus.CreateProperties {}

  export interface ContextMenu extends chrome.contextMenus.CreateProperties {
    children?: chrome.contextMenus.CreateProperties[];
  }

  export interface ContextMenuOptions {
    modes: ContextMenu;
    view: ContextMenu;
    layout: ContextMenu;
    fav: ContextMenu;
  }

  export interface TabsMessageData {
    _czMode?: string;
  }

  export interface HTMLElementWithFullScreenApi extends HTMLElement {
    mozRequestFullScreen(): Promise<void>;
    webkitRequestFullscreen(): Promise<void>;
    msRequestFullscreen(): Promise<void>;
  }

  export interface FSDocument extends Document {
    // exitFullscreen: () => void;
    mozCancelFullScreen: () => void;
    webkitExitFullscreen: () => void;
    msExitFullscreen: () => void;
    fullscreenElement(): Element;
    mozFullScreenElement(): Element;
    webkitFullscreenElement(): Element;
    msFullscreenElement(): Element;
  }
}
