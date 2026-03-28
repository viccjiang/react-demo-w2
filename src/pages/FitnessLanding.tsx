import Navbar from "../components/fitness/Navbar";
import HeroSection from "../components/fitness/HeroSection";
import WorkoutCards from "../components/fitness/WorkoutCards";
import ProgressTracking from "../components/fitness/ProgressTracking";
import TrainerProfiles from "../components/fitness/TrainerProfiles";
import SubscriptionCTA from "../components/fitness/SubscriptionCTA";
import Footer from "../components/fitness/Footer";

export default function FitnessLanding() {
  return (
    <div className="min-h-screen bg-dark-950 font-body text-white antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <WorkoutCards />
        <ProgressTracking />
        <TrainerProfiles />
        <SubscriptionCTA />
      </main>
      <Footer />
    </div>
  );
}
