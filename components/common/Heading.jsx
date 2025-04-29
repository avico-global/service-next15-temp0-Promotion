export default function Heading({ text, className }) {
  return (
    <div>
      <h2
        className={`text-[35px] md:text-[28px] font-[800] text-primary text-center leading-none ${className}`}
      >
        {text}
      </h2>
    </div>
  );
}
