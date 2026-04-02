import { MessageCircle } from "lucide-react";

const FloatingCTA = () => (
  <>
    {/* WhatsApp floating button */}
    <a
      href="https://wa.me/254700000000?text=Hi%20Shalit%20Group%2C%20I%27d%20like%20to%20inquire%20about%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 z-40 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>

    {/* Mobile sticky bottom CTA bar */}
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur border-t border-border px-4 py-2.5 flex gap-2">
      <a
        href="tel:+254700000000"
        className="flex-1 text-center py-2.5 rounded-lg border border-border text-sm font-medium text-foreground"
      >
        📞 Call
      </a>
      <a
        href="https://wa.me/254700000000?text=Hi%20Shalit%20Group%2C%20I%27d%20like%20to%20inquire%20about%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 text-center py-2.5 rounded-lg bg-[hsl(142,70%,45%)] text-white text-sm font-medium"
      >
        💬 WhatsApp
      </a>
      <a
        href="/contact"
        className="flex-1 text-center py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium"
      >
        Get Quote
      </a>
    </div>
  </>
);

export default FloatingCTA;