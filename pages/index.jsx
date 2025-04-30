import Head from "next/head";
import Banner from "../components/container/home/Banner";
import Navbar from "../components/container/Navbar/Navbar";
import WhyChoose from "../components/container/home/WhyChoose";
import { useInView } from "react-intersection-observer";
import ServiceCities from "../components/container/ServiceCities";
import FAQs from "../components/container/FAQs";
import Testimonials from "../components/container/Testimonials";
import About from "../components/container/home/About";
import Footer from "../components/container/Footer";
import Contact from "../components/container/Contact";
import ServiceBenefits from "../components/container/home/ServiceBenefits";
import { useEffect, useState } from "react";
// import Gallery from "@/components/container/home/Gallery";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Link from "next/link";
import { Phone } from "lucide-react";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
} from "@/lib/myFun";

import FullMonthPromotion from "@/components/Promotion";
import OurServices from "@/components/container/home/OurServices";

export default function Home({
  contact_info,
  logo,
  imagePath,
  banner,
  services,
  features,
  about,
  benefits,
  testimonials,
  meta,
  domain,
  favicon,
  footer,
  locations,
  faqs,
  why_us,
  prices,
  slogan_1,
  form_head,
  city_name,
}) {
  return (
    <div className="bg-white">
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title?.replaceAll("##city_name##", city_name)}</title>
        <meta
          name="description"
          content={meta?.description?.replaceAll("##city_name##", city_name)}
        />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}`} />
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
      </Head>

      <div>
        <Navbar
          logo={logo}
          imagePath={imagePath}
          contact_info={contact_info}
          data={services}
        />
        <Banner
          data={banner?.value}
          image={`${imagePath}/${banner?.file_name}`}
          imagePath={imagePath}
          contact_info={contact_info}
          form_head={form_head}
          features={features?.value}
        />

        <FullMonthPromotion why_us={why_us} prices={prices} />
        {testimonials && (
          <Testimonials logo={logo} imagePath={imagePath} data={testimonials} />
        )}

        <OurServices
          data={services}
          phone={contact_info?.phone}
          imagePath={imagePath}
        />

        <WhyChoose
          data={features?.value}
          image={`${imagePath}/${features?.file_name}`}
          contact_info={contact_info}
          phone={contact_info?.phone}
        />

        {/* <Gallery
          data={gallery_head}
          gallery={gallery}
          imagePath={imagePath}
          contact_info={contact_info}
        /> */}

        {/* Slogan 1 */}
        <FullContainer className="bg-white pt-10 flex flex-col items-center justify-center">
          <Container className="text-center flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A2956] mb-4">
              {slogan_1?.title}
            </h2>
            <p className="text-base md:text-lg text-[#1A2956] mb-4">
              {slogan_1?.description}
            </p>
          </Container>
        </FullContainer>

        <About
          services={services?.list}
          data={about?.value}
          image={`${imagePath}/${about?.file_name}`}
          city_name={city_name}
        />

        <ServiceBenefits
          contact_info={contact_info}
          data={benefits?.value}
          image={`${imagePath}/${benefits?.file_name}`}
        />

        <div id="contact-us">
          <Contact contact_info={contact_info} />
        </div>
        <FAQs faqs={faqs} />
        <ServiceCities data={locations} />
        <Footer
          city_name={city_name}
          data={footer}
          logo={logo}
          imagePath={imagePath}
          contact_info={contact_info}
        />
      </div>

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
  const why_us = await callBackendApi({ domain, tag: "why_us" });
  const prices = await callBackendApi({ domain, tag: "prices" });
  const slogan_1 = await callBackendApi({ domain, tag: "slogan_1" });
  const form_head = await callBackendApi({ domain, tag: "form_head" });
  const city_name = await callBackendApi({ domain, tag: "city_name" });

  robotsTxt({ domain });

  return {
    props: {
      contact_info: contact_info?.data[0]?.value || null,
      domain,
      imagePath,
      gtmId: gtmId?.data[0]?.value || null,
      gtm_head: gtm_head?.data[0]?.value || null,
      gtm_body: gtm_body?.data[0]?.value || null,

      gallery_head: gallery_head?.data[0]?.value || null,
      faqs: faqs?.data[0]?.value || null,
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
      why_us: why_us?.data[0]?.value || [],
      prices: prices?.data[0]?.value || [],
      slogan_1: slogan_1?.data[0]?.value || null,
      form_head: form_head?.data[0]?.value || null,
      city_name: city_name?.data[0]?.value || null,
    },
  };
}
