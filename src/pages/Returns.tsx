import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Returns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-3 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Policy
            </p>
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
              Returns &amp; Refunds
            </h1>
            <p className="text-muted-foreground">
              Terms &amp; conditions for returns on sol.finds
            </p>
          </header>

          <section className="space-y-6 rounded-2xl border border-border bg-card p-8 leading-relaxed text-foreground">
            <p>
              Every product on sol.finds is handmade by an independent brand. Because of this,
              <strong> returns and refunds are completely subjective to the seller</strong> and
              depend heavily on the <strong>amount of customisation</strong> involved in your
              order.
            </p>

            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">How returns work</h2>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  Each seller sets their own return and refund policy. Please review it on the
                  brand's profile or product page before placing an order.
                </li>
                <li>
                  Customised, made-to-order, and personalised pieces are generally
                  <strong> non-returnable</strong>, as they are crafted uniquely for you.
                </li>
                <li>
                  Where a seller does accept returns, requests must typically be raised within the
                  window specified by that seller.
                </li>
                <li>
                  Any refund, exchange, or store credit is processed at the sole discretion of the
                  seller.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">Platform disclaimer</h2>
              <p className="text-muted-foreground">
                sol.finds is a curated discovery platform connecting buyers with independent
                makers. <strong>We do not guarantee the refund of any amount</strong> if the seller
                does not support returns on the order. By placing an order, you acknowledge and
                agree to the seller's individual return policy.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">Need help?</h2>
              <p className="text-muted-foreground">
                If you'd like to raise a return request, please reach out to the brand directly
                through the <strong>Chat with brand</strong> option on the product page. For
                anything we can help mediate, write to us at{" "}
                <a
                  href="mailto:sol.finds01@gmail.com"
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  sol.finds01@gmail.com
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
