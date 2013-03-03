# GFMarkdown Editor

This is an online Markdown editor with live preview. 

Its specificity is to support [Github Flavored Markdown](http://github.github.com/github-flavored-markdown/): I was not able to find any tool for it, except the inline editor on Github website (but you can't have at the same time the editor and the preview!).

It uses Github API to get a preview. Anonymous users are limited to 60 requests/hour. You can login using your Github credentials to get up to 5000 requests/hour.

Other features include a decent editor (using Ace Editor), with syntax highlighting, the ability to save a document to localStorage (automatically when you try to leave the page), access to GFM cheat sheet.

## Online demo

You can test/use it here: [http://gfmeditor.romaricdrigon.fr/](http://gfmeditor.romaricdrigon.fr/)

The demo maybe outdated regarding this Github repository!

## Quick install

It uses [Twitter Bower](https://github.com/twitter/bower) to fetch assets, just run ```bower install```

From a local webserver, everything should run fine. Just open `index_dev.html` with a browser.
**Note**: it seems Github, as of 2013-03-03, does not allow anymore `localhost` host for requests, unless you are logged in.

To use it from a webdomain, as documented [here](http://developer.github.com/v3/#cross-origin-resource-sharing), you must register your application on Github as an [OAuth application](https://github.com/settings/applications) (fill up the form, the callback URL doesn't really matter).

## Credits

A few very handy libraries were used:
 * [jQuery](http://jquery.com/)
 * [Ace Editor](http://ace.ajax.org/), with Tomorrow night 80s theme and Markdown mode
 * stylesheets for preview come from [this repository](https://github.com/github/github-flavored-markdown)
 * GFM Cheat Sheet was included

Finally, it relies on [Github v3 API](http://developer.github.com/v3/markdown/). 
Of course this readme was made using it!
