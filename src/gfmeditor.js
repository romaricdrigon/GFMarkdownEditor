/*
 GFMarkdownEditor 0.2
 please see https://github.com/romaricdrigon/GFMarkdownEditor
 */
/*
    editor module is in charge of the edit area,
    building a nice AceEditor view
 */
var GfmEditor = (function(ace) {
        var _editor = null;
        var _session = null;

        var _setEditor = function(div_name) {
            _editor = ace.edit(div_name);
            _session = _editor.getSession();

            _editor.setTheme('ace/theme/tomorrow_night_eighties');
            _session.setMode('ace/mode/markdown');

            // free wrap mode
            _session.setUseWrapMode(true);
            _session.setWrapLimitRange();

            // use soft tabs
            _session.setUseSoftTabs(true);
            _session.setTabSize(4);

            _editor.setShowFoldWidgets(false); // useless in Markdown
        };

        return {
            init: function(div_id) {
                _setEditor(div_id);
            },
            getContent: function() {
                return _editor.getValue();
            },
            setContent: function(content) {
                _editor.setValue(content, -1); // cursor at document start
            },
            resize: function() {
                _editor.resize();
            }
        };
})(ace);
