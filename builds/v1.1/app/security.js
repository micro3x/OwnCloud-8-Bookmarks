var app = app || {};
app.security = app.security || {};

(function (scope) {
    function login(username, password) {
        app.ui.success('Connecting...');
        var fd = new FormData();
        fd.append('user', username);
        fd.append('password', password);
        var deffered = Q.defer();

        $.ajax({
            url: scope.constants.baseURL,
            type: 'GET'
        }).success(function (data) {
            var rt = data.match(/data-requesttoken="(.*)"/);
            if(!rt || rt.length < 2){
                app.ui.error('missing request token.');
                return;
            }
            fd.append('requesttoken', rt[1]);
            $.ajax({
                url: scope.constants.baseURL,
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                success: function (data) {
                    scope.constants.accessToken = data.match(/data-requesttoken="(.*)"/)[1];
                    deffered.resolve();
                },
                error: function (error) {
                    app.ui.error('can\'t login');
                    deffered.reject();
                }
            });
        }).error(function (error) {
            app.ui.error('cannot connect to server');
        });
        return deffered.promise;
    }

    function isLogged() {
        if (scope.constants.accessToken) {
            return true;
        }
        return false;
    }

    scope.security.isLogged = isLogged;
    scope.security.login = login;

})(app);