import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse a brand or category, open a product, choose your customisation (if any), and add it to your cart. Checkout takes you through shipping and payment.",
  },
  {
    q: "Can I customise a product?",
    a: "Many sellers accept custom requests. Use the 'Chat with brand' option on the product page to discuss colour, size, or personalisation before ordering.",
  },
  {
    q: "How do I track my order?",
    a: "Once a seller dispatches your order, they'll share tracking details over chat or email. You can also message them anytime via the brand chat.",
  },
  {
    q: "How do refunds work?",
    a: "Refunds are subjective to each seller and depend on the level of customisation. See our Returns & Refunds page for the full policy.",
  },
  {
    q: "How do I become a seller?",
    a: "Head to 'Become a Seller' from the footer or navbar and submit your application. Our team reviews each brand manually before onboarding.",
  },
];

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-3 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Support</p>
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">Help Center</h1>
            <p className="text-muted-foreground">Answers to the questions we hear most often</p>
          </header>

          <section className="rounded-2xl border border-border bg-card p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-serif text-lg">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="rounded-2xl border border-border bg-card p-8 text-center">
            <h2 className="font-serif text-2xl font-semibold">Still need help?</h2>
            <p className="mt-2 text-muted-foreground">
              Reach us at{" "}
              <a href="mailto:sol.finds01@gmail.com" className="font-medium text-foreground underline underline-offset-4">
                sol.finds01@gmail.com
              </a>{" "}
              and we'll get back within 24 hours.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
