# TODO

Issues discovered while processing Star Trek: Voyager DVD rips (June 2026).

---

## Extension: always generates "official" episode order URL, not DVD order

**Problem:** The extension always generates an `allseasons/official` URL. When the source files are DVD rips, the episode numbering can differ from the official broadcast order — for example, two-part episodes combined on DVD shift all subsequent numbers. This causes `merge-into-series` to match episodes incorrectly (off-by-one or worse).

Star Trek: Voyager is a confirmed case. The workaround is to manually edit `~/.merge-into-series.conf` to replace `/allseasons/official` with `/allseasons/dvd`.

**Likely fix options:**

- **Option A (simple):** After inserting the command, also display a secondary "DVD order" command using `allseasons/dvd`, so the user can copy it instead if needed. TheTVDB doesn't always have a DVD order, but when it does the URL is predictable.

- **Option B (smarter):** Detect whether a DVD order tab/link exists on the current TVDB page and, if so, add a toggle or a second command line below the official one.

- **Option C (proper fix, requires merge-into-series changes first):** Generate a `--add` command that registers *both* the official and DVD URLs for the same series. When matching, `merge-into-series` would consult all registered episode lists and pick the best match across all of them. This would handle Voyager cleanly without needing to know in advance which ordering your files use.

Option A is the simplest stopgap. Option C is the right long-term solution but depends on `merge-into-series` growing support for multiple episode list URLs per series — see TODO.md in that project.
