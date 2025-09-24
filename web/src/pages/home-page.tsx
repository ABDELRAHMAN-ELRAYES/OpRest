import Navbar from "../components/common/Navbar";
import HomeHeroSection from "../components/pages/home/hero-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HomeHeroSection />
      <div className="bg-rose-300 w-full min-h-[100vh]"></div>
      <div className="bg-blue-300 w-full min-h-[100vh]"></div>
      <div className="bg-purple-300 w-full min-h-[100vh]"></div>
    </>
  );
}
