import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, Heart, Users } from "lucide-react";

const VALUES = [
  { icon: Target, title: "Results-Driven", desc: "Every project is measured by the impact it delivers to your business." },
  { icon: Eye, title: "Innovation First", desc: "We leverage cutting-edge AI and automation to keep you ahead." },
  { icon: Heart, title: "Client-Centered", desc: "Your success is our priority. We build lasting partnerships." },
  { icon: Users, title: "Local Expertise", desc: "Deep understanding of the East African market and its unique needs." },
];

const TEAM = [
  { name: "Daniel Shalit", role: "Founder & CEO", bio: "Digital strategist with 10+ years of experience in tech and marketing across Africa." },
  { name: "Grace Wanjiru", role: "Creative Director", bio: "Award-winning designer passionate about visual storytelling and brand identity." },
  { name: "Kevin Omondi", role: "Head of Technology", bio: "Full-stack engineer specializing in AI, automation, and scalable systems." },
];

const AboutPage = () => (
  <Layout>
    {/* Hero */}
    <section className="py-20 md:py-28 bg-hero text-primary-foreground">
      <div className="container">
        <SectionHeading
          light
          label="About Us"
          title="We Are Shalit Group"
          description="A Nairobi-based digital services agency on a mission to empower African businesses through technology, design, and innovation."
        />
      </div>
    </section>

    {/* Story */}
    <section className="py-20 md:py-28">
      <div className="container max-w-3xl">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Our Story</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Founded in Nairobi, Shalit Group was born from a simple observation: African businesses deserve
            world-class digital services at accessible price points. Too many companies were forced to choose
            between quality and affordability.
          </p>
          <p>
            We set out to change that. By combining cutting-edge technology with deep local market understanding,
            we've built a comprehensive platform that offers everything from graphic design and AI chatbots
            to lead generation and workflow automation.
          </p>
          <p>
            Today, we serve over 150 businesses across East Africa, helping them compete globally while
            staying rooted in their communities.
          </p>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container">
        <SectionHeading label="Our Values" title="What Drives Us" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className="p-6 rounded-xl bg-card border border-border text-center">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <v.icon size={22} className="text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionHeading label="Our Team" title="Meet the People Behind Shalit" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {TEAM.map((m) => (
            <div key={m.name} className="p-6 rounded-xl border border-border text-center">
              <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center text-2xl font-serif font-bold text-muted-foreground">
                {m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <h3 className="font-semibold text-foreground">{m.name}</h3>
              <p className="text-xs text-accent font-medium mb-2">{m.role}</p>
              <p className="text-sm text-muted-foreground">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutPage;
