/*
    GFMarkdownEditor 0.2
    please see https://github.com/romaricdrigon/GFMarkdownEditor
 */
/*
    this module is in charge of preview,
    this one using Github API
 */
var GapiPreview = (function() {
    var _githubCredentials,
        _previewCallback,
        _previewPending;

    var _requestPreview = function(md_text) {
        if (_previewPending === true) {
            return; // no multiple previews
        }
        _previewPending = true;
        _previewCallback('Preview pending...');

        $.ajax({
            type: 'POST',
            url: 'https://api.github.com/markdown',
            data: JSON.stringify({
                'text': md_text,
                'mode': 'gfm'
            }),
            dataType: 'html',
            error: function(jq_xhr, text_status, error_thrown) {
                if (jq_xhr.responseText === '') {
                    _requestSuccess('Unable to connect to Github API. Is you internet connection all right?');
                    return;
                }

                var message = JSON.parse(jq_xhr.responseText).message;

                if (message.search('API Rate Limit Exceeded') !== -1) {
                    _requestSuccess('Oops, it seems your IP has made too much requests to Github API. ' +
                                    'You should consider login in!');
                } else if (message === 'Bad credentials') {
                    _requestSuccess('Your Github credentials seem to be invalid');
                } else {
                    _requestSuccess('There was an error while connecting to Github API');
                }
            },
            success: function(data, text_status, jq_xhr) {
                _requestSuccess(data);
            },
            beforeSend: function(xhr) {
                if (_githubCredentials !== null) {
                    xhr.setRequestHeader('Authorization', 'Basic ' + _githubCredentials);
                }
            }
        });
    };

    var _requestSuccess = function(html_text) {
        _previewPending = false;

        _previewCallback(html_text);
    };

    // public methods here
    return {
        init: function(preview_func) {
            _previewCallback = preview_func;
        },
        preview: function(md_text) {
            _requestPreview(md_text);
        },
        setGithubCredentials: function(github_credentials) {
            _githubCredentials = github_credentials;
        }
    };
})();
