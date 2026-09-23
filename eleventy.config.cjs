const fs = require('node:fs');
const path = require('node:path');
module.exports = function (config) {
  config.setNunjucksEnvironmentOptions({ autoescape: true });
  config.addPassthroughCopy('assets');
  config.addPassthroughCopy('CNAME');
  config.addPassthroughCopy('privacypolicy.html');
  config.addPassthroughCopy('ashton_cover_letter.html');
  config.addPassthroughCopy('style.css'); // Styles for the preserved legacy cover letter.
  config.addPassthroughCopy({ 'src/styles': 'styles', 'src/scripts': 'scripts' });
  config.addFilter('year', () => new Date().getFullYear());
  config.addFilter('selectFeatured', items => items.filter(p => p.data.featured));
  config.addCollection('work', api => {
    const work = api.getFilteredByGlob('src/projects/*.md').filter(p => !p.data.draft);
    const slugs = new Set();
    for (const p of work) {
      const d = p.data;
      for (const key of ['title', 'summary', 'contribution', 'category', 'cover', 'coverAlt']) {
        if (typeof d[key] !== 'string' || !d[key].trim()) throw new Error(`${p.inputPath}: missing ${key}`);
      }
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.slug || '')) throw new Error(`${p.inputPath}: use a lowercase, hyphenated slug`);
      if (slugs.has(d.slug)) throw new Error(`Duplicate project slug: ${d.slug}`);
      slugs.add(d.slug);
      const assetPaths = [d.cover, ...(d.gallery || []).map(i => i.src), ...(d.links || []).map(i => i.url).filter(u => u.startsWith('/assets/'))];
      for (const asset of assetPaths) {
        if (!asset.startsWith('/assets/') || !fs.existsSync(path.join(__dirname, asset.slice(1)))) throw new Error(`${p.inputPath}: missing asset ${asset}`);
      }
    }
    return work.sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100) || a.data.title.localeCompare(b.data.title));
  });
  config.addCollection('categories', api => [...new Set(api.getFilteredByGlob('src/projects/*.md').filter(p => !p.data.draft).map(p => p.data.category))].sort());
  return { dir: { input: 'src', output: '_site', includes: '_includes', data: '_data' }, markdownTemplateEngine: 'njk', htmlTemplateEngine: 'njk' };
};
