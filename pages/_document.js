import { Html, Head, Main, NextScript } from "next/document";
import { getDomain, callBackendApiAll, extractTagData } from "@/lib/myFun";

export default function Document({ gtmId }) {
  return (
    <Html lang="en">
      <Head>
        {/* Google Tag Manager */}
        {gtmId && gtmId !== "null" && gtmId !== "undefined" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  if (!window.gtmLoaded && typeof window !== 'undefined') {
                    window.gtmLoaded = true;
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${gtmId}');
                  }
                `,
            }}
          />
        )}
        {/* End Google Tag Manager */}
        {/* Service Worker Registration */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        // SW registered successfully
                      })
                      .catch(function(registrationError) {
                        // SW registration failed
                      });
                  });
                }
              `,
            }}
          />
        )}
      </Head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        {gtmId && gtmId !== "null" && gtmId !== "undefined" && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  let gtmId = null;

  // Get domain from request headers
  const host = ctx.req?.headers?.host;
  const domain = getDomain(host);

  if (domain) {
    try {
      // Fetch project data to get GTM ID
      const bulkData = await callBackendApiAll({ domain });

      if (bulkData && !bulkData.error) {
        const logo = extractTagData(bulkData, "logo");
        const project_id = logo?.data[0]?.project_id || null;

        if (project_id) {
          try {
            const projectInfoResponse = await fetch(
              `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/get_project_info/${project_id}`
            );

            if (projectInfoResponse.ok) {
              const projectInfoData = await projectInfoResponse.json();
              const project = projectInfoData?.data || null;
              gtmId = project?.additional_config?.gtm_id || null;
            }
          } catch (error) {
            console.error("Error fetching project info in _document:", error);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching GTM ID in _document:", error);
    }
  }

  // Run the original `getInitialProps` to get the default props
  const initialProps = await originalRenderPage();

  return {
    ...initialProps,
    gtmId,
  };
};
