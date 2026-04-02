import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight, Calendar } from "lucide-react";

const POSTS = [
  {
    slug: "ai-chatbots-kenya",
    title: "How AI Chatbots Are Transforming Customer Service in Kenya",
    excerpt: "Discover how businesses across East Africa are using AI-powered chatbots to handle customer inquiries 24/7.",
    category: "AI & Automation",
    date: "March 28, 2026",
    readTime: "5 min",
  },
  {
    slug: "branding-startups",
    title: "Why Every Startup Needs a Branding Kit From Day One",
    excerpt: "First impressions matter. Here's why investing in professional branding early pays dividends.",
    category: "Design",
    date: "March 20, 2026",
    readTime: "4 min",
  },
  {
    slug: "lead-generation-strategies",
    title: "5 Lead Generation Strategies That Actually Work in 2026",
    excerpt: "From landing pages to social media funnels — proven tactics to fill your sales pipeline.",
    category: "Marketing",
    date: "March 12, 2026",
    readTime: "6 min",
  },
  {
    slug: "workflow-automation",
    title: "Automate or Fall Behind: A Guide to Workflow Automation",
    excerpt: "Repetitive tasks are costing your business time and money. Here's how to automate them.",
    category: "Automation",
    date: "March 5, 2026",
    readTime: "7 min",
  },
  {
    slug: "smm-east-africa",
    title: "Social Media Trends in East Africa for 2026",
    excerpt: "TikTok, WhatsApp Business, and Instagram Reels — what's working for African brands right now.",
    category: "Social Media",
    date: "Feb 28, 2026",
    readTime: "5 min",
  },
  {
    slug: "mpesa-integration",
    title: "Integrating M-Pesa Payments Into Your Digital Platform",
    excerpt: "A step-by-step overview of Safaricom Daraja API and how to accept mobile money payments.",
    category: "Payments",
    date: "Feb 20, 2026",
    readTime: "8 min",
  },
];

const BlogPage = () => (
  <Layout>
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionHeading
          label="Blog & Insights"
          title="Ideas That Drive Growth"
          description="Expert articles on digital marketing, AI, automation, and business growth in Africa."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-border bg-card overflow-hidden group hover:shadow-[var(--card-shadow-hover)] transition-all duration-300"
            >
              <div className="h-40 bg-secondary flex items-center justify-center">
                <span className="text-sm font-semibold text-accent uppercase tracking-widest">{post.category}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span>·</span>
                  <span>{post.readTime} read</span>
                </div>
                <h3 className="font-semibold text-card-foreground mb-2 leading-snug group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-sm font-medium text-accent flex items-center gap-1">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default BlogPage;
