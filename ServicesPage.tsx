import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import {
  Palette, PhoneCall, Users, Bot, Zap, Share2, ShoppingBag, Monitor, ArrowRight, Check
} from "lucide-react";

const SERVICES = [
  {
    icon: Palette, title: "Graphic Design", slug: "graphic-design",
    desc: "Professional logos, posters, social media graphics, and complete branding kits that make your business stand out.",
    tiers: [
      { name: "Basic", price: "KES 5,000", features: ["1 Logo concept", "2 Revisions", "PNG files"], time: "3 days" },
      { name: "Standard", price: "KES 15,000", features: ["3 Logo concepts", "5 Revisions", "Full brand kit", "Source files"], time: "5 days" },
      { name: "Premium", price: "KES 35,000", features: ["5 Concepts", "Unlimited revisions", "Full brand guidelines", "All formats", "Stationery design"], time: "7 days" },
    ],
  },
  {
    icon: PhoneCall, title: "Telesales Services", slug: "telesales",
    desc: "Dedicated outbound sales teams trained to represent your brand and close deals effectively.",
    tiers: [
      { name: "Basic", price: "KES 20,000/mo", features: ["1 Agent", "100 calls/day", "Weekly reports"], time: "Ongoing" },
      { name: "Standard", price: "KES 50,000/mo", features: ["3 Agents", "300 calls/day", "CRM integration", "Daily reports"], time: "Ongoing" },
      { name: "Premium", price: "KES 100,000/mo", features: ["5 Agents", "500 calls/day", "Dedicated manager", "Real-time dashboard"], time: "Ongoing" },
    ],
  },
  {
    icon: Users, title: "Lead Generation", slug: "lead-generation",
    desc: "Data-driven strategies to fill your pipeline with qualified leads ready to convert.",
    tiers: [
      { name: "Basic", price: "KES 15,000", features: ["Landing page", "50 leads", "Email capture"], time: "2 weeks" },
      { name: "Standard", price: "KES 40,000", features: ["Landing page + ads", "200 leads", "CRM setup"], time: "1 month" },
      { name: "Premium", price: "KES 80,000", features: ["Full funnel", "500+ leads", "Nurture sequences", "Analytics"], time: "1 month" },
    ],
  },
  {
    icon: Bot, title: "AI Integration", slug: "ai-integration",
    desc: "Custom AI chatbots, automation systems, and intelligent workflows for your business.",
    tiers: [
      { name: "Basic", price: "KES 30,000", features: ["Simple chatbot", "FAQ automation", "WhatsApp ready"], time: "1 week" },
      { name: "Standard", price: "KES 75,000", features: ["Smart chatbot", "Lead qualification", "Multi-platform", "Analytics"], time: "2 weeks" },
      { name: "Premium", price: "KES 150,000", features: ["Custom AI agent", "CRM integration", "Voice support", "Training included"], time: "3 weeks" },
    ],
  },
  {
    icon: Zap, title: "Workflow Automation", slug: "automation",
    desc: "Eliminate repetitive tasks and streamline your operations with smart automation.",
    tiers: [
      { name: "Basic", price: "KES 20,000", features: ["3 Automations", "Email triggers", "Basic integrations"], time: "5 days" },
      { name: "Standard", price: "KES 50,000", features: ["10 Automations", "Multi-app flows", "Custom logic"], time: "10 days" },
      { name: "Premium", price: "KES 100,000", features: ["Unlimited flows", "API integrations", "Monitoring dashboard", "Support"], time: "2 weeks" },
    ],
  },
  {
    icon: Share2, title: "Social Media Management", slug: "smm",
    desc: "Grow your brand presence with strategic content and community management.",
    tiers: [
      { name: "Basic", price: "KES 15,000/mo", features: ["2 Platforms", "12 posts/month", "Basic graphics"], time: "Ongoing" },
      { name: "Standard", price: "KES 35,000/mo", features: ["3 Platforms", "20 posts/month", "Stories + Reels", "Monthly report"], time: "Ongoing" },
      { name: "Premium", price: "KES 70,000/mo", features: ["All platforms", "30 posts/month", "Paid ads", "Influencer outreach", "Weekly reports"], time: "Ongoing" },
    ],
  },
  {
    icon: ShoppingBag, title: "Print-on-Demand", slug: "print-on-demand",
    desc: "Custom merchandise and digital products with no inventory needed.",
    tiers: [
      { name: "Basic", price: "KES 10,000", features: ["5 Products", "Store setup", "Basic branding"], time: "5 days" },
      { name: "Standard", price: "KES 25,000", features: ["15 Products", "Custom store", "Payment integration"], time: "10 days" },
      { name: "Premium", price: "KES 50,000", features: ["Unlimited products", "Premium store", "Marketing kit", "Ongoing support"], time: "2 weeks" },
    ],
  },
  {
    icon: Monitor, title: "POS Solutions", slug: "pos",
    desc: "Point of sale and interaction systems to modernize your business operations.",
    tiers: [
      { name: "Basic", price: "KES 25,000", features: ["POS setup", "Inventory tracking", "Basic reports"], time: "1 week" },
      { name: "Standard", price: "KES 60,000", features: ["Custom POS", "Multi-location", "Analytics"], time: "2 weeks" },
      { name: "Premium", price: "KES 120,000", features: ["Enterprise POS", "Full integration", "Training", "24/7 support"], time: "3 weeks" },
    ],
  },
];

const ServicesPage = () => (
  <Layout>
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionHeading
          label="Our Services"
          title="Solutions Built for Growth"
          description="From design to deployment, we offer end-to-end digital services tailored for African businesses."
        />

        <div className="space-y-20">
          {SERVICES.map((service, idx) => (
            <div key={service.slug} id={service.slug}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <service.icon size={20} className="text-accent" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{service.title}</h3>
              </div>
              <p className="text-muted-foreground mb-8 max-w-2xl">{service.desc}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.tiers.map((tier, ti) => (
                  <div
                    key={tier.name}
                    className={`rounded-xl border p-6 flex flex-col ${
                      ti === 1 ? "border-accent bg-accent/5 shadow-[var(--card-shadow)]" : "border-border bg-card"
                    }`}
                  >
                    {ti === 1 && (
                      <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Most Popular</span>
                    )}
                    <h4 className="font-semibold text-lg text-card-foreground">{tier.name}</h4>
                    <p className="text-2xl font-bold text-foreground mt-2 mb-1">{tier.price}</p>
                    <p className="text-xs text-muted-foreground mb-4">Delivery: {tier.time}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check size={14} className="text-accent shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant={ti === 1 ? "hero" : "outline"} className="w-full" asChild>
                      <Link to="/contact">Request Service <ArrowRight size={14} /></Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default ServicesPage;
