import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import CtaBanner from "../components/CtaBanner";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <CtaBanner/>
      <Footer />
    </main>
  );
}