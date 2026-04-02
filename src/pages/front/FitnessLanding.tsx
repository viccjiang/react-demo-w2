import usePageTitle from "../../hooks/usePageTitle";
import HeroSection from "../../components/fitness/HeroSection";
import SwipeCards from "../../components/fitness/SwipeCards";
import ProgressTracking from "../../components/fitness/ProgressTracking";
import TrainerProfiles from "../../components/fitness/TrainerProfiles";
import SubscriptionCTA from "../../components/fitness/SubscriptionCTA";

export default function FitnessLanding() {
  usePageTitle();
  return (
    <main>
      <HeroSection />
      <SwipeCards />
      <ProgressTracking />
      <TrainerProfiles />
      <SubscriptionCTA />
    </main>
  );
}
