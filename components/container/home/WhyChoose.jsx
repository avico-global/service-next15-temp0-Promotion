import React from "react";
import Image from "next/image";
import Container from "../../common/Container";
import {
  Clock,
  Star,
  Shield,
  Award,
  CheckCircle,
  Trophy,
  ThumbsUp,
  Phone,
  TextQuote,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";
import Link from "next/link";
import CallButton from "@/components/CallButton";
import QuoteButton from "@/components/QuoteButton";
import Heading from "@/components/common/Heading";

const iconMapping = {
  Award: Award,
  Clock: Clock,
  Star: Star,
  Shield: Shield,
  CheckCircle: CheckCircle,
  Trophy: Trophy,
  ThumbsUp: ThumbsUp,
};


export default function WhyChoose({ data, image, contact_info }) {
  return (
    <FullContainer className="py-6 md:py-8">
      <Container className="">
        <div className="flex flex-col md:flex-row h-fit gap-8 items-center">
          <div className="w-fit flex flex-col justify-center items-center md:items-start md:justify-start gap-4 md:pr-10">
            <div className="flex justify-start">
              <Heading text={data?.heading} className="" />
            </div>
            <div className="space-y-2 w-fit">
              {data?.features?.map((feature, index) => {
                // Get the actual icon component from the mapping
                const IconComponent = iconMapping[feature.icon] || Award; // Fallback to Award if not found

                return (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 flex items-center justify-center rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <h3
                        className={`font-barlow text-xl md:text-xl text-primary font-extralight mb-1`}
                      >
                        {feature.title}
                      </h3>
                      {/* {feature.description && (
                        <p className="text-gray-600 text-sm">
                          {feature.description}
                        </p>
                      )} */}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden md:flex flex-wrap w-full justify-start items-center gap-4 lg:gap-7">
              <CallButton phone={contact_info?.phone} />
              <QuoteButton phone={contact_info?.phone} />
            </div>
          </div>

          <div className="flex-1 w-full md:w-1/2 lg:w-3/5 h-full relative hidden md:block">
            <div className="overflow-hidden rounded-md h-[360px] w-full relative">
              <Image
                title="Why Choose Image"
                src={image}
                alt="Professional chimney services"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
