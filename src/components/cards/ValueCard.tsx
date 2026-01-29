import { ValueProp } from "@/data/valueProps";

interface ValueCardProps {
  value: ValueProp;
}

export function ValueCard({ value }: ValueCardProps) {
  const { icon: Icon, name, color, description } = value;

  return (
    <div className="bg-secondary border border-secondary rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center mx-auto mb-4">
        <Icon size={32} className={color} />
      </div>

      <h3 className="text-lg font-bold text-foreground mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
