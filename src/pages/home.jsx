import { ArrowRight } from "lucide-react";

function Home() {
  return (
    <div>
      <section className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex rounded-full bg-brand/10 px-4 py-2 text-sm font-semibold text-brand">
            Smart India Hackathon MVP
          </span>

          <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold leading-tight text-text sm:text-5xl lg:text-6xl">
            Turn surplus food into{" "}
            <span className="text-brand">shared meals.</span>
          </h1>

          <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-text-muted">
            ZeroScraps connects retailers with NGOs to reduce food waste and
            route surplus food to communities that need it.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-body font-semibold text-white hover:opacity-90">
              Open Retailer Portal
              <ArrowRight size={18} />
            </button>
            <button className="rounded-xl border border-brand px-6 py-3.5 font-body font-semibold text-brand hover:bg-brand hover:text-white">
              Explore Map
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Stat title="Active Listings" value="0" text="Available surplus" />
          <Stat title="Units Rescued" value="0" text="Food saved" />
          <Stat title="Estimated Meals" value="0" text="Meals supported" />
          <Stat title="Partner NGOs" value="0" text="Active partners" />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-body text-sm font-semibold uppercase tracking-wider text-accent">
            How it works
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-text">
            How the loop closes
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <Step number="1" title="Retailer lists surplus" text="Product, quantity, expiry and price are added." />
            <Step number="2" title="NGO discovers" text="Nearby NGOs find suitable available listings." />
            <Step number="3" title="NGO claims food" text="An NGO reserves the surplus for collection." />
            <Step number="4" title="Food is routed" text="The platform helps coordinate the handover." />
            <Step number="5" title="QR verifies" text="The completed handover is verified." />
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ title, value, text }) {
  return (
    <div className="rounded-xl border border-border bg-surface-alt p-6 shadow-sm">
      <p className="text-sm text-text-muted">{title}</p>
      <p className="mt-2 font-heading text-3xl font-bold text-brand">{value}</p>
      <p className="mt-1 text-xs text-text-muted">{text}</p>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="rounded-xl border border-border bg-surface-alt p-5 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
        {number}
      </div>
      <h3 className="mt-5 font-heading text-lg font-bold text-text">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-text-muted">{text}</p>
    </div>
  );
}

export default Home;