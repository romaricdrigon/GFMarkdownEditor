/*
    GFMarkdownEditor 0.2
    please see https://github.com/romaricdrigon/GFMarkdownEditor
 */
/*
    This module is in charge of login to GitHub,
    to use the Github API.
    It will take care of login/logout button too.
 */
var GfmGithubAuth = (function(window) {
    var _loginButton,
        _logoutButton,
        _onLogin,
        _onLogout;

    var _login = function() {
        window.alert("You can login with your Github credentials. This removes the limit of 60 requests (previews) " +
            "per hour. Your credentials are not stored on any website, and are send using SSL encryption to Github. " +
            "They'll only remain in the memory of your computer (which is considered safe).\r\r" +
            "Just be sure to close your browser when you're finished, and avoid this on a public computer!");

        var user = window.prompt("Please enter your Github username");
        var password = window.prompt("Please enter your Github password");

        if (user !== null && password !== null && user !== '' && password !== '') {
            _loginButton.hide();
            _logoutButton.show();

            _onLogin(btoa(user + ':' + password));
        } else {
            window.alert('Please enter some credentials!');
        }
    };

    var _logout = function() {
        _loginButton.show();
        _logoutButton.hide();

        _onLogout();
    };

    return {
        init: function(loginButtonId, logoutButtonId, onLogin, onLogout) {
            _onLogin = onLogin;
            _onLogout = onLogout;

            _loginButton = $('#' + loginButtonId);
            _loginButton.on('click', _login);

            _logoutButton = $('#' + logoutButtonId);
            _logoutButton.on('click', _logout);
            _logoutButton.hide();
        },
        login: _login,
        logout: _logout
    };
})(window);
