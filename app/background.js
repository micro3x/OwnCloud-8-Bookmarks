chrome.contextMenus.create({
    type: "normal",
    title: "test",
    onclick: function (ev, tab) {

        chrome.tabs.executeScript(tab.id, {file: "lib/jquery-2.1.4.min.js"});
        chrome.tabs.executeScript(tab.id, {file: "lib/q.js"});
        chrome.tabs.executeScript(tab.id, {file: "app/dataAccess.js"});
        chrome.tabs.executeScript(tab.id, {file: "app/security.js"});
        chrome.tabs.executeScript(tab.id, {file: "app/addPopup.js"});

    }
}, function () {

});