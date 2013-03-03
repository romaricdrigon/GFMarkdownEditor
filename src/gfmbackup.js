/*
    GFMarkdownEditor 0.2
    please see https://github.com/romaricdrigon/GFMarkdownEditor
 */
/*
    this module is in charge of onLoadbackup to localStorage
    and restore
 */
var GfmBackup = (function(window) {
    var _getContent = null;
    var _onLoad = null;

    var _bindBeforeUnload = function() {
        window.onbeforeunload = function() {
            // we save content to localStorage
            if (localStorage) {
                localStorage['GFM'] = _getContent();

                return "Do you really want to quit/refresh this page?\nYour document was saved";
            }

            return "Do you really want to quit/refresh this page?\nYou will lost your document";
        };
    };

    var _backupToLocalStorage = function(content) {
        if (localStorage) {
            localStorage['GFM'] = content;

            return true;
        } else {
            return false; // backup was not done
        }
    };

    var _loadFromLocalStorage = function() {
        if (localStorage) {
            if (localStorage['GFM']) {
                return localStorage['GFM'];
            }
        }

        return false; // fail
    };

    // public methods here
    return {
        init: function(onLoad, getContent, bindAtUnload) {
            _onLoad = onLoad;
            _getContent = getContent;

            if (bindAtUnload === true) {
                _bindBeforeUnload();
                this.load(); // load what may have been saved before
            }
        },
        backup: function() {
            return _backupToLocalStorage(_getContent());
        },
        load: function() {
            _onLoad(_loadFromLocalStorage());
        }
    };
})(window);
