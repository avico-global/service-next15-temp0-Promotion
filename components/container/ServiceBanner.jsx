"use client";
import React from "react";
import Image from "next/image";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";
import CallButton from "../CallButton";
import QuoteButton from "../QuoteButton";
import { useRouter } from "next/router";

export default function ServiceBanner({ contact_info, data, image }) {
  const router = useRouter();
  const { service } = router.query;

  return (
    <FullContainer
      className="relative overflow-hidden"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${data?.opacity / 100})`,
        color: data?.textColor || "white",
      }}
    >
      <div className="absolute inset-0 bg-gray-900/60"></div>
      <Image
        src={image}
        title={data?.imageTitle || data?.title || "Banner"}
        alt={data?.altImage || data?.tagline || "No Banner Found"}
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full h-52 transition-transform duration-700 hover:scale-105"
        style={{ objectFit: "cover" }}
        sizes="(max-width: 320px) 320px,
             (max-width: 480px) 480px,
             (max-width: 768px) 768px,
             (max-width: 1024px) 1024px,
             (max-width: 1280px) 1280px,
             (max-width: 1600px) 1600px,
             (max-width: 1920px) 1920px,
             (max-width: 2560px) 2560px,
             (max-width: 3840px) 3840px,
             100vw"
      />
      <Container className="h-full flex flex-col pb-5 items-center relative lg:min-h-[630px] z-10 gap-0 md:gap-6 text-center">
      <div className="flex items-center md:items-start pt-10 justify-center md:justify-start mb-4 ">
              <Image
                title="Google"
                src="/st-images/google.webp"
                width={100}
                height={30}
                alt="Google"
                className="w-[67.5px] md:w-[100px] h-[22.5px] md:h-[30px]"
              />

              <Image
                title="Trustpilot"
                src="/st-images/trustpilot.webp"
                width={100}
                height={30}
                alt="Trustpilot"
                className="ml-2 md:ml-6 w-[67.5px] md:w-[100px] h-[22.5px] md:h-[30px]"
              />

              <Image
                title="Capterra"
                src="/st-images/capterra.webp"
                width={100}
                height={30}
                alt="Capterra"
                className="ml-2 w-[67.5px] md:w-[100px] h-[22.5px] md:h-[30px]"
              />
            </div>

        <h1 className="flex flex-col  max-w-3xl text-4xl md:text-5xl lg:text-6xl font-bold ">
          <span className="leading-none text-3xl md:text-6xl uppercase font-[900] text-[#89CFF0] text-center  mt-2">
            {service?.replace(/-/g, " ")}
          </span>
        </h1>

        <span className="block mb-3 max-w-3xl capitalize text-3xl lg:leading-[55px] md:text-4xl lg:text-[50px] font-semibold drop-shadow-lg text-white">
          <span className="text-white leading-none">
            {data?.heading?.replaceAll(
              "##service##",
              service?.replace(/-/g, " ")
            )}
          </span>
        </span>

        <p className="text-xl md:text-3xl text-white font-light drop-shadow-md max-w-2xl">
          {data?.tagline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6  pt-6">
          <CallButton phone={contact_info?.phone} />
          <QuoteButton phone={contact_info?.phone} />
       </div>
      </Container>
    </FullContainer>
  );
}
