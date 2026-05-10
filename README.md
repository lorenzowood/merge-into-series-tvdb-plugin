# merge-into-series-tvdb-plugin

A Chromium browser extension (works in Chrome and Brave) that adds a one-click `merge-into-series` command to [TheTVDB](https://www.thetvdb.com) series pages.

## What it does

When you visit a series page on TheTVDB — for example `https://www.thetvdb.com/series/wibbly-pig` — the extension inserts a ready-to-use [`merge-into-series`](https://github.com/lorenzowood/merge-into-series) command between the series title and the description:

```
merge-into-series --add "Wibbly_Pig" "Wibbly Pig (2009) {tvdb-155021}" "https://www.thetvdb.com/series/wibbly-pig/allseasons/official"
```

The command is displayed in monospace in TVDB's own green. Click it to copy it to the clipboard; "✓ Copied" briefly confirms the copy.

Paste the command in your terminal to add the series to your `~/.merge-into-series.conf` configuration file immediately.

## Requirements

[merge-into-series](https://github.com/lorenzowood/merge-into-series) must be installed:

```bash
pipx install merge-into-series
```

## Installation

This extension is not published to the Chrome Web Store. Load it manually:

1. Clone or download this repository.
2. In Chrome or Brave, go to `chrome://extensions` / `brave://extensions`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the folder containing this repository.

The extension will activate automatically on any `thetvdb.com/series/*` page.

## How it works

On each TVDB series page the content script reads:

- **Series title** from the `<h1>` element
- **Series ID** from the favourite button's `data-id` attribute
- **Year** from the "First Aired" row in the General tab
- **Series slug** from the page URL (used to construct the `allseasons/official` URL)

It then builds a `merge-into-series --add` command and inserts it into the page between the title and the language/description block.

## Related

- [merge-into-series](https://github.com/lorenzowood/merge-into-series) — the CLI tool this plugin generates commands for
