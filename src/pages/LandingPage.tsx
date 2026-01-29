import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { DBPOverview } from "@/components/sections/DBPOverview";
import { GovernanceModel } from "@/components/sections/GovernanceModel";
import { ExecutionStreams } from "@/components/sections/ExecutionStreams";
import { ResourceMarketplaces } from "@/components/sections/ResourceMarketplaces";
import { TOValue } from "@/components/sections/TOValue";
import { Contributors } from "@/components/sections/Contributors";
import { FinalCTA } from "@/components/sections/FinalCTA";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <DBPOverview />
        <GovernanceModel />
        <ExecutionStreams />
        <ResourceMarketplaces />
        <TOValue />
        <Contributors />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
