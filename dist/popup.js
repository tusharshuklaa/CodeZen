var CodeZenPopUp = (function (chrome) {
    var init = function () {
        var changeColor = document.getElementById("zenMode");
        if (changeColor) {
            setColor(changeColor);
            changeColor.onclick = function (element) {
                btnClickListener(element);
            };
        }
        else {
            console.log("btn is not available", changeColor);
        }
    };
    var setColor = function (elem) {
        chrome.storage.sync.get('color', function (data) {
            elem.style.backgroundColor = data.color;
            elem.setAttribute('value', data.color);
        });
    };
    var btnClickListener = function (element) {
        var color = element.target.value;
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
                code: 'document.body.style.backgroundColor = "' + color + '";'
            });
        });
    };
    return {
        init: init
    };
})(chrome);
document.addEventListener('DOMContentLoaded', CodeZenPopUp.init);
