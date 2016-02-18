var customStyle = {};

$('#server-save').on('click', function () {
    var baseURL = $('#baseUrl').val();
    var username = $('#username').val();
    var password = $('#password').val();

    chrome.storage.sync.set({
        baseUrl: baseURL,
        username: username,
        password: password,
        style: customStyle
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
});

$('document').ready(function () {
    // Use default value color = 'red' and likesColor = true.
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
        document.getElementById('baseUrl').value = items.baseUrl;
        document.getElementById('username').value = items.username;
        document.getElementById('password').value = items.password;
        customStyle = items.style;
        updatePreview(customStyle);
    });

});

$('#custom-style-controls').on('submit', function (event) {
    event.preventDefault();
    chrome.storage.sync.set({
        style: customStyle
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
});

$('#reset-style').on('click', function () {
    customStyle = {
        bkgColor: '#FFFFFF',
        tagColor: '#d3d3d3',
        textColor: '#000000',
        eleColor2: '#d3d3d3',
        eleColor1: '#FFFFFF'
    };
    updatePreview(customStyle);
});

function updatePreview(style) {
    var styleElement = $('#custom-style-preview');
    var cssText = '';
    cssText += '.style-preview-body{background-color: ' + style.bkgColor + ';}\n';
    cssText += '.style-preview-body, #tags ul li a{color: ' + style.textColor + ';}\n';
    cssText += '#tags > li {background-color: ' + style.tagColor + ';}\n';
    cssText += '#tags > li ul li:nth-of-type(n) {background-color: ' + style.eleColor1 + ';}\n';
    cssText += '#tags > li ul li:nth-of-type(2n) {background-color: ' + style.eleColor2 + ';}\n';
    styleElement.html(cssText);
    $('#style-background').val(style.bkgColor);
    $('#style-text').val(style.textColor);
    $('#style-tag').val(style.tagColor);
    $('#style-book1').val(style.eleColor1);
    $('#style-book2').val(style.eleColor2);
}


$('#style-background').on('change', function (ev) {
    var target = $(ev.target);
    customStyle.bkgColor = target.val();
    updatePreview(customStyle);
});

$('#style-tag').on('change', function (ev) {
    var target = $(ev.target);
    customStyle.tagColor = target.val();
    updatePreview(customStyle);
});

$('#style-text').on('change', function (ev) {
    var target = $(ev.target);
    customStyle.textColor = target.val();
    updatePreview(customStyle);
});

$('#style-book2').on('change', function (ev) {
    var target = $(ev.target);
    customStyle.eleColor2 = target.val();
    updatePreview(customStyle);
});

$('#style-book1').on('change', function (ev) {
    var target = $(ev.target);
    customStyle.eleColor1 = target.val();
    updatePreview(customStyle);
});
