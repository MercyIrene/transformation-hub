import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ComingSoon } from "@/components/layout/ComingSoon";

interface ComingSoonPageProps {
  pageName: string;
}

const ComingSoonPage = ({ pageName }: ComingSoonPageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ComingSoon pageName={pageName} />
      </main>
      <Footer />
    </div>
  );
};

export default ComingSoonPage;
