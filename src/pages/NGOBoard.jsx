import { useState } from "react";

const initialListings = [
  {
    id: 1,
    product: "Onions",
    category: "Produce",
    quantity: 25,
    expiry: "2026-09-06",
    status: "Available",
    ngo: null,
    risk: "high",
  },
  {
    id: 2,
    product: "Fresh Milk",
    category: "Dairy",
    quantity: 15,
    expiry: "2026-09-07",
    status: "Available",
    ngo: null,
    risk: "medium",
  },
  {
    id: 3,
    product: "Rice",
    category: "Grains",
    quantity: 50,
    expiry: "2026-09-10",
    status: "Available",
    ngo: null,
    risk: "low",
  },
  {
    id: 4,
    product: "Tomatoes",
    category: "Produce",
    quantity: 30,
    expiry: "2026-09-06",
    status: "Available",
    ngo: null,
    risk: "high",
  },
];

const ngoNames = [
  "Helping Hands NGO",
  "Food Care NGO",
  "Hope Foundation",
];

const riskColor = {
  high: "border-risk-high",
  medium: "border-risk-medium",
  low: "border-risk-low",
};

const riskText = {
  high: "text-risk-high",
  medium: "text-risk-medium",
  low: "text-risk-low",
};

export default function NGOBoard() {
  const [listings, setListings] = useState(initialListings);
  const [category, setCategory] = useState("all");

  /* ---------------- CLAIM ---------------- */

  const handleClaim = (id) => {
    const randomNGO =
      ngoNames[Math.floor(Math.random() * ngoNames.length)];

    setListings((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Claimed",
              ngo: randomNGO,
            }
          : item
      )
    );
  };

  /* ---------------- UNCLAIM ---------------- */

  const handleUnclaim = (id) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Available",
              ngo: null,
            }
          : item
      )
    );
  };

  /* ---------------- FILTER ---------------- */

  const filtered =
    category === "all"
      ? listings
      : listings.filter(
          (item) =>
            item.category.toLowerCase() ===
            category.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-white px-6 py-10 md:px-10">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-8">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wide text-accent">
            NGO Portal
          </p>

          <h1 className="font-heading text-4xl font-extrabold text-text md:text-5xl">
            Available Surplus
          </h1>

          <p className="mt-3 max-w-2xl font-body text-text-muted">
            Discover surplus food available for donation and
            claim it for people who need it.
          </p>
        </div>

        {/* CATEGORY FILTER */}

        <div className="mb-6">
          <select
            className="rounded-xl border border-border bg-surface-alt p-3 font-body outline-none"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">
              All categories
            </option>

            <option value="Produce">
              Produce
            </option>

            <option value="Dairy">
              Dairy
            </option>

            <option value="Grains">
              Grains
            </option>

            <option value="Packaged">
              Packaged
            </option>

            <option value="Cooked Food">
              Cooked Food
            </option>
          </select>
        </div>

        {/* LISTINGS */}

        <div className="grid gap-5">

          {filtered.length === 0 && (
            <div className="rounded-xl bg-surface-alt p-8 text-center">
              <p className="font-body text-text-muted">
                No listings available in this category.
              </p>
            </div>
          )}

          {filtered.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between gap-5 rounded-xl bg-surface-alt p-5 shadow-sm border-2 md:flex-row md:items-center ${
                riskColor[item.risk] || "border-border"
              }`}
            >

              {/* FOOD DETAILS */}

              <div>

                <h3 className="font-heading text-xl font-bold text-text">
                  {item.product}
                </h3>

                <p className="mt-2 font-body text-sm text-text-muted">
                  {item.quantity}kg · Expires {item.expiry} ·{" "}
                  {item.category}
                </p>

                {/* RISK */}

                <p
                  className={`mt-2 font-body text-sm font-semibold ${
                    riskText[item.risk] || ""
                  }`}
                >
                  {item.risk.charAt(0).toUpperCase() +
                    item.risk.slice(1)}{" "}
                  risk
                </p>

                {/* CLAIMED NGO */}

                {item.ngo && (
                  <p className="mt-2 font-body text-sm text-text-muted">
                    Claimed by:{" "}
                    <span className="font-semibold text-text">
                      {item.ngo}
                    </span>
                  </p>
                )}

              </div>

              {/* ACTION */}

              <div className="flex-shrink-0">

                {item.status === "Available" ? (
                  <button
                    onClick={() => handleClaim(item.id)}
                    className="w-full rounded-xl bg-accent px-6 py-3 font-body font-semibold text-white transition hover:opacity-90 md:w-auto"
                  >
                    Claim
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnclaim(item.id)}
                    className="w-full rounded-xl bg-gray-600 px-6 py-3 font-body font-semibold text-white transition hover:opacity-90 md:w-auto"
                  >
                    Unclaim
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}