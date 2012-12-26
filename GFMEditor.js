/*
    GFMarkdownEditor
    Main script file
    please see https://github.com/romaricdrigon/GFMarkdownEditor
 */

var GFMEditor = function(obj) {
    // those will behave as private attributes
    var _editor = ace.edit("editor");
    var _session = _editor.getSession();
    var _credentials = null;

    // private methods

    var setEditor = function() {
        _editor.setTheme("ace/theme/tomorrow_night_eighties");

        _session.setMode("ace/mode/markdown");

        // free wrap mode
        _session.setUseWrapMode(true);
        _session.setWrapLimitRange();

        // use soft tabs
        _session.setUseSoftTabs(true);
        _session.setTabSize(4);

        _editor.setShowFoldWidgets(false); // useless in Markdown
    };

    var bindBeforeUnload = function() {
        window.onbeforeunload = function() {
            // we save editor content to localStorage
            if (localStorage) {
                localStorage['GFM'] = _editor.getValue();

                return "Do you really want to quit/refresh this page?\nYour document was saved";
            }

            return "Do you really want to quit/refresh this page?\nYou will lost your document";
        };
    };

    var loadLocalContent = function() {
        if (localStorage) {
            if (localStorage['GFM']) {
                _editor.setValue(localStorage['GFM'], -1); // cursor at document start
                requestPreview(); // preview!
            }
        }
    };

    var bindButtons = function() {
        //_session.on('change', requestPreview); // automatic mode - later maybe!
        $('#preview-button').on('click', requestPreview);
        $('#login-button').on('click', login);
        $('#logout-button').on('click', logout);
        $('#cheatsheet-button').on('click', function(e) {
            e.preventDefault();
            $('iframe#preview').contents().find('#inner-preview').toggle();
            $('iframe#preview').contents().find('#cheat-sheet').toggle();
        });
    };

    var requestPreview = function() {
        $.ajax({
            type: 'POST',
            url: 'https://api.github.com/markdown',
            data: JSON.stringify({
                "text": _editor.getValue(),
                "mode": "gfm"
            }),
            dataType: 'html',
            error: function(jqXHR, textStatus, errorThrown) {
                var message = JSON.parse(jqXHR.responseText).message;

                if (message.search('API Rate Limit Exceeded') !== -1) {
                    loadPreview('Oops, it seems your IP has made too much requests to Github API. You should consider login in!');
                } else if (message === 'Bad credentials') {
                    loadPreview('Your Github credentials seem to be invalid');
                    logout();
                } else {
                    loadPreview('There was an error while connecting to Github API');
                }
            },
            success: function(data, textStatus, jqXHR) {
                loadPreview(data);
            },
            beforeSend: function (xhr) {
                if (_credentials !== null) {
                    xhr.setRequestHeader('Authorization', 'Basic ' + _credentials);
                }
            }
        });
    };

    var loadPreview = function(content) {
        $('iframe#preview').contents().find('#inner-preview').html(content);
    };

    var login = function() {
        window.alert("You can login with your Github credentials. This removes the limit of 60 requests (previews) per hour. " +
                        "Your credentials are not stored on any website, and are send using SSL encryption to Github. " +
                        "They'll only remain in the memory of your computer (which is considered safe).\r\r" +
                        "Just be sure to close your browser when you're finished, and avoid this on a public computer!");

        var user = window.prompt("Please enter your Github username");
        var password = window.prompt("Please enter your Github password");

        if (user !== null && password !== null && user !== '' && password !== '') {
            _credentials = btoa(user + ':' + password);
            $('#login-text').text('Logged as ' + user + ' - ');
            $('#login-button').hide();
            $('#logout-button').show();
            requestPreview();
        } else {
            window.alert('Please enter some credentials!');
        }
    };

    var logout = function() {
        _credentials = null;
        $('#login-text').text('');
        $('#login-button').show();
        $('#logout-button').hide();
    };

    // public methods here
    return {
        init: function() {
            setEditor();
            bindBeforeUnload();
            loadLocalContent();
            bindButtons();
        }
    };
};