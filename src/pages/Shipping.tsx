import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-3 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Logistics</p>
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">Shipping Info</h1>
            <p className="text-muted-foreground">How orders travel from our makers to you</p>
          </header>

          <section className="space-y-6 rounded-2xl border border-border bg-card p-8 leading-relaxed text-foreground">
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">Processing time</h2>
              <p className="text-muted-foreground">
                Since every product is handmade, processing usually takes <strong>3–10 business
                days</strong>. Customised or made-to-order pieces may take longer — the seller
                will confirm a timeline over chat.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">Delivery</h2>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li><strong>Metros:</strong> 2–4 business days after dispatch.</li>
                <li><strong>Rest of India:</strong> 4–8 business days after dispatch.</li>
                <li><strong>International:</strong> Available on select brands; timelines and
                  charges are shared at checkout.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">Charges</h2>
              <p className="text-muted-foreground">
                Shipping is calculated by each seller based on weight and destination. Many brands
                offer free shipping above a minimum order value — look out for it on the product
                page.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">Tracking</h2>
              <p className="text-muted-foreground">
                Once dispatched, the seller will share a tracking link via the brand chat or email.
                You can always reach the seller through the <strong>Chat with brand</strong> option
                on the product page.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">Delays</h2>
              <p className="text-muted-foreground">
                Handmade work and courier networks can occasionally face delays. If your order
                seems stuck, message the seller first; for unresolved issues write to{" "}
                <a href="mailto:sol.finds01@gmail.com" className="font-medium text-foreground underline underline-offset-4">
                  sol.finds01@gmail.com
                </a>.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;
