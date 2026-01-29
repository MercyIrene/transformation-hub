import { Link } from "react-router-dom";
import { Construction, ArrowLeft } from "lucide-react";

interface ComingSoonProps {
  pageName: string;
}

export function ComingSoon({ pageName }: ComingSoonProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-secondary">
      <div className="max-w-2xl mx-auto text-center p-8">
        <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <Construction size={48} className="text-accent" />
        </div>

        <h1 className="text-4xl font-bold text-primary mb-2">{pageName}</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Coming in Next Development Phase
        </p>

        <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto">
          This page is being built in the next development phase. Check back
          soon to access {pageName}.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-accent hover:text-orange-hover font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
