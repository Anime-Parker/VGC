import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import RenderVsReality from "@/components/RenderVsReality";
import Services from "@/components/Services";
import ProjectGallery from "@/components/ProjectGallery";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <RenderVsReality />
      <Services />
      <ProjectGallery />
      <FAQ />
      <Contact />
    </>
  );
}
