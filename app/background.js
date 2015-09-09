var app = app || {};
app.constants = app.constants || {};

(function (scope) {
    scope.constants.baseURL = '';
    scope.constants.path = '/index.php/apps/bookmarks/';
    scope.constants.user = '';
    scope.constants.pass = '';

    chrome.storage.sync.get({
        baseUrl: "",
        username: "",
        password: "",
        style: {
            bkgColor: '#FFFFFF',
            tagColor: '#d3d3d3',
            textColor: '#000000',
            eleColor2: '#d3d3d3',
            eleColor1: '#FFFFFF'
        }
    }, function (items) {
        scope.constants.baseURL = items.baseUrl;
        scope.constants.user = items.username;
        scope.constants.pass = items.password;
        scope.constants.style = items.style;
        //scope.ui.loadCustomStyle();
        scope.security.login(scope.constants.user, items.password)
            .then(
            function () {
                if (!scope.security.isLogged()) {
                    scope.ui.error('not logged in')
                }
            })
    });

})(app);


chrome.contextMenus.create({
    id: 'oc-top',
    type: "normal",
    title: "Bookmark to OwnCloud",
    onclick: function (info, tab) {
        chrome.tabs.executeScript(tab.id, {file: "lib/jquery-2.1.4.min.js"});
        chrome.tabs.executeScript(tab.id, {file: "app/context.js"});
        chrome.tabs.insertCSS(tab.id, {file: "oc-modal.css"});
    }
}, function () {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log(request);
            console.log(sender);
            console.log(sendResponse);

            var bookmarkUrl = sender.tab.url,
                bookmarkTitle = sender.tab.title,
                bookmarkDesc = request.desc || "",
                bookmarkTags = request.tags.split(',').map(function (element) {
                        return element.trim();
                    }) || [];
            app.dataAccess.addBookmarkToCloud(bookmarkUrl, bookmarkTitle, bookmarkDesc, bookmarkTags)
                .then(function () {
                    alert("Added");
                }, function (error) {
                    console.log(error);
                });
        });
});
