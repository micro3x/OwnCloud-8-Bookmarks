(function () {
    var fader = $('<div id="oc-fader">');
    fader.css(
        {
            background: 'rgba(0,0,0,0.5)',
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            "z-index": 10000

        }
    );

    fader.html(modalView());


    var doc = $('body');
    doc.append(fader);
    fader.on('click', function (ev) {
        var target = $(ev.target);
        if (target.attr('id') == 'oc-fader' || target.attr('id') == 'oc-reset') {
            fader.toggle();
            fader.remove();
        }
        return false;
    });


    var saveButton = $('#oc-modal-box #oc-addBookmark-form .oc-form-actions #oc-save');
    saveButton.on('click', function () {
        fader.toggle();
        chrome.runtime.sendMessage({
            "desc": $('#oc-addBookmark-description').val(),
            "tags": $('#oc-addBookmarkTags').val()
        });
        fader.remove();
    });

    $('#oc-addBookmark-form').submit(function (evt) {
        evt.preventDefault();
    });


    function modalView() {
        return '<div id="oc-modal-box">' +
            '<form action="" id="oc-addBookmark-form">' +
            '<div class="oc-stretch">' +
            '<label for="oc-addBookmark-title">Title</label>' +
            '<input type="text" id="oc-addBookmark-title" value="' + $(document).find("title").text() + '" />' +
            '</div>' +
            '<div class="oc-col">' +
            '<div>' +
            '<label for="oc-addBookmark-url">Url</label>' +
            '<input type="text" id="oc-addBookmark-url" value="' + window.location.href + '"/>' +
            '</div>' +
            '<div>' +
            '<label for="oc-addBookmark-description">Description</label>' +
            '<input type="text" id="oc-addBookmark-description"/>' +
            '</div>' +
            '</div>' +
            '<div class="oc-col">' +
            '<label for="oc-addBookmarkTags">Tags separated by comma <b>( , )</b></label>' +
            '<textarea name="tags" id="oc-addBookmarkTags" cols="30" rows="5"></textarea>' +
            '</div>' +
            '<div class="oc-form-actions">' +
            '<input id="oc-save" type="button" value="Save"/>' +
            '<input id="oc-reset" type="reset" value="Cancel" />' +
            '</div>' +
            '</form>' +
            '</div>';

    }

})();
