namespace CodeZenContent {

  export const CZView = (function (u) {
    const url: string = document.location.href,
      domain: string = "https://codepen.io",
      URLMeta: string = url.split(domain)[1],
      URLDetails = URLMeta.split("/"),
      userName: string = URLDetails[1],
      currView: string = URLDetails[2],
      penId: string = URLDetails[3],
      view: string[] = [
        "pen",
        "details",
        "full",
        "debug",
        "live",
        "collab",
        "professor",
        "pres"
      ];

    const getViewType = function (type: string): string {
      return view.filter(v => type.indexOf(v) > -1)[0];
    };

    const initChangeView = function (type: string): void {
      if (type.indexOf(currView) === -1) {
        const targetView = getViewType(type);
        goToView(targetView);
      }
    };

    const goToView = function (view: string): void {
      document.location.href = [domain, userName, view, penId].join("/");
    };

    return {
      init: initChangeView
    };
  })(CZUtils);

}
