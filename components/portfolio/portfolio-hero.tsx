export function PortfolioHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/creative-portfolio-showcase-gallery-wall-premium.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-primary font-medium tracking-widest uppercase text-sm mb-6 animate-fade-in-up">
          Our Portfolio
        </p>

        <h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-balance animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Showcasing Our <span className="text-primary">Creative Excellence</span>
        </h1>

        <p
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Explore our collection of work spanning photography, videography, web development, and branding projects
          across various industries.
        </p>
      </div>
    </section>
  )
}
