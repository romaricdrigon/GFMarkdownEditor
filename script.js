/*
    GFMarkdownEditor 0.2
    Example script
    please see https://github.com/romaricdrigon/GFMarkdownEditor
 */
/*
    Our app is composed of loosely-coupled modules
    Here we do the strapping between modules and with our UI,
    that's just an example script
 */
$(document).ready(function() {
    // set up an editor in "#editor" div
    GfmEditor.init('editor');

    // we use Github API for preview
    GapiPreview.init('preview', 'inner-preview');
    // preview when the user clicks a button
    $('#preview-button').on('click', function(e) {
        e.preventDefault();
        GapiPreview.preview(GfmEditor.getContent());
    });

    // user can log in using his GitHub Account
    GfmGithubAuth.init(
        'login-button',
        'logout-button',
        function(credentials) {
            GapiPreview.setGithubCredentials(credentials);
        },
        function() {
            GapiPreview.setGithubCredentials(null);
        }
    );

    // lastly, content will be saved when user try to leave
    GfmBackup.init(
        function(text) {
            GfmEditor.setContent(text);
            GapiPreview.preview(text);
        },
        GfmEditor.getContent,
        true
    );

    // we added the GFM cheatsheet
    $('#cheatsheet-button').on('click', function(e) {
        e.preventDefault();

        $('iframe#preview').contents().find('#inner-preview').toggle();
        $('iframe#preview').contents().find('#cheat-sheet').toggle();
    });
});
