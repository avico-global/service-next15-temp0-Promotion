"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import QuoteForm from "@/components/common/QuoteForm";
import {
  Clock,
  Star,
  Shield,
  Award,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
} from "lucide-react";

export default function ServiceBanner({ image, data, form_head, features }) {
  const iconMap = {
    Clock,
    Star,
    Shield,
    Award,
    Trophy,
    ThumbsUp,
    Phone,
    FileText,
    MessageSquare,
  };

  const router = useRouter();
  const { service } = router.query;

  return (
    <FullContainer className="relative bg-white overflow-hidden md:!h-[790px]">
      <div className="absolute inset-0 h-[600px] md:min-h-[790px] overflow-hidden">
        <Image
          src={image}
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "No Banner Found"}
          priority={true}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gray-950/70"></div>
      </div>
      <Container className="py-10 font-barlow relative z-10 mt-10 md:mt-0">
        <div className="w-full grid grid-cols-1 md:grid-cols-banner gap-10 md:gap-[66px] text-white">
          <div className="relative -mt-10 flex items-center md:items-start flex-col lg:pr-10 justify-center">
            <div className="bg-gradient-to-br  from-blue-800 to-sky-300 rounded-full text-5xl md:text-7xl font-bold aspect-square h-28 md:h-32 w-28 md:w-32 flex items-center justify-center">
              <sup className="text-3xl">$</sup>
              {data?.price || "80"}
            </div>

            <h1 className="font-[900] uppercase text-[28px] mt-3 px-4 md:px-0 md:text-6xl leading-tight text-center md:text-start lg:text-left text-shadow-lg">
              {data?.heading?.replaceAll(
                "##service##",
                service?.replace(/-/g, " ")
              )}
            </h1>
            <h2 className="text-[28px] md:px-0 md:text-4xl uppercase font-bold mt-3 leading-tight text-[#90D4E1] text-center md:text-start lg:text-left ">
              {data?.tagline?.replaceAll(
                "##service##",
                service?.replace(/-/g, " ")
              )}
            </h2>
            <p className="text-[16px] md:text-3xl text-center md:text-start lg:text-left mt-4 mb-1">
              {data?.description}
            </p>

            <ul className="mb-6 space-y-1 md:space-y-2">
              {features?.map((feature, idx) => {
                const IconComponent = iconMap[feature.icon];
                return (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-white font-medium text-base md:text-[17px]"
                  >
                    {IconComponent && (
                      <IconComponent className="w-5 h-5 text-white" />
                    )}
                    {feature.text}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col justify-center px-3" >
            <QuoteForm data={data} form_head={form_head} showArrowInButton={true} />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
