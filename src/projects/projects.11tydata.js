module.exports = {
  layout: 'project.njk',
  eleventyComputed: {
    permalink: data => data.draft ? false : `/projects/${data.slug}/`,
    eleventyExcludeFromCollections: data => Boolean(data.draft)
  }
};
