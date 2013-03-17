/*
    GFMarkdownEditor 0.2
    please see https://github.com/romaricdrigon/GFMarkdownEditor
 */
/*
    This module is in charge of showing the cheat sheet (or not)
 */
var GfmCheatSheet = (function($) {
    var _loadFunc,
        _cheatSheetText;

    var _show = function() {
        _loadFunc(_cheatSheetText);
    };

    return {
        init: function(preview_func, cheat_sheet_text) {
            _loadFunc = preview_func;
            _cheatSheetText = cheat_sheet_text;
        },
        addButtons: function(toolbar_id) {
            $('#' + toolbar_id).append('&nbsp;<a href="#" id="cheatsheet-button">GFM Cheat Sheet</a>&nbsp;')
            $('#cheatsheet-button').on('click', _show);
        },
        show: _show
    };
})($);
