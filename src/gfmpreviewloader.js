/*
    GFMarkdownEditor 0.2
    please see https://github.com/romaricdrigon/GFMarkdownEditor
 */
/*
    this is the "view" of the preview,
    here in the left pane
 */
var GfmPreviewLoader = (function() {
    var _previewIframe,
        _previewInnerDivId,
        _parentDiv,
        _mode,
        _onModeChange;

    var _loadPreview = function(html_text) {
        _previewIframe.contents().find(_previewInnerDivId).html(html_text);
    };

    var _changeMode = function() {
        if (_mode === 'panes') {
            _parentDiv.removeClass().addClass('panes');
            $('#gliimpse-button').show();
            $('#panes-button').hide();
        } else if (_mode === 'gliimpse') {
            _parentDiv.removeClass().addClass('gliimpse');
            $('#gliimpse-button').hide();
            $('#panes-button').show();
        }

        if (typeof(_onModeChange) === 'function') {
            _onModeChange();
        }
    };

    // public methods here
    return {
        init: function(parent_id, iframe_id, inner_div_id, on_mode_change) {
            _onModeChange = on_mode_change;
            _parentDiv = $('#' + parent_id);
            _previewIframe = $('iframe#' + iframe_id);
            _previewInnerDivId = '#' + inner_div_id;
        },
        load: function(html_text) {
            _loadPreview(html_text);
        },
        setMode: function(mode) {
            _mode = mode;
            _changeMode();
        },
        addButtons: function(toolbar_id) {
            $('#' + toolbar_id).append('&nbsp;<a href="#" id="gliimpse-button">Gliimpse mode</a>' +
                                        '<a href="#" id="panes-button">Two panes mode</a>&nbsp;');

            $('#gliimpse-button').on('click', function(e) {
                    e.preventDefault();
                    GfmPreviewLoader.setMode('gliimpse');
            });
            $('#panes-button').on('click', function(e) {
                    e.preventDefault();
                    GfmPreviewLoader.setMode('panes');
            });
        }
    };
})();
