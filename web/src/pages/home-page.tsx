import Navbar from "../components/common/Navbar";
import ArticlesSection from "../components/pages/home/articles-section";
import HomeHeroSection from "../components/pages/home/hero-section";
import ServicesSection from "../components/pages/home/services-section";
import Footer from "@/components/common/Footer";
import WhyChooseUs from "@/components/pages/home/two-images-section";
import ScrollVelocity from "@/components/imported/scroll-velocity";
import AboutSection from "@/components/pages/home/about-section";
import AdvantagesSection from "@/components/pages/home/advantages-section";
import ConsSection from "../components/pages/home/cons-section";

export default function HomePage() {
  const velocity = 100;
  return (
    <>
      <Navbar />
      <HomeHeroSection />
      <AboutSection />
      <div className="h-[1px] max-w-[90rem] bg-gray-300 mx-auto" />
      <AdvantagesSection />
      <ServicesSection />
      <div className="h-[1px] max-w-[90rem] bg-gray-300 mx-auto" />
      <ConsSection />
      <div className="h-[1px] max-w-[90rem] bg-gray-300 mx-auto" />
      {/* <AthleticPricing /> */}
      <WhyChooseUs />
      <div className="h-[1px] max-w-[90rem] bg-gray-300 mx-auto" />
      <ArticlesSection />
      <div className="w-full mt-20">
        <ScrollVelocity
          texts={[
            " — أوبيريست.. منصتك الذكية لتجربة أسهل، وهوية أرقى، ومبيعات أكبر",
          ]}
          velocity={velocity}
          className="bg-[#fda839] py-4 font-['expo'] text-white text-2xl custom-scroll-text"
        />
      </div>
      <Footer />
    </>
  );
}
