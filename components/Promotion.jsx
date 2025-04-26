import Container from "./common/Container";
import FullContainer from "./common/FullContainer";

const CheckIcon = ({ filled }) => (
  <span
    className={`inline-flex items-center justify-center w-5 h-5 rounded border-2 border-blue-900 mt-1.5 ${
      filled ? "bg-blue-900" : "bg-white"
    }`}
  >
    <svg
      className={`w-4 h-4 ${filled ? "text-white" : "text-blue-900"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M5 13l4 4L19 7"
      />
    </svg>
  </span>
);

const PromotionCard = ({
  title,
  price,
  originalPrice,
  serviceTitle,
  features,
  isMainCard = false,
  whyUsData,
  filled,
}) => {
  return (
    <div
      className={`relative flex flex-col h-full border-2 border-dashed border-blue-900 rounded-md p-8 transition-all duration-200 ${
        isMainCard
          ? "bg-blue-900 text-white shadow-xl z-10 scale-105"
          : "bg-white text-blue-900"
      }`}
      style={{ minHeight: 600 }}
    >
      {title && (
        <div className="mb-2 text-center">
          <h3 className="text-3xl font-extrabold tracking-tight mb-2">
            {title}
          </h3>
          {whyUsData && whyUsData.subheading && (
            <p className="text-2xl font-bold mb-2">{whyUsData.subheading}</p>
          )}
          <div className="border-b border-dotted border-blue-900 w-3/4 mx-auto my-4" />
        </div>
      )}

      {price && (
        <div className="mb-4 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">
              Now <span className="text-5xl font-extrabold">${price}</span>
            </span>
          </div>
          {serviceTitle && (
            <div className="uppercase text-lg font-bold mt-2 leading-tight">
              {serviceTitle}
            </div>
          )}
          {originalPrice && (
            <div className="mt-2 text-lg font-semibold">
              <span>ORIGINAL PRICE </span>
              <span className="line-through text-red-500 text-2xl ml-1">
                ${originalPrice}
              </span>
            </div>
          )}
          <div className="border-b border-dotted border-white/60 border-blue-900 w-3/4 mx-auto my-4" />
        </div>
      )}

      <div className="space-y-4 flex-1">
        {features?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3 text-base font-medium"
          >
            <CheckIcon filled={filled} />
            <span className="pt-0.5">{feature}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full mt-8 py-3 rounded-lg font-extrabold text-lg tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2 ${
          isMainCard
            ? "bg-white text-blue-900 hover:bg-blue-100"
            : "bg-blue-900 text-white hover:bg-blue-800"
        }`}
      >
        Call For Redeem
      </button>
    </div>
  );
};

const FullMonthPromotion = ({ prices }) => {
  return (
    <FullContainer>
      <Container>
        <div className="w-full py-12">
          <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-12 tracking-tight">
            Full Month Promotion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-6xl mx-auto">
            {/* Left Card */}
            <PromotionCard
              title={prices?.why_choose_us?.heading}
              whyUsData={prices?.why_choose_us}
              features={prices?.why_choose_us?.features}
              filled={true}
            />
            {/* Middle Card */}
            <PromotionCard
              price={prices?.price1?.price_now?.replace("$", "")}
              originalPrice={prices?.price1?.original_price?.replace("$", "")}
              serviceTitle={prices?.price1?.service_title}
              features={prices?.price1?.features}
              isMainCard={true}
            />
            {/* Right Card */}
            <PromotionCard
              price={prices?.price2?.price_now?.replace("$", "")}
              originalPrice={prices?.price2?.original_price?.replace("$", "")}
              serviceTitle={prices?.price2?.service_title}
              features={prices?.price2?.features}
              filled={true}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
};

export default FullMonthPromotion;
