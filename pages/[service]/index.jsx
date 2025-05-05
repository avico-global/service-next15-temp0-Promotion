import FAQs from "../../components/container/FAQs";
import Contact from "../../components/container/Contact";
import Navbar from "../../components/container/Navbar/Navbar";
import ServiceCities from "../../components/container/ServiceCities";
import Footer from "../../components/container/Footer";
import ServiceBenefits from "../../components/container/home/ServiceBenefits";
import Breadcrumbs from "@/components/common/Breadcrumbs";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
} from "@/lib/myFun";

import ServiceBanner from "@/components/container/ServiceBanner";
import Gallery from "@/components/container/home/Gallery";
import About from "@/components/container/home/About";
import { useRouter } from "next/router";
import Head from "next/head";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import Link from "next/link";
import { Phone, TextQuote } from "lucide-react";
import { ScrollLink } from "react-scroll";
import ServiceDescription from "@/components/container/services/ServiceDescription";
import ServiceText from "@/components/container/services/ServiceText";
export default function Service({
  contact_info,
  logo,
  banner,
  services,
  imagePath,
  benefits,
  gallery,
  footer,
  about,
  meta,
  domain,
  favicon,
  locations,
  service_banner,
  gallery_head,
  faqs,
  gtmId,
  service_text1,
  service_text2,
  service_description,
  city_name,
  service_gallery_head,
  form_head,
}) {
  const router = useRouter();
  const { service } = router.query;
  const breadcrumbs = useBreadcrumbs();

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>
          {meta?.title
            ?.replaceAll("##service##", service?.replaceAll("-", " "))
            ?.replaceAll("##city_name##", city_name)}
        </title>
        <meta
          name="description"
          content={meta?.description?.replaceAll(
            "##service##",
            service
              ?.replaceAll("-", " ")
              ?.replaceAll("##city_name##", city_name)
          )}
        />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}/${service}`} />
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
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>

      <Navbar
        logo={logo}
        imagePath={imagePath}
        contact_info={contact_info}
        data={services}
      />

      <ServiceBanner
        data={service_banner?.value}
        image={`${imagePath}/${service_banner?.file_name}`}
        imagePath={imagePath}
        contact_info={contact_info}
        form_head={form_head}
      />
      <FullContainer>
        <Container>
          <Breadcrumbs breadcrumbs={breadcrumbs} className="pt-7" />
        </Container>
      </FullContainer>
      {service_description?.value && (
        <ServiceDescription
          data={service_description?.value}
          image={`${imagePath}/${service_banner?.file_name}`}
          contact_info={contact_info}
          service={service}
          city_name={city_name}
        />
      )}
      <Gallery
        contact_info={contact_info}
        gallery={gallery}
        imagePath={imagePath}
        service={service}
        data={service_gallery_head}
        city_name={city_name}
      />
      <ServiceText
        contact_info={contact_info}
        data={service_text1}
        service={service}
        data2={service_text2}
      />
      <Contact contact_info={contact_info} />
      <FAQs faqs={faqs} />
      <ServiceCities data={locations} />
      <Footer
        domain={domain}
        data={footer}
        logo={logo}
        imagePath={imagePath}
        contact_info={contact_info}
      />

      {/* Fixed Call Button */}
      <div className="grid md:hidden fixed bottom-0 left-0 right-0 z-50 p-2 bg-white">
        <div className="w-full bg-gradient-to-b from-green-700 via-lime-600 to-green-600 rounded-md flex flex-col items-center justify-center py-3">
          <Link
            title="Call Button"
            href={`tel:${contact_info?.phone}`}
            className="flex flex-col text-white items-center justify-center w-full font-barlow"
          >
            <div className="flex items-center mb-1">
              <Phone className="w-8 h-8 mr-3" />
              <div className="uppercase text-4xl font-extrabold">
                CALL US NOW
              </div>
            </div>
            <div className="text-3xl font-semibold">
              {contact_info?.phone ? contact_info?.phone : "Contact Us"}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);
  const faqs = await callBackendApi({ domain, tag: "faqs" });
  const service_text1 = await callBackendApi({ domain, tag: "service_text1" });
  const service_text2 = await callBackendApi({ domain, tag: "service_text2" });
  const gallery_head = await callBackendApi({ domain, tag: "gallery_head" });
  const contact_info = await callBackendApi({ domain, tag: "contact_info" });
  const logo = await callBackendApi({ domain, tag: "logo" });
  const project_id = logo?.data[0]?.project_id || null;
  const imagePath = await getImagePath(project_id, domain);
  const gtmId = await callBackendApi({ domain, tag: "gtmId" });
  const gtm_head = await callBackendApi({ domain, tag: "gtm_head" });
  const gtm_body = await callBackendApi({ domain, tag: "gtm_body" });

  const banner = await callBackendApi({ domain, tag: "banner" });
  const services = await callBackendApi({ domain, tag: "services" });
  const features = await callBackendApi({ domain, tag: "features" });
  const gallery = await callBackendApi({ domain, tag: "gallery" });
  const about = await callBackendApi({ domain, tag: "about" });
  const benefits = await callBackendApi({ domain, tag: "benefits" });
  const testimonials = await callBackendApi({ domain, tag: "testimonials" });
  const meta = await callBackendApi({ domain, tag: "meta_home" });
  const favicon = await callBackendApi({ domain, tag: "favicon" });
  const footer = await callBackendApi({ domain, tag: "footer" });
  const locations = await callBackendApi({ domain, tag: "locations" });
  const service_gallery_head = await callBackendApi({
    domain,
    tag: "service_gallery_head",
  });
  const service_banner = await callBackendApi({
    domain,
    tag: "service_banner",
  });
  const service_description = await callBackendApi({
    domain,
    tag: "service_description",
  });
  const city_name = await callBackendApi({
    domain,
    tag: "city_name",
  });
  const form_head = await callBackendApi({
    domain,
    tag: "form_head",
  });

  robotsTxt({ domain });

  return {
    props: {
      contact_info: contact_info?.data[0]?.value || null,
      gallery_head: gallery_head?.data[0]?.value || null,
      service_gallery_head: service_gallery_head?.data[0]?.value || null,
      faqs: faqs?.data[0]?.value || null,
      service_text1: service_text1?.data[0]?.value || null,
      service_text2: service_text2?.data[0]?.value || null,
      service_banner: service_banner?.data[0] || null,
      gtmId: gtmId?.data[0]?.value || null,
      gtm_head: gtm_head?.data[0]?.value || null,
      gtm_body: gtm_body?.data[0]?.value || null,

      domain,
      imagePath,
      logo: logo?.data[0] || null,
      banner: banner?.data[0] || null,
      services: services?.data[0]?.value || [],
      features: features?.data[0] || [],
      gallery: gallery?.data[0]?.value || [],
      about: about?.data[0] || null,
      benefits: benefits?.data[0] || [],
      testimonials: testimonials?.data[0]?.value || [],
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      footer: footer?.data[0] || null,
      locations: locations?.data[0]?.value || [],
      service_description: service_description?.data[0] || null,
      city_name: city_name?.data[0]?.value || null,
      form_head: form_head?.data[0]?.value || null,
    },
  };
}
