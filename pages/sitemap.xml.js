import { checkOrCreateSitemap } from "@/lib/createInitialFiles";
import { getDomain } from "@/lib/myFun";
import fs from 'fs';
import path from 'path';

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
    
    // Read services from the JSON file
    let services = [];
    try {
      const filePath = path.join(process.cwd(), 'public/json', baseUrl, 'api_public_project_data_by_domain_data', 'services.json');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      
      if (data?.data?.[0]?.value && Array.isArray(data.data[0].value)) {
        services = data.data[0].value;
      }
    } catch (error) {
      console.error('Error reading services.json:', error);
    }
    
    // Format date
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split(".")[0] + "+00:00";
    
    // Process XSL content with proper title
    const modifiedXslContent = xslContent
      ?.replaceAll(
        "%DOMAIN%",
        `${baseUrl.startsWith("https://") ? "" : "https://"}${baseUrl}`
      )
      ?.replaceAll("%TITLE%", siteTitle);

    // Calculate number of sitemaps needed (20 services per sitemap)
    const ITEMS_PER_SITEMAP = 20;
    const totalSitemaps = Math.max(1, Math.ceil(services.length / ITEMS_PER_SITEMAP));
    
    // Create XML with references to individual sitemaps
    const sitemapindex = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="data:text/xml;charset=utf-8;base64,${Buffer.from(
      modifiedXslContent || ''
    ).toString("base64")}"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: totalSitemaps }, (_, i) => i + 1)
  .map(index => 
  `<sitemap>
    <loc>https://${baseUrl.startsWith("www.") ? baseUrl : `www.${baseUrl}`}/sitemaps/${index}</loc>
    <lastmod>${formattedDate}</lastmod>
  </sitemap>`).join("")}
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
