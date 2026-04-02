import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <img src={logo} alt="Shalit Group" className="h-14 w-auto mb-4 brightness-0 invert" />
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Your trusted partner in digital transformation. Premium design, AI automation, and growth services across Kenya &amp; East Africa.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/services#graphic-design" className="hover:text-accent transition-colors">Graphic Design</Link></li>
            <li><Link to="/services#ai-integration" className="hover:text-accent transition-colors">AI Integration</Link></li>
            <li><Link to="/services#lead-generation" className="hover:text-accent transition-colors">Lead Generation</Link></li>
            <li><Link to="/services#smm" className="hover:text-accent transition-colors">Social Media</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
            <li><Link to="/products" className="hover:text-accent transition-colors">Digital Products</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Reach Us</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-2"><Mail size={14} className="text-accent" /> hello@shalitgroup.com</li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-accent" /> +254 700 000 000</li>
            <li className="flex items-center gap-2"><MapPin size={14} className="text-accent" /> Nairobi, Kenya</li>
          </ul>
          <div className="mt-4 p-3 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
            <p className="text-xs text-primary-foreground/50 mb-1">We accept</p>
            <p className="text-sm font-medium text-primary-foreground/80">M-Pesa • Visa • Mastercard</p>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} Shalit Group. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;