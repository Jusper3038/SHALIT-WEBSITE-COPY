import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Download, Eye, ArrowRight, ShoppingCart, Smartphone } from "lucide-react";

const PRODUCTS = [
  { id: 1, title: "Social Media Kit – Business Starter", category: "Templates", price: "KES 2,500", preview: "50+ ready-to-use social media templates for Instagram, Facebook & LinkedIn." },
  { id: 2, title: "Logo Template Pack", category: "Design", price: "KES 1,500", preview: "20 customizable logo templates in AI & PSD formats." },
  { id: 3, title: "Business Card Templates", category: "Print", price: "KES 1,000", preview: "15 premium business card designs ready for print." },
  { id: 4, title: "Instagram Story Pack", category: "Templates", price: "KES 2,000", preview: "30 animated Instagram story templates for brands." },
  { id: 5, title: "Pitch Deck Template", category: "Presentation", price: "KES 3,000", preview: "Professional 20-slide pitch deck for startups." },
  { id: 6, title: "Email Marketing Kit", category: "Marketing", price: "KES 3,500", preview: "10 email templates + subject line guide + A/B testing checklist." },
];

const ProductsPage = () => (
  <Layout>
    <section className="py-20 md:py-28">
      <div className="container">
        <SectionHeading
          label="Digital Products"
          title="Ready-Made Digital Assets"
          description="Download premium templates, design kits, and marketing tools. Instant delivery after M-Pesa payment."
        />

        {/* M-Pesa info banner */}
        <div className="max-w-md mx-auto mb-10 p-4 rounded-xl bg-accent/5 border border-accent/10 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Smartphone size={16} className="text-accent" />
            <p className="text-sm font-medium text-foreground">Pay with M-Pesa</p>
          </div>
          <p className="text-xs text-muted-foreground">Instant STK Push • Download immediately after payment</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card overflow-hidden group hover:shadow-[var(--card-shadow-hover)] transition-all duration-300">
              <div className="h-48 bg-secondary flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Download size={24} className="text-accent" />
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">{p.category}</span>
                <h3 className="font-semibold text-lg text-card-foreground mt-2 mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.preview}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-foreground">{p.price}</span>
                  <Button variant="hero" size="sm">
                    <ShoppingCart size={14} /> Buy via M-Pesa
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default ProductsPage;