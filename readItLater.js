var readItLater = {
    read_it_later: function (page, callback) {
        chrome.storage.local.get('pageList', function (item) {
            var pageList = [];
            if (item.pageList) {
                pageList = item.pageList;
            }
            pageList.push(page);
            chrome.storage.local.set({'pageList': pageList});
            callback();
        });
    },
    openUnreaded: function (index) {
        chrome.storage.local.get('pageList', function (item) {
            var pageList = item.pageList;
            chrome.tabs.create(
                {
                    url: pageList[index].url
                },
                function (tab) {
                    pageList.splice(index, 1);
                    chrome.storage.local.set({'pageList': pageList});
                }
            );
        });
    }
}
