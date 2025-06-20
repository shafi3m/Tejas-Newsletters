const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Add readable date filter using Luxon
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "MMMM d, yyyy"
    );
  });

  // Slugify filter
  eleventyConfig.addFilter("slug", (str) => {
    if (!str) return "";
    return str.toLowerCase().replace(/[^\w]+/g, "-");
  });

  // Read time filter
  eleventyConfig.addFilter("readTime", (content) => {
    const text = content.replace(/(<([^>]+)>)/gi, "");
    const words = text.split(" ").length;
    return Math.ceil(words / 200); // 200 words per minute
  });

  // Passthrough copies
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/tejas");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Collections
  eleventyConfig.addCollection("newsletters", function (collection) {
    return collection.getFilteredByGlob("src/newsletters/*.md").reverse();
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
