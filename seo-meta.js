(() => {
  const setTitle = (value) => {
    if (value) {
      document.title = value;
    }
  };

  const setMetaByName = (name, content) => {
    if (!content) return;
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  const setMetaByProperty = (property, content) => {
    if (!content) return;
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  const setLink = (rel, href) => {
    if (!href) return;
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  };

  const normalizePath = (pathname) => {
    if (!pathname || pathname === '') return '/';
    return pathname;
  };

  fetch('/seo-meta.json')
    .then((response) => response.json())
    .then((map) => {
      const pathname = normalizePath(window.location.pathname);
      const candidates = [
        pathname,
        pathname.replace(/\/index\.html$/, '/'),
        pathname.endsWith('/') ? `${pathname}index.html` : pathname,
        map.default ? 'default' : null
      ].filter(Boolean);

      const key = candidates.find((candidate) => map[candidate]);
      const entry = map[key];
      if (!entry) return;

      setTitle(entry.title);
      setMetaByName('description', entry.description);
      setLink('canonical', entry.canonical);

      setMetaByProperty('og:title', entry.ogTitle || entry.title);
      setMetaByProperty('og:description', entry.ogDescription || entry.description);
      setMetaByProperty('og:url', entry.ogUrl || entry.canonical);
      setMetaByProperty('og:type', entry.ogType || 'website');

      setMetaByName('twitter:title', entry.ogTitle || entry.title);
      setMetaByName('twitter:description', entry.ogDescription || entry.description);
    })
    .catch(() => {
      /* no-op */
    });
})();
