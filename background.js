chrome.commands.onCommand.addListener(function(command) {
    if (command == "switch-tab") {
        chrome.tabs.query({
            currentWindow: true
        }, function(allTabs) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(activeTabs) {
                var currentTab = activeTabs[0];
                chrome.tabs.update(currentTab.id, {
                    'highlighted': false
                });
                var nextTab = allTabs[(currentTab.index + 1)%allTabs.length];
                chrome.tabs.update(nextTab.id, {
                    'highlighted': true,
                    'active': true,
                    'selected': true
                });
            });
        });
    } else if (command == "read-it-later") {
        chrome.tabs.query({
            currentWindow: true
        }, function(allTabs) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(activeTabs) {
                var currentTab = activeTabs[0];
                readItLater.read_it_later(
                    {
                        'title': currentTab.title,
                        'url': currentTab.url
                    },
                    function () {
                        chrome.tabs.remove(currentTab.id);
                    }
                );
            });
        });
    } else if (command == "search") {
        //TO-DO
        console.log(chrome);
    } else if (command == "save-as-MHTML") {
        chrome.tabs.query({
            currentWindow: true
        }, function(allTabs) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(activeTabs) {
                var currentTab = activeTabs[0];
                chrome.pageCapture.saveAsMHTML({tabId: currentTab.id}, function (mhtmlData) {
                    //binary mhtmlData
                });
            });
        });
    }
});

// chrome.tabs.onActivated.addListener(function( activeInfo ){
//   var windowId = activeInfo.windowId;
//
//   chrome.tabs.captureVisibleTab(windowId, undefined , function(blob){
//     blob = null;
//   });
// });

// chrome.commands.getAll(function(commands) {
//     for (var i=0; i < commands.length; i++) {
//         console.log(commands[i]);
//     }
// });

chrome.runtime.onInstalled.addListener( function () {
    chrome.contextMenus.create({
        id:'savePic',
        type:'normal',
        title:'保存图片',
        contexts: ['image']
    });
});

chrome.contextMenus.onClicked.addListener( function (info, tab) {
    if (info.menuItemId == 'savePic') {
        var date = new Date();
        chrome.downloads.download({
            filename: date.getTime() + '.' + info.srcUrl.split(".").pop(),
            url: info.srcUrl,
            conflictAction: 'uniquify',
            saveAs: true
        });
    }
});
