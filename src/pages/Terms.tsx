import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-3 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Legal</p>
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">Terms of Service</h1>
            <p className="text-muted-foreground">The ground rules for using sol.finds</p>
          </header>

          <section className="space-y-6 rounded-2xl border border-border bg-card p-8 leading-relaxed text-foreground">
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">1. About sol.finds</h2>
              <p className="text-muted-foreground">
                sol.finds is a curated discovery platform that connects buyers with independent
                Indian Instagram-first brands. We provide the storefront — products, fulfilment,
                and customisation are handled by individual sellers.
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">2. Accounts</h2>
              <p className="text-muted-foreground">
                You are responsible for keeping your login credentials safe and for any activity
                under your account. Sellers must be approved before listing products.
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">3. Orders & Payments</h2>
              <p className="text-muted-foreground">
                Prices, availability, and customisation options are set by sellers. Placing an
                order constitutes an offer that the seller may accept or decline.
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">4. Conduct</h2>
              <p className="text-muted-foreground">
                Don't misuse the platform — no fraud, harassment, infringement, or attempts to
                disrupt the service. We may suspend accounts that violate these terms.
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">5. Liability</h2>
              <p className="text-muted-foreground">
                sol.finds is provided on an "as is" basis. We are not liable for disputes arising
                between buyers and sellers, including product quality, delays, or refunds.
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">6. Contact</h2>
              <p className="text-muted-foreground">
                Questions? Write to us at{" "}
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

export default Terms;
