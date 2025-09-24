import { motion, useScroll, useTransform } from "framer-motion";

export default function HomeHeroSection() {
  const { scrollY } = useScroll();

  // Assume we have 5 cards → total scroll range needed
  const totalCards = 5;
  const scrollRange = 1000; // adjust for sensitivity
  const x = useTransform(
    scrollY,
    [0, scrollRange], // the range  of scrolling in y axis   (min -> max)
    [-1850 * (totalCards - 1), 0] // the range  of scrolling in x axis   (min -> max)
  );

  return (
    <div style={{ height: "250vh" }} className="translate-y-[-1rem]">
      {" "}
      {/* tall container to allow scrolling */}
      <motion.div style={{ x }} className="flex gap-12 sticky top-0 p-10">
        {[...Array(totalCards)].map((_, i) => (
          <div
            key={i}
            className="h-[95vh] w-full  mx-auto flex-shrink-0 rounded-2xl bg-blue-200 text-white flex items-center justify-center text-2xl shadow-lg"
          >
            Card {i + 1}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
