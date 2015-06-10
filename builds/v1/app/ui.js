var app = app || {};
app.ui = app.ui || {};

(function (scope) {

    function displayError(message){
        var infoBox = $('#infoBox');
        infoBox.text(message);
    }

    function displayInfo(message){
        var infoBox = $('#infoBox');
        infoBox.text(message);
    }


    function displayBookmarks(data){
        var container = $('#tags');
        container.html('');
        var tags = Object.keys(data);
        tags.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });

        for (var tagIndex in tags) {
            var tag = tags[tagIndex];
            var element = $('<li>').text(tag + '(' + data[tag].length + ')');
            container.append(element);
            var bookmarksList = $('<ul>');
            for (var objIndex in data[tag]) {
                var linkObj = data[tag][objIndex];
                bookmarksList.append($('<li>').html(createBookmark(linkObj)));
            }
            element.append(bookmarksList);
        }
        app.ui.success('');
    }

    function createBookmark(dataObj){
        var link = $('<a>');
        link.attr('href', dataObj.url);
        link.attr('target', '_blank');
        link.attr('title', dataObj.description);
        link.text(dataObj.title);
        return link;
    }

    function clearSelectedTag() {
        var list = $('#tags');
        var item = list.find('.selected');
        item.removeClass('selected');
    }

    function selectItem(item) {
        clearSelectedTag();
        $(item).addClass('selected');
    }

    scope.ui.error = displayError;
    scope.ui.success = displayInfo;
    scope.ui.displayBookmarks = displayBookmarks;
    scope.ui.selectItem = selectItem;

})(app);
