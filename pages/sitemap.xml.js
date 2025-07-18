import { getDomain, callBackendApi } from "../lib/myFun";
import Head from "next/head";
import Link from "next/link";

export default function SitemapXml({ urls, isHtml }) {
  // If it's XML, return null as we'll handle the response in getServerSideProps
  if (!isHtml) return null;

  // Otherwise, render the HTML UI
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Head>
        <title>XML Sitemap</title>
        <meta name="description" content="Sitemap for this website" />
      </Head>

      <h1 className="text-2xl font-bold mb-3">XML Sitemap</h1>
      <p className="mb-2">
        Generated by{" "}
        <a
          href="https://towingdallas.us/"
          className="text-red-600 hover:underline"
        >
          Dallas Towing
        </a>
        , this is an XML Sitemap, meant for consumption by search engines.
      </p>

      <p className="mb-5">
        You can find more information about XML sitemaps on{" "}
        <a
          href="https://sitemaps.org"
          className="text-blue-600 hover:underline"
        >
          sitemaps.org
        </a>
        .
      </p>

      <p className="mb-8">This XML Sitemap contains {urls.length} URLs.</p>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-3 py-2 text-left font-medium">URL</th>
              <th className="border-b px-3 py-2 text-left font-medium w-32">
                Last Modified
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {urls.map((url, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-2 truncate max-w-md">
                  <a href={url.loc} className="text-blue-600 hover:underline">
                    {url.loc}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-500">
                  {url.lastmod.split("T")[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  try {
    // Get the domain from the request headers
    const domain = getDomain(req?.headers?.host);

    // Get services data directly from API
    const services = await callBackendApi({ domain, tag: "services" });
    const servicesList = services?.data?.[0]?.value || [];

    // Format current date for lastmod
    const currentDate = new Date().toISOString();
    const [datePart, timePart] = currentDate.split("T");
    const formattedDate = `${datePart}T${timePart.split(".")[0]}+00:00`;

    // Create URLs array with home page
    const urls = [
      {
        loc: `https://www.${domain}`,
        lastmod: formattedDate,
      },
    ];

    // Add service pages
    if (servicesList && servicesList.length > 0) {
      servicesList.forEach((service) => {
        if (service.title) {
          const serviceUrl = service.title
            ?.normalize("NFKC")
            ?.toLowerCase()
            ?.replace(/[\u2013\u2014]/g, "-")
            ?.replaceAll(" - ", "-")
            ?.replaceAll(" | ", "-")
            ?.replaceAll(" ", "-")
            ?.replaceAll(":", "")
            ?.replaceAll("/", "-")
            ?.replaceAll("?", "")
            ?.replaceAll("&", "&amp;");

          urls.push({
            loc: `https://www.${domain}/${serviceUrl}`,
            lastmod: formattedDate,
          });
        }
      });
    }

    // Check if we should return HTML based on the Accept header
    // Browsers typically accept HTML, crawlers looking for XML sitemap don't
    const acceptHeader = req.headers.accept || "";
    const wantsHtml = acceptHeader.includes("text/html");

    // If request is from a browser (wanting HTML), return the props for the component to render
    if (wantsHtml) {
      return {
        props: {
          urls,
          isHtml: true,
        },
      };
    }

    // Otherwise, set XML content type
    res.setHeader("Content-Type", "text/xml");

    // Generate the XML content
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    // Send the XML response
    res.write(xml);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Get domain for fallback
    const domain = getDomain(req?.headers?.host);

    // Check if we should return HTML based on the Accept header
    const acceptHeader = req.headers.accept || "";
    const wantsHtml = acceptHeader.includes("text/html");

    if (wantsHtml) {
      // Return basic HTML fallback
      return {
        props: {
          urls: [
            {
              loc: `https://www.${domain}`,
              lastmod: new Date().toISOString(),
            },
          ],
          isHtml: true,
        },
      };
    }

    // Send a basic XML sitemap on error
    res.setHeader("Content-Type", "text/xml");
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.${domain}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
    res.write(fallbackXml);
    res.end();

    return {
      props: {},
    };
  }
}
