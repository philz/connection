<a href="https://philz.github.io/connect">Connection Planner</a>

The NYT interface for connections doesn't let you think through
a bunch of options, so I wrote this using ChatGPT prompting for 99%
of it.

I ran into a bunch of "fun" issues putting this together, including:
* CORS prevented me from loading a JSON file directly from the NYT. This is a surprising limitation for a GET, so I had to download and store the data somewhere.
* GitHub actions was the nearest cron job for small data, and git was the nearest database.
* YAML is ... something ... so my shell-script in YAML didn't work because of quoting; I extracted the script into its own file.
* GNU date (on Linux) and BSD date (on OS X) have different syntax for "give me tomorrow's date". Of course they do.
* I was surprised at how easy drag and drop was; there's a `draggable` CSS property. Of course, it's experimental, and absolutely doesn't work on mobile, and the suggestions seem to be either to move the position of your element with the mouse. I chose a "swapping" interaction instead.
* Debugging iOS Safari requires a physical cable to your laptop to see the JS console.
* GitHub pages sets cache headers such that your HTML, JS, and CSS can get disjoint vis-a-vis each other. I wasn't able to find a way to cache bust easily on mobile.