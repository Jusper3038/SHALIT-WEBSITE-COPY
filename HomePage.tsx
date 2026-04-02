import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Palette, PhoneCall, Users, Bot, Zap, Share2, ShoppingBag, Monitor,
  ArrowRight, Star, CheckCircle, Phone, MessageCircle
} from "lucide-react";

const SERVICES = [
  { icon: Palette, title: "Graphic Design", desc: "Logos, branding kits, posters & premium visual identity.", slug: "graphic-design" },
  { icon: PhoneCall, title: "Telesales", desc: "Professional outbound sales teams to grow your revenue.", slug: "telesales" },
  { icon: Users, title: "Lead Generation", desc: "Capture qualified leads and grow your customer pipeline.", slug: "lead-generation" },
  { icon: Bot, title: "AI Integration", desc: "Chatbots, automation systems & intelligent workflows.", slug: "ai-integration" },
  { icon: Zap, title: "Workflow Automation", desc: "Streamline operations and eliminate repetitive tasks.", slug: "automation" },
  { icon: Share2, title: "Social Media Management", desc: "Grow your brand presence across all platforms.", slug: "smm" },
  { icon: ShoppingBag, title: "Print-on-Demand", desc: "Custom merchandise and digital product fulfillment.", slug: "print-on-demand" },
  { icon: Monitor, title: "POS Solutions", desc: "Point of sale and interaction systems for your business.", slug: "pos" },
];

const TESTIMONIALS = [
  { name: "James Mwangi", role: "CEO, TechVentures Nairobi", text: "Shalit Group transformed our digital presence. Their AI integration saved us 30+ hours weekly." },
  { name: "Aisha Mohamed", role: "Founder, GreenLeaf Co.", text: "The branding kit they designed perfectly captured our vision. Highly professional team." },
  { name: "Peter Ochieng", role: "Marketing Director, Safiri Ltd", text: "Best lead generation results we've ever seen. Our pipeline grew 3x in two months." },
];

const STATS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "150+", label: "Happy Clients" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support" },
];

const HomePage = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/70" />
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl">
          <span className="animate-fade-up inline-block bg-accent/20 text-accent text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            🇰🇪 Kenya's Digital Growth Partner
          </span>
          <h1 className="animate-fade-up stagger-1 text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-primary-foreground leading-[1.1] mb-6">
            Grow Your Business with{" "}
            <span className="text-gradient-accent">Digital Excellence</span>
          </h1>
          <p className="animate-fade-up stagger-2 text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-8 leading-relaxed">
            Design. Automate. Grow. We help businesses across East Africa scale with AI-powered digital services — from KES 1,500.
          </p>
          <div className="animate-fade-up stagger-3 flex flex-wrap gap-3">
            <Button variant="hero" size="lg" asChild>
              <Link to="/services">View Services & Pricing <ArrowRight size={16} /></Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="https://wa.me/254700000000?text=Hi%20Shalit%20Group%2C%20I%27d%20like%20a%20free%20consultation" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} /> Free Consultation
              </a>
            </Button>
          </div>
          <p className="animate-fade-up stagger-4 text-xs text-primary-foreground/40 mt-4">
            ✅ Pay via M-Pesa • No upfront deposit required for consultations
          </p>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16 bg-secondary">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl md:text-4xl font-serif font-bold text-gradient-accent">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Services */}
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionHeading label="What We Do" title="Our Services" description="End-to-end digital solutions tailored for Kenyan businesses. All prices in KES." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              to={`/services#${s.slug}`}
              className="group p-6 rounded-xl border border-border bg-card hover:shadow-[var(--card-shadow-hover)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <s.icon size={22} className="text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <p className="text-xs font-medium text-accent mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                View pricing <ArrowRight size={12} />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Quick Inquiry Banner */}
    <section className="py-10 bg-accent/5 border-y border-accent/10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-foreground">Need something done fast?</h3>
          <p className="text-sm text-muted-foreground">Tell us what you need — we'll respond within 1 hour during business hours.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href="tel:+254700000000"><Phone size={14} /> Call Now</a>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <a href="https://wa.me/254700000000?text=Hi%2C%20I%20need%20a%20quick%20quote%20for%20" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={14} /> WhatsApp Us
            </a>
          </Button>
        </div>
      </div>
    </section>

    {/* Why Us */}
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container">
        <SectionHeading light label="Why Shalit Group" title="Built for Kenyan Businesses" description="We combine creativity with technology to deliver measurable results." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            "M-Pesa payments — pay instantly via STK Push",
            "AI-powered automation to save time and costs",
            "Transparent KES pricing with no hidden fees",
            "Based in Nairobi — local team, global standards",
            "End-to-end service from design to deployment",
            "Free consultation before any commitment",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle size={18} className="text-accent mt-0.5 shrink-0" />
              <p className="text-sm text-primary-foreground/80">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionHeading label="Testimonials" title="What Our Clients Say" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="p-6 rounded-xl border border-border bg-card">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
              <div>
                <p className="font-semibold text-sm text-card-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 md:py-28 bg-hero text-primary-foreground">
      <div className="container text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Ready to Grow Your Business?</h2>
        <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
          Get a free consultation and a custom quote. No commitment, no hidden fees — just results.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Get a Free Quote <ArrowRight size={16} /></Link>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <a href="https://wa.me/254700000000?text=Hi%20Shalit%20Group%2C%20I%27d%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </Button>
        </div>
        <p className="text-xs text-primary-foreground/40 mt-6">Pay via M-Pesa • Visa • Mastercard</p>
      </div>
    </section>
  </Layout>
);

export default HomePage;