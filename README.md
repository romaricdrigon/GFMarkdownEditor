# GFMMarkdown Editor

This is an online (in the browser) editor with live preview. 

Its specificity is to support [Github Flavored Markdown](http://github.github.com/github-flavored-markdown/): I was not able to find any tool for it, except the inline editor on Github website (but you can't have at the same time the editor and the preview!).

It uses [Github API](http://developer.github.com/v3/markdown/) to get a preview. Anonymous users are limited to 60 requests/hour. You can login using your Github credentials to get up to 5000 requests/hour.

## Online demo

Coming soon!

## Requirements

It uses [Twitter Bower](https://github.com/twitter/bower) to fetch assets, just run ```bower install```

## Credits

A few very handy libraries were used:
 * [jQuery](http://jquery.com/)
 * [Ace Editor](http://ace.ajax.org/), with Tomorrow night 80s theme and Markdown mode
 * stylesheets for preview come from [this repository](https://github.com/github/github-flavored-markdown)
 * GFM Cheat Sheet was included

Finally, it relies on [Github v3 API](http://developer.github.com/v3/markdown/). 
Of course this readme was made using it!