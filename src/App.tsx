import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import StatsBar from "./components/sections/StatsBar";
import Services from "./components/sections/Services";
import HowItWorks from "./components/sections/HowItWorks";
import ServiceAreas from "./components/sections/ServiceAreas";
import Testimonials from "./components/sections/Testimonials";
import FAQ from "./components/sections/FAQ";
import Contact from "./components/sections/Contact";
import FinalCTA from "./components/sections/FinalCTA";
import { CONTACT } from "./constants";
import { trackCall, trackEmergencyCall } from "./utils/analytics";

export default function App() {
  const contact = {
    business: { number: CONTACT.phone, tel: CONTACT.phoneTel },
    emergency: { number: CONTACT.emergencyPhone, tel: CONTACT.emergencyTel },
  };

  return (
    <div className="min-h-screen bg-surface text-ink">
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
        <Hero onCall={trackCall} onEmergencyCall={trackEmergencyCall} />
        <StatsBar />
        <Services />
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
    </div>
  );
}