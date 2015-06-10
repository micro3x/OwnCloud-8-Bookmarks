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

    //todo add event handler for add bookmark

    $('#addBookmark-form').on('submit', function (event) {
        event.preventDefault();
        var bookmarkUrl = $('#addBookmark-url').val();
        var bookmarkTitle = $('#addBookmark-title').val();
        var bookmarkDesc = $('#addBookmark-description').val();
        var bookmarkTags = $('#addBookmarkTags').val().split(',').map(function (element) {
            return element.trim();
        });
        app.dataAccess.addBookmarkToCloud(bookmarkUrl, bookmarkTitle, bookmarkDesc, bookmarkTags)
            .then(function (data) {
                app.ui.success('bookmark added');
                app.ui.hideAddControls();
                app.dataAccess.getDataFromServer();
            }, function (error) {
                console.log(error);
            });
    });

    $('#addBookmark-form input[type=reset]').on('click', function (event) {
        app.ui.hideAddControls();
    });

    $('#addNew').on('click', function () {
        chrome.tabs.getSelected(null,function(tab) {
            $('#addBookmark-url').val(tab.url);
            $('#addBookmark-title').val(tab.title);
        });
        $('#addControls').toggle();
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
