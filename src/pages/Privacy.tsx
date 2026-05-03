import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-3 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">Legal</p>
            <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">Privacy Policy</h1>
            <p className="text-muted-foreground">How sol.finds handles your information</p>
          </header>

          <section className="space-y-6 rounded-2xl border border-border bg-card p-8 leading-relaxed text-foreground">
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">What we collect</h2>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Account details: name, email, and login credentials.</li>
                <li>Order details: shipping address, contact number, customisation notes.</li>
                <li>Usage data: pages viewed, items wishlisted, and basic device info.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">How we use it</h2>
              <p className="text-muted-foreground">
                To process orders, enable conversations between buyers and brands, improve the
                platform, and send essential service updates. We don't sell your data.
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">Sharing</h2>
              <p className="text-muted-foreground">
                Order details (name, address, customisation) are shared with the relevant seller
                so they can fulfil your order. We use trusted infrastructure providers for hosting,
                authentication, and payments.
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-semibold">Your choices</h2>
              <p className="text-muted-foreground">
                You can update or delete your account anytime. To request data export or deletion,
                email{" "}
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

export default Privacy;
