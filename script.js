/*
    GFMarkdownEditor
    Main script file
    please see https://github.com/romaricdrigon/GFMarkdownEditor
 */

$(document).ready(function() {
    // set up the editor
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow_night_eighties");

    var session = editor.getSession();
    session.setMode("ace/mode/markdown");

    // free wrap mode
    session.setUseWrapMode(true);
    session.setWrapLimitRange();

    // use soft tabs
    editor.getSession().setUseSoftTabs(true);
    editor.getSession().setTabSize(4);

    // warn user when refreshing page
    window.onbeforeunload = function() {
        // we save editor content to localStorage
        if (localStorage) {
            localStorage['GFM'] = editor.getValue();
            return "Do you really want to quit/refresh this page?\nYour document was saved";
        }

        return "Do you really want to quit/refresh this page?\nYou will lost your document";
    };

    // load content previously saved
    if (localStorage) {
        if (localStorage['GFM']) {
            editor.setValue(localStorage['GFM'], -1); // cursor at document start
        }
    }
});