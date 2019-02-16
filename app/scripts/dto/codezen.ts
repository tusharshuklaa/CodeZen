namespace CodeZen {
  export interface IContextMenuItem extends chrome.contextMenus.CreateProperties {}

  export interface IContextMenu extends chrome.contextMenus.CreateProperties {
    children?: chrome.contextMenus.CreateProperties[];
  }

  export interface IContextMenuOptions {
    modes: IContextMenu;
    view: IContextMenu;
    layout: IContextMenu;
    fav: IContextMenu;
  }

  export interface ITabsMessageData {
    _czMode?: string;
  }

  export interface IHTMLElementWithFullScreenApi extends HTMLElement {
    mozRequestFullScreen(): Promise<void>;
    webkitRequestFullscreen(): Promise<void>;
    msRequestFullscreen(): Promise<void>;
  }

  export interface IFSDocument extends Document {
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
