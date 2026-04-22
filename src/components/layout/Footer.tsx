import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";

const shopLinks = [
  { label: "Embroidery", to: "/categories?category=embroidery" },
  { label: "Candles", to: "/categories?category=candles" },
  { label: "Rugs", to: "/categories?category=rugs" },
  { label: "Handmade Gifting", to: "/categories?category=handmade-gifting" },
  { label: "New Arrivals", to: "/categories" },
];

const sellerLinks = [
  { label: "Become a Seller", to: "/sell/apply" },
  { label: "Seller Dashboard", to: "/sell/dashboard" },
  { label: "Seller Guidelines", to: "/sell" },
  { label: "Success Stories", to: "/about" },
];

const supportLinks = [
  { label: "Help Center", to: "/about" },
  { label: "Shipping Info", to: "/about" },
  { label: "Returns & Refunds", to: "/about" },
  { label: "Privacy Policy", to: "/about" },
  { label: "Terms of Service", to: "/about" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="font-serif text-2xl font-bold text-foreground">Kalakriti</Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              India's curated discovery platform for homegrown Instagram brands. Handmade, authentic, and crafted with love.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-muted p-2 transition-colors hover:bg-primary hover:text-primary-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="mailto:hello@kalakriti.in" aria-label="Email" className="rounded-full bg-muted p-2 transition-colors hover:bg-primary hover:text-primary-foreground">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-foreground">Shop</h4>
            <div className="flex flex-col gap-2">
              {shopLinks.map((item) => (
                <Link key={item.label} to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Sellers */}
          <div className="space-y-4">
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-foreground">Sellers</h4>
            <div className="flex flex-col gap-2">
              {sellerLinks.map((item) => (
                <Link key={item.label} to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-sans text-sm font-semibold uppercase tracking-wider text-foreground">Support</h4>
            <div className="flex flex-col gap-2">
              {supportLinks.map((item) => (
                <Link key={item.label} to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kalakriti. All rights reserved. Made with ♥ in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
