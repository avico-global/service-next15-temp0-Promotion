import Head from "next/head";
import Banner from "../components/container/home/Banner";
import Navbar from "../components/container/Navbar/Navbar";
import WhyChoose from "../components/container/home/WhyChoose";
import OurServices from "../components/container/home/OurServices";
import { useInView } from "react-intersection-observer";
import ServiceCities from "../components/container/ServiceCities";
import FAQs from "../components/container/FAQs";
import Testimonials from "../components/container/Testimonials";
import About from "../components/container/home/About";
import Footer from "../components/container/Footer";
import Contact from "../components/container/Contact";
import ServiceBenefits from "../components/container/home/ServiceBenefits";
import { useEffect, useState } from "react";
import Gallery from "@/components/container/home/Gallery";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import Link from "next/link";
import { Phone, TextQuote } from "lucide-react";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
} from "@/lib/myFun";

import { Montserrat, Inter, Barlow } from "next/font/google";
import { Link as ScrollLink } from "react-scroll";
import FullMonthPromotion from "@/components/Promotion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export default function Home({
  contact_info,
  logo,
  imagePath,
  banner,
  services,
  features,
  gallery,
  about,
  benefits,
  testimonials,
  meta,
  domain,
  favicon,
  footer,
  locations,
  gallery_head,
  faqs,
}) {
  const faviconUrl = favicon
    ? imagePath.startsWith("http")
      ? `${imagePath}/${favicon}`
      : `/images/${imagePath}/${favicon}`
    : "/favicon.ico";

  console.log("Banner Image", `${imagePath}/${banner?.file_name}`);

  return (
    <div className="bg-white">
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={faviconUrl} />

        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link rel="apple-touch-icon" sizes="180x180" href={faviconUrl} />
        <link rel="icon" type="image/png" sizes="32x32" href={faviconUrl} />
        <link rel="icon" type="image/png" sizes="16x16" href={faviconUrl} />
      </Head>

      <div className={`${montserrat.className}`}>
        <Navbar
          logo={logo}
          imagePath={imagePath}
          contact_info={contact_info}
          services={services?.list}
        />
        <Banner
          data={banner?.value}
          image={`${imagePath}/${banner?.file_name}`}
          imagePath={imagePath}
          contact_info={contact_info}
        />

        

        <FullMonthPromotion/>

        <OurServices phone={contact_info?.phone} data={services} />
        <WhyChoose
          data={features?.value}
          image={`${imagePath}/${features?.file_name}`}
          contact_info={contact_info}
        />
        <Gallery
          data={gallery_head}
          gallery={gallery}
          imagePath={imagePath}
          contact_info={contact_info}
        />
        <FullContainer className="pt-2 pb-6">
          <Container className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 md:justify-between px-2 md:px-4">
            {[
              {
                title: "Number Of Clients",
                number: 1200,
              },
              {
                title: "Years of Experience",
                number: 10,
              },
              {
                title: "Locations Served",
                number: 21,
              },
              {
                title: "Certifications Or Awards",
                number: 14,
              },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex flex-col items-center justify-center">
                  <h3
                    className={`font-[900] text-center text-[#082347] relative z-10 font-barlow`}
                  >
                    <Counter
                      targetNumber={item.number}
                      duration={3000}
                      className="text-7xl"
                    />
                  </h3>
                  <h2
                    className={`text-base sm:text-lg md:text-xl capitalize font-medium leading-none text-start md:text-center text-[#082347] relative z-10 mt-1 md:mt-2 ${inter.className}`}
                  >
                    {item.title}
                  </h2>
                </div>
              </div>
            ))}
          </Container>
        </FullContainer>

        <About
          services={services?.list}
          data={about?.value}
          image={`${imagePath}/${about?.file_name}`}
        />
        <ServiceBenefits
          contact_info={contact_info}
          data={benefits?.value}
          image={`${imagePath}/${benefits?.file_name}`}
        />
        {}
        {testimonials && <Testimonials logo={logo} imagePath={imagePath} data={testimonials} />}
        <div id="contact-us">
          <Contact contact_info={contact_info} />
        </div>
        <FAQs faqs={faqs} />
        <ServiceCities data={locations} />
        <Footer
          data={footer}
          logo={logo}
          imagePath={imagePath}
          contact_info={contact_info}
        />
      </div>
      <div className="grid md:hidden fixed bottom-0 left-0 right-0 grid-cols-2 gap-2 p-2 bg-white z-50">
        <div className="w-full rounded-lg bg-[#01306E] flex items-center justify-center">
          <Link
            title="Call Button"
            href={`tel:${contact_info?.phone}`}
            className="bg-[radial-gradient(ellipse_at_center,_#1652A2_10%,_#01306E_100%)] 
             flex text-white py-2 md:py-3 px-2 md:px-8 font-medium 
             rounded-full items-center justify-center text-[19px] w-full font-barlow"
          >
            <Phone className="w-4 h-4 md:w-6 md:h-6 mr-2" />
            <div className="uppercase">Call Us Now</div>
          </Link>
        </div>
        <div className="w-full rounded-lg flex items-center bg-[#85B8FB] justify-center p-2">
          <ScrollLink
            to="contact-us"
            spy={true}
            smooth={true}
            offset={-100}
            className="flex items-center justify-center w-fit min-w-[160px] rounded-lg text-md md:text-2xl font-barlow py-1 md:py-3 px-3 md:px-6 font-bold  z-10 cursor-pointer"
          >
            <span className="flex items-center gap-2 z-10">
              <TextQuote className="w-6 h-6 text-black" />
              <h2 className="text-[19px] font-semibold text-black">
                GET A QUOTE
              </h2>
            </span>
          </ScrollLink>
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
  const services = await callBackendApi({ domain, tag: "services_list" });
  const features = await callBackendApi({ domain, tag: "features" });
  const gallery = await callBackendApi({ domain, tag: "gallery" });
  const about = await callBackendApi({ domain, tag: "about" });
  const benefits = await callBackendApi({ domain, tag: "benefits" });
  const testimonials = await callBackendApi({ domain, tag: "testimonials" });
  const meta = await callBackendApi({ domain, tag: "meta_home" });
  const favicon = await callBackendApi({ domain, tag: "favicon" });
  const footer = await callBackendApi({ domain, tag: "footer" });
  const locations = await callBackendApi({ domain, tag: "locations" });

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
    },
  };
}

const Counter = ({ targetNumber, duration = 1000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = targetNumber / (duration / 50);
    const interval = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(interval);
      } else {
        setCount(Math.ceil(start));
      }
    }, 50);

    return () => clearInterval(interval);
  }, [inView, targetNumber, duration]);

  return (
    <span ref={ref} className="text-5xl sm:text-6xl md:text-7xl font-bold">
      {count}+
    </span>
  );
};
