import { checkOrCreateSitemap } from "@/lib/createInitialFiles";
import { getDomain, getSitemaps } from "@/lib/myFun";

const Sitemap = () => {
  return null; // This component doesn't render anything
};

console.log("sitemap.xml.js module loaded");

export const getServerSideProps = async ({ req, res }) => {
  try {
    const baseUrl = getDomain(req?.headers?.host);
    const xslContent = checkOrCreateSitemap({ DOMAIN: baseUrl });
    
    // Extract domain name for the title
    const domainName = baseUrl.replace(/^www\./, '').split('.')[0];
    const siteTitle = domainName.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Fetch sitemaps safely
    let sitemaps = [];
    try {
      sitemaps = await getSitemaps({ domain: baseUrl }) || [];
    } catch (error) {
      console.error("Error fetching sitemaps:", error);
    }

    // Format date
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();
    const isoDateParts = isoDate.split("T");
    const datePart = isoDateParts[0];
    const timePart = isoDateParts[1]?.split(".")[0];
    const formattedDate = `${datePart}T${timePart}+00:00`;
    
    // Process XSL content with proper title
    const modifiedXslContent = xslContent
      ?.replaceAll(
        "%DOMAIN%",
        `${baseUrl.startsWith("https://") ? "" : "https://"}${baseUrl}`
      )
      ?.replaceAll("%TITLE%", siteTitle);

    // Create XML
    const sitemapindex = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="data:text/xml;charset=utf-8;base64,${Buffer.from(
      modifiedXslContent || ''
    ).toString("base64")}"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.isArray(sitemaps) && sitemaps.length > 0 
  ? sitemaps.map((sitemap, index) => 
      `<sitemap>
    <loc>${baseUrl.startsWith("https://") ? baseUrl : `https://${baseUrl.startsWith("www.") ? baseUrl : `www.${baseUrl}`}`}/sitemaps/${index + 1}</loc>
    <lastmod>${formattedDate}</lastmod>
  </sitemap>`).join("")
  : `<sitemap>
    <loc>https://${baseUrl.startsWith("www.") ? baseUrl : `www.${baseUrl}`}</loc>
    <lastmod>${formattedDate}</lastmod>
  </sitemap>`}
</sitemapindex>`;
    
    // Send response
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapindex);
    res.end();
  } catch (error) {
    console.error("Error generating sitemap:", error);
    
    // Send a simple sitemap instead of error
    res.setHeader("Content-Type", "text/xml");
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://${req?.headers?.host || 'boston-chimney.com'}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`);
    res.end();
  }

  return {
    props: {},
  };
};

export default Sitemap;
