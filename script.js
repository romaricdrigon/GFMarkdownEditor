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

});