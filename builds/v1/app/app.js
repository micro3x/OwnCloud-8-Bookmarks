var app = app || {};
app.constants = app.constants || {};

$('document').ready(function () {

    app.constants.baseURL = '';
    app.constants.path = '/index.php/apps/bookmarks/';
    app.constants.user = '';
    app.constants.pass = '';

    app.dataAccess.getDataFromStorage();
    app.ui.displayBookmarks(app.data.localData);
    $('#tags').on('click', 'li', function (item) {
        app.ui.selectItem(item.target);
    });

    chrome.storage.sync.get({
        baseUrl: "",
        username: "",
        password: ""
    }, function (items) {
        app.constants.baseURL = items.baseUrl;
        app.constants.user = items.username;
        app.constants.pass = items.password;
        app.security.login(app.constants.user, items.password)
            .then(
            function () {
                if (!app.security.isLogged()) {
                    app.ui.error('not logged in')
                }
                app.dataAccess.getDataFromServer();
            })
    });
});
