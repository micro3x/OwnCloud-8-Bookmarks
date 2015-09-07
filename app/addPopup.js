function createPopup() {

    if(!app.security.isLogged()){
        app.security.login();
    }else{

    }

    var fader = $('<div id="oc-fader">');
    fader.css(
        {
            background: 'rgba(0,0,0,0.5)',
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0

        }
    );

    fader.append(createControls());
    var doc = $('body');
    doc.append($('<style>').html('#oc-addControls {width: 600px;padding: 10px;margin:30px auto;background: rgba(255,255,255,0.8);border-radius: 10px;border: 1px solid gray;}' +
        '#oc-addControls #oc-addBookmark-form .oc-stretch {margin: 15px 10px;}' +
        '#oc-addControls #oc-addBookmark-form .oc-stretch input {width: 100%;padding: 5px;border: 1px solid gray;border-radius:5px;}' +
        '#oc-addControls #oc-addBookmark-form .oc-col {display: inline-block;vertical-align: top;margin-left: 10px;width: 45%;}' +
        '#oc-addControls #oc-addBookmark-form .oc-col input,#oc-addControls #oc-addBookmark-form .oc-col textarea {width: 90%;margin-bottom: 10px;padding: 5px;border: 1px solid gray;border-radius: 5px;}' +
        '#oc-addControls #oc-addBookmark-form label {display: block;vertical-align: top;}' +
        '.oc-button {padding: 5px;background-color: transparent;border: 1px solid gray;border-radius: 5px;cursor: pointer;}' +
        '.oc-save {    border: 1px solid green;}' +
        '.oc-save:hover {background-color: rgba(0, 255, 0, 0.1);}' +
        '.oc-reset{border: 1px solid red;}' +
        '.oc-reset:hover {    background-color: rgba(255, 0, 0, 0.1);}'
    ));

    doc.append(fader);
    fader.on('click', function (ev) {
        var target = $(ev.target);
        if (target.attr('id') != 'oc-fader') {
            return false;
        }
        fader.toggle();
    });


    $('.oc-button.oc-save').on('click', function () {
        alert("save");
    });

    $('.oc-button.oc-reset').on('click', function () {
        alert("reset");
    })
}

function createControls() {

    var addControls = $('<div id="oc-addControls">');
    var form = $('<form action="" id="oc-addBookmark-form">');
    var strech = $('<div class="oc-stretch">');

    strech.append($('<label for="oc-addBookmark-title">').text('Title'));
    strech.append($('<input type="text" id="oc-addBookmark-title"/>').val($(document).find("title").text()));

    var col1 = $('<div class="oc-col">');

    var url = $(location).attr('href').toString();
    console.log(url);

    col1.append(
        $('<div>')
            .append($('<label for="oc-addBookmark-url">').text('Url'))
            .append($('<input type="text" id="oc-addBookmark-url"/>').val(url)));
    col1.append(
        $('<div>')
            .append($('<label for="oc-addBookmark-description">').text('Description'))
            .append($('<input type="text" id="oc-addBookmark-description"/>')));

    var col2 = $('<div class="oc-col">');
    col2.append(
        $('<div>')
            .append($('<label for="oc-addBookmarkTags">').html('Tags separated by comma <b>( , )</b>'))
            .append($('<textarea name="tags" id="oc-addBookmarkTags" cols="30" rows="5">')));

    var formActions = $('<div class="oc-form-actions">');
    formActions.append($('<input class="oc-button oc-save" type="submit" value="Save"/>'));
    formActions.append($('<input class="oc-button oc-reset" type="reset" value="Cancel"/>'));
    form.append(strech);
    form.append(col1);
    form.append(col2);
    form.append(formActions);
    addControls.append(form);

    return addControls;
}
createPopup();