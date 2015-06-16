var app = app || {};
app.ui = app.ui || {};

(function (scope) {

    function displayError(message) {
        var infoBox = $('#infoBox');
        infoBox.text(message);
    }

    function displayInfo(message) {
        var infoBox = $('#infoBox');
        infoBox.text(message);
    }

    function displayBookmarks(data) {
        var container = $('#tags');
        container.html('');
        var tags = Object.keys(data);
        tags.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });

        for (var tagIndex in tags) {
            var tag = tags[tagIndex];
            var element = $('<li>').text(tag + '(' + data[tag].length + ')').addClass('tagContainer');
            container.append(element);
            var bookmarksList = $('<ul>');
            for (var objIndex in data[tag]) {
                var linkObj = data[tag][objIndex];
                var bookmarkRow = $('<li>').attr('data-id', linkObj.id).html(createBookmark(linkObj));
                bookmarkRow.append(
                    $('<span>')
                        .text('X')
                        .css({float: 'right', cursor: 'pointer'})
                        .addClass('deleteBookmark')
                        .addClass('left')
                        .addClass('zzConfirm_active'));

                bookmarksList.append(bookmarkRow);
            }
            element.append(bookmarksList);
        }
        app.ui.success('');
    }

    function createBookmark(dataObj) {
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

    function displayAddControls() {
        $('#addControls').show();
    }

    function hideAddControls() {
        $('#addControls').hide();
    }

    function showDeleteConfirmation(id, title) {
        var box = $('#confbox');
        box.attr('data-id', id);
        box.find('p').text(title);
        box.css({visibility: 'visible'});
    }

    function hideDeleteConfirmation() {
        var box = $('#confbox');
        box.find('p').text('');
        box.attr('data-id', '');
        box.css({visibility: 'hidden'});
    }

    function removeBookmarkFromDOM(id) {
        var lis = $('#tags li[data-id=' + id + ']');
        lis.remove();
    }

    function loadCustomStyle() {
        var style = app.constants.style;
        var styleElement = $('#custom-style');
        var cssText = '';
        cssText += 'body{background-color: ' + style.bkgColor + ';}\n';
        cssText += 'body, .button, input[type=text], #tags ul li a{color: ' + style.textColor + ';}\n';
        cssText += '#tags > li {background-color: ' + style.tagColor + ';}\n';
        cssText += '#tags > li ul li:nth-of-type(n) {background-color: ' + style.eleColor1 + ';}\n';
        cssText += '#tags > li ul li:nth-of-type(2n) {background-color: ' + style.eleColor2 + ';}\n';
        styleElement.html(cssText);
    }


    scope.ui.error = displayError;
    scope.ui.success = displayInfo;
    scope.ui.displayBookmarks = displayBookmarks;
    scope.ui.selectItem = selectItem;
    scope.ui.displayAddControls = displayAddControls;
    scope.ui.hideAddControls = hideAddControls;
    scope.ui.showDeleteConfirmation = showDeleteConfirmation;
    scope.ui.hideDeleteConfirmation = hideDeleteConfirmation;
    scope.ui.removeBookmarkFromDOM = removeBookmarkFromDOM;
    scope.ui.loadCustomStyle = loadCustomStyle;


})(app);
