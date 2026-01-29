import { ExecutionStream } from "@/data/executionStreams";

interface StreamCardProps {
  stream: ExecutionStream;
}

export function StreamCard({ stream }: StreamCardProps) {
  const { icon: Icon, name, acronym, color, description, features, outcomes } =
    stream;

  return (
    <div className="bg-secondary border border-secondary rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="icon-gradient w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon size={28} className={color} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {name}{" "}
            <span className="text-muted-foreground font-normal">
              ({acronym})
            </span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>

      <ul className="list-disc list-inside space-y-2 text-secondary-foreground text-sm mb-6">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <div className="border-t border-border/50 pt-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
          Measurable Outcomes
        </p>
        <div className="flex flex-wrap gap-2">
          {outcomes.map((outcome) => (
            <span
              key={outcome}
              className="bg-card border border-border px-3 py-1 rounded-full text-xs font-medium text-secondary-foreground"
            >
              {outcome}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
