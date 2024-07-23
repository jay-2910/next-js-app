import Header from "@/components/header";
import HomeNoteBlock from "@/components/HomeNoteBlock.js";
import HomeSlider from "@/components/HomeSlider.js";
import TopHeader from "@/components/TopHeader";
import HomeEvent from "@/components/HomeEvent";
import HomeBlog from "@/components/HomeBlog";
import Footer from "@/components/Footer";
import HomeNewsSection from "@/components/HomeNewsSection";

export default function Home() {
  return (
    <main>
      <TopHeader />
      <Header />
      <HomeSlider />
      <HomeNoteBlock />
      <HomeBlog />
      <HomeEvent />
      <HomeNewsSection />
      <Footer />
    </main>
  );
}
