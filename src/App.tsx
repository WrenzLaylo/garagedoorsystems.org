import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import MobileCTABar from "./components/layout/MobileCTABar";
import FloatingQuoteButton from "./components/layout/FloatingQuoteButton";
import Hero from "./components/sections/Hero";
import StatsBar from "./components/sections/StatsBar";
import TrustBadges from "./components/sections/TrustBadges";
import Services from "./components/sections/Services";
import HowItWorks from "./components/sections/HowItWorks";
import ServiceAreas from "./components/sections/ServiceAreas";
import Testimonials from "./components/sections/Testimonials";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";
import FinalCTA from "./components/sections/FinalCTA";
import BackedByAgg from "./components/sections/BackedByAgg";
import CursorGlow from "./components/ui/CursorGlow";
import { CONTACT } from "./constants";
import { trackCall, trackEmergencyCall } from "./utils/analytics";

export default function App() {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <CursorGlow />
      <Navbar
        onCall={() => {
          trackCall();
          window.location.href = CONTACT.phoneTel;
        }}
        onEmergencyCall={() => {
          trackEmergencyCall();
          window.location.href = CONTACT.emergencyTel;
        }}
      />
      <main>
        <Hero 
          onCall={() => { trackCall(); }}
          onEmergencyCall={() => { trackEmergencyCall(); }}
        />
        <TrustBadges />
        <StatsBar />
        <Services />
        <BackedByAgg />
        <HowItWorks />
        <ServiceAreas />
        <Testimonials />
        <FAQ />
        <Contact
          onCall={trackCall}
        />
        <FinalCTA onCall={trackCall} onEmergencyCall={trackEmergencyCall} />
      </main>
      <Footer />
      <MobileCTABar onCall={trackCall} onEmergencyCall={trackEmergencyCall} />
      <FloatingQuoteButton />
    </div>
  );
}