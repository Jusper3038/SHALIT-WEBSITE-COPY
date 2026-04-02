import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const leadData = {
      name: (formData.get("name") as string).trim(),
      email: (formData.get("email") as string).trim() || null,
      phone: (formData.get("phone") as string).trim() || null,
      company: (formData.get("company") as string).trim() || null,
      service: (formData.get("service") as string) || null,
      budget: (formData.get("budget") as string) || null,
      message: (formData.get("message") as string).trim() || null,
    };

    const { error } = await supabase.from("leads").insert(leadData);

    setLoading(false);

    if (error) {
      toast({ title: "Something went wrong", description: "Please try again or contact us via WhatsApp.", variant: "destructive" });
    } else {
      toast({ title: "Message sent! ✅", description: "We'll get back to you within 1 hour during business hours." });
      form.reset();
    }
  };

  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container">
          <SectionHeading
            label="Get in Touch"
            title="Let's Build Something Great"
            description="Whether you need a logo, a chatbot, or a full digital strategy — we're here to help. Reach us on WhatsApp for the fastest response."
          />

          {/* Quick contact buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button variant="hero" size="lg" asChild>
              <a href="https://wa.me/254700000000?text=Hi%20Shalit%20Group%2C%20I%27d%20like%20to%20inquire%20about%20your%20services" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} /> WhatsApp Us
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+254700000000">
                <Phone size={18} /> Call Now
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@shalitgroup.com" },
                { icon: Phone, label: "Phone", value: "+254 700 000 000" },
                { icon: MapPin, label: "Location", value: "Nairobi, Kenya" },
                { icon: Clock, label: "Response Time", value: "Within 1 hour (Mon–Fri, 8am–6pm EAT)" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                <p className="text-sm font-medium text-foreground mb-1">💰 Payment Methods</p>
                <p className="text-sm text-muted-foreground">M-Pesa (preferred) • Visa • Mastercard</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Your Name" required name="name" maxLength={100} />
                <Input placeholder="Email Address" type="email" required name="email" maxLength={255} />
              </div>
              <Input placeholder="Phone Number (e.g. 0712 345 678)" name="phone" type="tel" maxLength={20} />
              <Input placeholder="Company / Business Name" name="company" maxLength={100} />
              <select
                name="service"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue=""
              >
                <option value="" disabled>Select a service you're interested in</option>
                <option>Graphic Design</option>
                <option>Telesales Services</option>
                <option>Lead Generation</option>
                <option>AI Integration</option>
                <option>Workflow Automation</option>
                <option>Social Media Management</option>
                <option>Print-on-Demand</option>
                <option>POS Solutions</option>
                <option>Other</option>
              </select>
              <select
                name="budget"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue=""
              >
                <option value="" disabled>Estimated budget (KES)</option>
                <option>Under KES 10,000</option>
                <option>KES 10,000 – 50,000</option>
                <option>KES 50,000 – 100,000</option>
                <option>KES 100,000+</option>
                <option>Not sure yet</option>
              </select>
              <Textarea placeholder="Tell us about your project..." rows={4} required name="message" maxLength={2000} />
              <Button variant="hero" size="lg" type="submit" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Inquiry"} <Send size={16} />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                We respond within 1 hour during business hours. For urgent requests, use WhatsApp.
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
