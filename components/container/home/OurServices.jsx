import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import React from "react";

const PLACEHOLDER = "/placeholder-service.jpg"; // Place a placeholder image in your public folder

export default function OurServices({ phone, data, imagePath }) {
  console.log("data", data);
  return (
    <FullContainer>
      <Container>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 mb-8 tracking-tight">
          Services Provided
        </h2>
        <div className="grid grid-cols-2 md:gap-8 gap-4">
          {data?.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-blue-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col"
            >
              <div className="w-full h-28 md:h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                {service.image ? (
                  <img
                    src={`${imagePath}/${service.image}`}
                    alt={service.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src={`${imagePath}/${PLACEHOLDER}`}
                    alt="Service"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <div className="flex flex-col flex-1 p-3 md:p-6 pb-4">
                <h3 className="md:text-2xl font-bold text-blue-900 mb-2 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-800 text-sm md:text-base font-medium text-center mb-3 md:min-h-[48px]">
                  {service.description || "No description provided."}
                </p>
                <a
                  href={`tel:${phone}`}
                  className="mt-auto w-fit bg-blue-950 text-white font-bold py-2 px-8 mx-auto rounded text-center text-lg hover:bg-blue-900 transition-colors duration-200"
                >
                  Call Us Today
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </FullContainer>
  );
}
