module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");

  // Data files in src/_data/ are auto-loaded by Eleventy:
  // meta.json → {{ meta.siteTitle }}, home.json → {{ home.headline }}, etc.

  // Markdown-lite filter: **bold** and *italic*
  eleventyConfig.addFilter("md", function (str) {
    if (!str) return "";
    return str
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  });

  // Map status color keywords to CSS class names
  eleventyConfig.addFilter("statusClass", function (color) {
    const map = { red: "badge--red", green: "badge--green", yellow: "badge--yellow", blue: "badge--blue" };
    return map[color] || "badge--blue";
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
