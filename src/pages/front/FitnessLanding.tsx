import usePageTitle from "../../hooks/usePageTitle";
import HeroSection from "../../components/fitness/HeroSection";
import WorkoutCards from "../../components/fitness/WorkoutCards";
import ProgressTracking from "../../components/fitness/ProgressTracking";
import TrainerProfiles from "../../components/fitness/TrainerProfiles";
import SubscriptionCTA from "../../components/fitness/SubscriptionCTA";

export default function FitnessLanding() {
  usePageTitle();
  return (
    <main>
      <HeroSection />
      <WorkoutCards />
      <ProgressTracking />
      <TrainerProfiles />
      <SubscriptionCTA />
    </main>
  );
}
