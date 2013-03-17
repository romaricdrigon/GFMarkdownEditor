/*
    GFMarkdownEditor 0.2
    please see https://github.com/romaricdrigon/GFMarkdownEditor
 */
/*
    This module will load the preview,
    using a two panes view
 */
var GfmPanesPreview = (function() {
    var _previewIframe,
        _previewInnerDivId;

    var _loadPreview = function(html_text) {
        _previewIframe.contents().find(_previewInnerDivId).html(html_text);
    };

    // public methods here
    return {
        init: function(parent_id, iframe_id, inner_div_id) {
            $('#' + parent_id).removeClass().addClass('panes');

            _previewIframe = $('iframe#' + iframe_id);
            _previewInnerDivId = '#' + inner_div_id;
        },
        load: function(html_text) {
            _loadPreview(html_text);
        }
    };
})();
