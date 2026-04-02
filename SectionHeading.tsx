interface Props {
  label?: string;
  title: string;
  description?: string;
  light?: boolean;
}

const SectionHeading = ({ label, title, description, light }: Props) => (
  <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
    {label && (
      <span className="text-accent text-sm font-semibold uppercase tracking-widest mb-3 block">
        {label}
      </span>
    )}
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight ${light ? "text-primary-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    {description && (
      <p className={`mt-4 text-base md:text-lg leading-relaxed ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
