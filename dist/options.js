var page = document.getElementById('buttonDiv');
var kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
    var _loop_1 = function (item) {
        var button = document.createElement('button');
        button.style.backgroundColor = item;
        button.addEventListener('click', function () {
            chrome.storage.sync.set({
                color: item
            }, function () {
                console.log('color is ' + item);
            });
        });
        page.appendChild(button);
    };
    for (var _i = 0, kButtonColors_1 = kButtonColors; _i < kButtonColors_1.length; _i++) {
        var item = kButtonColors_1[_i];
        _loop_1(item);
    }
}
constructOptions(kButtonColors);
