document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get('pageList', function (item) {
        var pageList = [];
        if (item.pageList) {
            pageList = item.pageList;
        }
        var list = document.getElementById("list");
        for (var i in pageList) {
            var elem = document.createElement("h4");
            elem.innerText = pageList[i].title;
            elem.addEventListener("click", function (event) {
                readItLater.openUnreaded(i);
            });
            list.appendChild(elem);
        }
    });
});
