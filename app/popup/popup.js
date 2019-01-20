const CodeZenPopUp = {};

(function(c) {
  const init = function() {
    const changeColor = document.getElementById("zenMode");
    if (changeColor) {
      setColor(changeColor);
      changeColor.onclick = function (element) {
        btnClickListener(element);
      };
    } else {
      console.log("btn is not available", changeColor);
    }
  };

  const setColor = function(elem) {
    chrome.storage.sync.get('color', function (data) {
      elem.style.backgroundColor = data.color;
      elem.setAttribute('value', data.color);
    });
  };

  const btnClickListener = function (element) {
    let color = element.target.value;
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id, {
          code: 'document.body.style.backgroundColor = "' + color + '";'
        });
    });
  };

  c.init = init;
})(CodeZenPopUp);

document.addEventListener('DOMContentLoaded', CodeZenPopUp.init);