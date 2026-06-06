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

Characters that are illegal or problematic in directory names or Plex parsing (`? : * / \ | < > "`) are replaced with safe substitutes in the directory argument only — for example `Are You Being Served?` becomes `Are You Being Served!` as the target directory, while the config key keeps the original punctuation. The substitution map matches the one used by [plex_name_formatter_extension](https://github.com/lorenzowood/plex_name_formatter_extension) for consistency.

## Episode ordering and DVD rips

The extension always generates a URL pointing to the **official** episode order (`allseasons/official`). This matches the standard broadcast order on TheTVDB.

If you are working with DVD rips, the numbering may differ — for example, some two-part episodes are combined into a single entry on the DVD release, which shifts all subsequent episode numbers. Star Trek: Voyager is a known case of this.

TheTVDB often has a separate **DVD order** listing (`allseasons/dvd`) with the correct numbering for those releases. If you find episode numbers are off, edit the relevant entry in `~/.merge-into-series.conf` and replace `/allseasons/official` with `/allseasons/dvd` — for example:

```
Star_Trek:_Voyager,Star Trek -- Voyager (1995) {tvdb-74550},https://www.thetvdb.com/series/star-trek-voyager/allseasons/dvd
```

## Related

- [merge-into-series](https://github.com/lorenzowood/merge-into-series) — the CLI tool this plugin generates commands for
