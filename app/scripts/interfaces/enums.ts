namespace CodeZen.Enums {
  export enum ContextMenuItemType {
    normal = "normal",
    checkbox = "checkbox",
    radio = "radio",
    separator = "separator"
  }

  export enum ContextMenuItemId {
    mode = "mode",
    changeView = "changeView",
    layout = "layout",
    fav = "fav"
  }

  export enum ContextType {
    all = "all",
    page = "page",
    frame = "frame",
    selection = "selection",
    link = "link",
    editable = "editable",
    image = "image",
    video = "video",
    audio = "audio",
    launcher = "launcher",
    browser_action = "browser_action",
    page_action = "page_action"
  }
}
