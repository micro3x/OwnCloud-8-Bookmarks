var app = app || {};
app.dataAccess = app.dataAccess || {};
app.data = app.data || {};
app.data.serverData = app.data.serverData || [];
app.data.localData = app.data.localData || [];

(function (scope) {

    function getDataFromStorage() {
        var strData = localStorage.getItem('bookMarksData');
        if (strData) {
            app.data.localData = JSON.parse(strData);
        }
    }

    function saveDataToStorage(data) {
        if (data) {
            localStorage.setItem('bookMarksData', JSON.stringify(data));
        }
    }

    function getDataFromServer(page) {
        app.ui.success('Updating Data...');
        var currentPage = page;
        if (!currentPage) {
            currentPage = 0;
        }
        getBookmarkPage(currentPage).then(
            function (success) {
                if (success.data.length > 0) {
                    scope.data.serverData = scope.data.serverData.concat(success.data);
                    getDataFromServer(currentPage + 1);
                } else {
                    refreshLocalData(scope.data.serverData);
                }
            },
            function (error) {

            })
    }

    function getBookmarkPage(page) {
        var deffered = Q.defer();

        $.ajax(
            app.constants.baseURL + app.constants.path + 'bookmark?type=bookmark&page=' + page,
            {
                metthod: "GET",
                headers: {
                    requesttoken: app.constants.accessToken
                }
            })
            .success(function (data) {
                deffered.resolve(data);
            })
            .error(
            function (error) {
                deffered.reject(error);
            });
        return deffered.promise;
    }

    function getServerTags() {
        var deffered = Q.defer();
        $.ajax(
            app.constants.baseURL + app.constants.path + 'tag',
            {
                metthod: "GET",
                headers: {
                    requesttoken: app.constants.accessToken
                }
            }).success(function (data) {
                deffered.resolve(data);
            }).error(function (error) {
                deffered.reject(error);
            });
        return deffered.promise;
    }

    function refreshLocalData(data) {
        app.data.localData = buildDataModel(data);
        saveDataToStorage(app.data.localData);
        app.ui.displayBookmarks(app.data.localData);
    }

    function buildDataModel(data) {
        var dataTags = {untaged: []};
        for (var linkIndex in data) {
            var objLink = data[linkIndex];
            for (var tagIndex in objLink['tags']) {
                var tag = objLink['tags'][tagIndex];
                if (tag) {
                    if (!dataTags[tag]) {
                        dataTags[tag] = [];
                    }
                    dataTags[tag].push(objLink);
                } else {
                    dataTags['untaged'].push(objLink);
                }
            }
        }
        return dataTags;
    }

    function addBookmarkToCloud(url, title, description, tags) {
        if (!url) {
            app.ui.error('missing URL');
        }
        if (!title) {
            app.ui.error('missing title');
        }
        var deffered = Q.defer();

        var fd = new FormData();

        fd.append('url', url);
        fd.append('title', title);
        fd.append('description', description);
        for (var tagIndex in tags) {
            fd.append('item[tags][]', tags[tagIndex]);
        }

        $.ajax({
            url: scope.constants.baseURL + scope.constants.path + 'bookmark',
            headers: {
                requesttoken: app.constants.accessToken
            },
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                app.ui.success('bookmark Saved');
                deffered.resolve();
            },
            error: function (error) {
                app.ui.error('can\'t save bookmark');
                deffered.reject();
            }
        });

        return deffered.promise;

    }

    function filterLocalData(searchString) {
        var regex = new RegExp('.*' + searchString.toLowerCase() + '.*', 'g');
        var outputData = {};

        for (var tag in scope.data.localData) {
            var bookmarks = scope.data.localData[tag];

            var matchingValues = [];

            for (var bMarkIndex in bookmarks) {
                var bookmark = bookmarks[bMarkIndex];
                if (bookmark['title'].toLowerCase().match(regex)) {
                    matchingValues.push(bookmark);
                }
            }

            if (matchingValues.length > 0) {
                outputData[tag] = matchingValues;
            }

        }

        return outputData;
    }

    function deleteBookmark(id) {
        var deffered = Q.defer();
        $.ajax(
            app.constants.baseURL + app.constants.path + 'bookmark/' + id,
            {
                method: "DELETE",
                headers: {
                    requesttoken: app.constants.accessToken
                }
            }).success(function (data) {
                deffered.resolve(data);
            }).error(function (error) {
                deffered.reject(error);
            });
        return deffered.promise;
    }

    scope.dataAccess.getDataFromServer = getDataFromServer;
    scope.dataAccess.getDataFromStorage = getDataFromStorage;
    scope.dataAccess.saveDataToStorage = saveDataToStorage;
    scope.dataAccess.getServerTags = getServerTags;
    scope.dataAccess.addBookmarkToCloud = addBookmarkToCloud;
    scope.dataAccess.filterLocalData = filterLocalData;
    scope.dataAccess.deleteBookmark = deleteBookmark;

})(app);