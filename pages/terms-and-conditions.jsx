"use client";
import { useEffect } from "react";
import Navbar from "../components/container/Navbar/Navbar";
import Footer from "../components/container/Footer";
import Container from "../components/common/Container";
import MarkdownIt from "markdown-it";
import Head from "next/head";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  getProjectInfo,
} from "@/lib/myFun";

import FullContainer from "@/components/common/FullContainer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import { useRouter } from "next/router";

export default function TermsAndConditions({
  logo,
  imagePath,
  phone,
  services,
  domain,
  favicon,
  meta,
  footer,
  terms,
  contact_info,
  city_name,
  project,
}) {
  const gtm_id = project?.additional_config?.gtm_id || null;
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(
    terms
      ?.replaceAll("##city_name##", city_name)
      ?.replaceAll("##website##", `${domain}`)
      ?.replaceAll("##phone##", `${phone}`)
      ?.replaceAll("(805) 628-4877", `${phone}`)
      ?.replaceAll("(408) 762-6429", `${phone}`)
      ?.replaceAll("(408) 762-6407", `${phone}`)
      ?.replaceAll("(408) 762-6323", `${phone}`)
  );
  const breadcrumbs = useBreadcrumbs();
  const router = useRouter();
  const currentPath = router.asPath;

  useEffect(() => {
    if (currentPath.includes("%20") || currentPath.includes(" ")) {
      router.replace("/terms-and-conditions");
    }
  }, [currentPath, router]);

  return (
    <main>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title?.replaceAll("##city_name##", city_name)}</title>
        <meta
          name="description"
          content={meta?.description?.replaceAll("##city_name##", city_name)}
        />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}/terms-and-conditions`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${imagePath}/${favicon}`}
        />

        {/* <!-- Google Tag Manager --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtm_id}');
              `,
          }}
        />
        {/* <!-- End Google Tag Manager --> */}
      </Head>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtm_id}`}
          height="0"
          width="10"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}

      <Navbar logo={logo} imagePath={imagePath} phone={phone} data={services} />

      <FullContainer>
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} className="py-7" />

          <div
            className="prose prose-h2:!text-start prose-p:!text-[20px] text-primary max-w-full w-full mb-5"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Container>
      </FullContainer>

      <Footer
        domain={domain}
        data={footer}
        logo={logo}
        imagePath={imagePath}
        contact_info={contact_info}
        phone={phone}
      />
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);
  const logo = await callBackendApi({ domain, tag: "logo" });
  const project_id = logo?.data[0]?.project_id || null;
  const imagePath = await getImagePath(project_id, domain);

  const services = await callBackendApi({ domain, tag: "services" });
  const meta = await callBackendApi({ domain, tag: "meta_terms" });
  const favicon = await callBackendApi({ domain, tag: "favicon" });
  const footer = await callBackendApi({ domain, tag: "footer" });
  const terms = await callBackendApi({ domain, tag: "terms" });
  const contact_info = await callBackendApi({ domain, tag: "contact_info" });
  const city_name = await callBackendApi({ domain, tag: "city_name" });

  // Get project info using the same caching pattern as other API calls
  const project = await getProjectInfo({ project_id, domain });

  robotsTxt({ domain });

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      services: Array.isArray(services?.data[0]?.value)
        ? services?.data[0]?.value
        : [],
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      footer: footer?.data[0] || null,
      terms: terms?.data[0]?.value || null,
      contact_info: contact_info?.data[0]?.value || null,
      city_name: city_name?.data[0]?.value || null,
      phone: project?.phone || null,
      project,
    },
  };
}
