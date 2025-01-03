const fs = require("fs");
const path = require("path");

// Base URL for your website
const BASE_URL = "https://getchromacreative.com";

// Directory where HTML files are stored
const PUBLIC_DIR = path.join(__dirname, "public");

// File to save the generated sitemap
const SITEMAP_FILE = path.join(PUBLIC_DIR, "sitemap.xml");

// Function to read metadata from an HTML file
function extractMetadata(htmlFilePath) {
  const htmlContent = fs.readFileSync(htmlFilePath, "utf-8");

  // Extract metadata from <script id="pageMeta"> in the HTML
  const metaMatch = htmlContent.match(
    /<script id="pageMeta" type="application\/json">(.*?)<\/script>/s,
  );

  if (metaMatch) {
    return JSON.parse(metaMatch[1]);
  }

  return null; // Return null if no metadata is found
}

// Generate the sitemap
function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Iterate over all files in the public directory
  fs.readdirSync(PUBLIC_DIR).forEach((file) => {
    if (file.endsWith(".html")) {
      const filePath = path.join(PUBLIC_DIR, file);
      const metadata = extractMetadata(filePath);

      if (metadata) {
        sitemap += `
    <url>
        <loc>${BASE_URL}${metadata.permalink}</loc>
        <lastmod>${metadata.lastmod}</lastmod>
        <priority>${metadata.priority || "0.5"}</priority>
    </url>`;
      }
    }
  });

  sitemap += `\n</urlset>`;

  // Save the sitemap to the public directory
  fs.writeFileSync(SITEMAP_FILE, sitemap, "utf-8");
  console.log(`Sitemap generated: ${SITEMAP_FILE}`);
}

// Run the script
generateSitemap();
