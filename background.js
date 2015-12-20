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
    } else if (command == "search") {
        //TO-DO
    }
});

// chrome.commands.getAll(function(commands) {
//     for (var i=0; i < commands.length; i++) {
//         console.log(commands[i]);
//     }
// });
