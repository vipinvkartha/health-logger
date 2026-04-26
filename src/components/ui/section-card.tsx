interface SectionCardProps {
  title: string;
  delay?: number;
  children: React.ReactNode;
}

export default function SectionCard({ title, delay = 0, children }: SectionCardProps) {
  return (
    <section
      className="animate-section paper-texture bg-white/50 rounded-xl border border-rule p-5 sm:p-6"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="font-[family-name:var(--font-display)] text-lg text-brown mb-4 pb-2 border-b border-rule">
        {title}
      </h3>
      {children}
    </section>
  );
}
