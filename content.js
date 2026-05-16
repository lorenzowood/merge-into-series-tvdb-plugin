(function () {
  const h1 = document.querySelector('h1#series_title');
  const translationsBlock = document.getElementById('translations');
  if (!h1 || !translationsBlock) return;

  // Series title
  const title = h1.textContent.trim();

  // Series ID from the favourite button's data-id attribute
  const favBtn = document.querySelector('a.favorite_button[data-type="series"][data-id]');
  if (!favBtn) return;
  const seriesId = favBtn.dataset.id;

  // Year from the "First Aired" row
  let year = '';
  for (const li of document.querySelectorAll('#series_basic_info .list-group-item')) {
    const strong = li.querySelector('strong');
    if (strong && strong.textContent.trim() === 'First Aired') {
      const m = li.textContent.match(/\b((?:19|20)\d{2})\b/);
      if (m) year = m[1];
      break;
    }
  }

  // Slug from the current URL path
  const slugMatch = window.location.pathname.match(/^\/series\/([^/]+)/);
  if (!slugMatch) return;
  const slug = slugMatch[1];

  // Replace characters that are illegal or problematic in directory names / Plex parsing.
  // Matches the substitution map used by plex_name_formatter_extension.
  function sanitizeTitle(s) {
    return s.replace(/[<>:"\/\\|?*]/g, match => {
      switch (match) {
        case '<':  return '(';
        case '>':  return ')';
        case ':':  return ' --';
        case '"':  return "'";
        case '/':  return ' or ';
        case '\\': return ' or ';
        case '|':  return ',';
        case '?':  return '!';
        case '*':  return 'x';
        default:   return '_';
      }
    });
  }

  // Build the command
  const safeTitle = sanitizeTitle(title);
  const name = safeTitle.replace(/\s+/g, '_').replace(/,/g, '');
  const dir = year ? `${safeTitle} (${year}) {tvdb-${seriesId}}` : `${safeTitle} {tvdb-${seriesId}}`;
  const tvdbUrl = `https://www.thetvdb.com/series/${slug}/allseasons/official`;
  const command = `merge-into-series --add "${name}" "${dir}" "${tvdbUrl}"`;

  // Match the green used by the active tab / nav links on the page
  const green = (() => {
    const activeTab = document.querySelector('.tvdb-tabs [role="presentation"].active a');
    if (activeTab) return getComputedStyle(activeTab).color;
    const btn = document.querySelector('.btn-success');
    if (btn) return getComputedStyle(btn).backgroundColor;
    return '#5cb85c';
  })();

  // Build the element
  const el = document.createElement('div');
  el.textContent = command;
  Object.assign(el.style, {
    fontFamily: 'monospace',
    fontSize: '1em',
    color: green,
    cursor: 'pointer',
    margin: '8px 0 12px 0',
    wordBreak: 'break-all',
  });

  el.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      // Fallback for environments where clipboard API is unavailable
      const ta = document.createElement('textarea');
      ta.value = command;
      Object.assign(ta.style, { position: 'fixed', opacity: '0' });
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    const original = el.textContent;
    el.textContent = command + ' ✓ Copied';
    setTimeout(() => { el.textContent = original; }, 2000);
  });

  translationsBlock.parentNode.insertBefore(el, translationsBlock);
})();
