import { getDomain, getImagePath } from "@/lib/myFun";
import { checkOrCreateSitemap } from "@/lib/createInitialFiles";
import fs from 'fs';
import path from 'path';

const ServiceSitemap = () => null;

export const getServerSideProps = async ({ req, res, params }) => {
  try {
    const baseUrl = getDomain(req?.headers?.host);
    const xslContent = checkOrCreateSitemap({ DOMAIN: baseUrl });
    
    // Extract domain name for the title
    const domainName = baseUrl.replace(/^www\./, '').split('.')[0];
    const siteTitle = domainName.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Get the sitemap id
    const id = +params.id || 1;
    
    // Format date for lastmod
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split(".")[0] + "+00:00";
    
    // Read services directly from the JSON file
    let services = [];
    let projectId = null;
    try {
      const filePath = path.join(process.cwd(), 'public/json', baseUrl, 'api_public_project_data_by_domain_data', 'services.json');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      
      if (data?.data?.[0]?.value && Array.isArray(data.data[0].value)) {
        services = data.data[0].value;
        projectId = data?.data?.[0]?.project_id || null;
      }
    } catch (error) {
      console.error('Error reading services.json:', error);
    }
    
    // If no services found, redirect to home
    if (services.length === 0) {
      res.setHeader("Location", "/");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }
    
    // Get image path base URL
    const imagePathBase = getImagePath(projectId, baseUrl);
    
    // Split services into chunks of 20 items per sitemap
    const ITEMS_PER_SITEMAP = 20;
    const chunkedServices = [];
    
    for (let i = 0; i < services.length; i += ITEMS_PER_SITEMAP) {
      chunkedServices.push(services.slice(i, i + ITEMS_PER_SITEMAP));
    }
    
    // If requested sitemap ID is out of range, redirect to home
    if (!chunkedServices[id - 1]) {
      res.setHeader("Location", "/");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }
    
    // Create URL-friendly service names
    const sanitizeServiceName = (name) => {
      return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    };
    
    // Process XSL content with proper title
    const modifiedXslContent = xslContent
      ?.replaceAll(
        "%DOMAIN%",
        `${baseUrl.startsWith("https://") ? "" : "https://"}${baseUrl}`
      )
      ?.replaceAll("%TITLE%", siteTitle);
    
    // Create the sitemap XML with services from the current chunk
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="data:text/xml;charset=utf-8;base64,${Buffer.from(
      modifiedXslContent || ''
    ).toString("base64")}"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://${baseUrl.startsWith("www.") ? baseUrl : `www.${baseUrl}`}</loc>
    <lastmod>${formattedDate}</lastmod>
  </url>
  ${chunkedServices[id - 1].map(service => 
    `<url>
    <loc>https://${baseUrl.startsWith("www.") ? baseUrl : `www.${baseUrl}`}/${sanitizeServiceName(service.title)}</loc>
    <lastmod>${formattedDate}</lastmod>
    ${service.image ? 
      `<image:image>
      <image:loc>${imagePathBase}/${service.image}</image:loc>
      <image:title>${service.title}</image:title>
    </image:image>` : ''}
  </url>`
  ).join('')}
</urlset>`;
    
    // Send response
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error("Error generating services sitemap:", error);
    
    // Send a simple sitemap on error
    res.setHeader("Content-Type", "text/xml");
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${req?.headers?.host || 'boston-chimney.com'}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
</urlset>`);
    res.end();
  }

  return {
    props: {},
  };
};

export default ServiceSitemap;
