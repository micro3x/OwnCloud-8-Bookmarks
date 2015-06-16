$('#server-save').on('click', function (ev) {
    var baseURL = $('#baseUrl').val();
    var username = $('#username').val();
    var password = $('#password').val();

    chrome.storage.sync.set({
        baseUrl: baseURL,
        username: username,
        password: password
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
        password: ""
    }, function (items) {
        document.getElementById('baseUrl').value = items.baseUrl;
        document.getElementById('username').value = items.username;
        document.getElementById('password').value = items.password;
    });

});