/*
    GFMarkdownEditor
    Main script file
    please see https://github.com/romaricdrigon/GFMarkdownEditor
 */

var GFMEditor = function(obj) {
    var _editor = ace.edit("editor");
    var _session = _editor.getSession();

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

    var bindPreview = function() {
        //_session.on('change', requestPreview); // automatic mode - later maybe!
        $('#preview-button').on('click', requestPreview);
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
                if (jqXHR.responseText.search('API Rate Limit Exceeded') !== -1) {
                    loadPreview('Oops, it seems your IP has made too much requests to Github API!');
                } else {
                    loadPreview('There was an error while connecting to Github API');
                }
            },
            success: function(data, textStatus, jqXHR) {
                loadPreview(data);
            }
        });
    };

    var loadPreview = function(content) {
        $('iframe#preview').contents().find('#inner-preview').html(content);
    };

    // public methods here
    return {
        init: function() {
            setEditor();
            bindBeforeUnload();
            loadLocalContent();
            bindPreview();
        }
    };
};