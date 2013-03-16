/*
    GFMarkdownEditor 0.2
    please see https://github.com/romaricdrigon/GFMarkdownEditor
 */
/*
    this is the "view" of the preview,
    here in the left pane
 */
var LeftPanePreView = (function() {
    var _previewIframe,
        _previewInnerDivId;

    var _loadPreview = function(html_text) {
        _previewIframe.contents().find(_previewInnerDivId).html(html_text);
    };

    // public methods here
    return {
        init: function(iframe_id, inner_div_id) {
            _previewIframe = $('iframe#' + iframe_id);
            _previewInnerDivId = '#' + inner_div_id;
        },
        load: function(html_text) {
            _loadPreview(html_text);
        }
    };
})();
