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

    // we need a preview loader objet
    GfmPreviewLoader.init('preview', 'inner-preview');

    // we choose two equally sized panes mode

    // we use Github API for preview
    GapiPreview.init(GfmPreviewLoader.load);
    var previewer = GapiPreview;

    // preview when the user clicks a button
    $('#preview-button').on('click', function(e) {
        e.preventDefault();
        previewer.preview(GfmEditor.getContent());
    });

    // user can log in using his GitHub Account
    GfmGithubAuth.init(
        function(credentials) {
            previewer.setGithubCredentials(credentials);
            previewer.preview(GfmEditor.getContent()); // preview after login
        },
        function() {
            GapiPreview.setGithubCredentials(null); // only GapiPreview have a such method
        }
    );
    GfmGithubAuth.addButtons('toolbar');

    // lastly, content will be saved when user try to leave
    GfmBackup.init(
        function(text) {
            GfmEditor.setContent(text);
            previewer.preview(text);
        },
        GfmEditor.getContent,
        true
    );

    // we add the GFM cheatsheet
    GfmCheatSheet.init(GfmPreviewLoader.load, $('#cheat-sheet').html());
    GfmCheatSheet.addButtons('toolbar');
});
