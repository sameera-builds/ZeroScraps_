export default function MyListings() {
  const listings = [
    {
      id: 1,
      product: "Fresh Milk",
      category: "Dairy",
      quantity: 50,
      expiry: "21 Sep 2026",
      status: "Available",
    },
    {
      id: 2,
      product: "Bread",
      category: "Bakery",
      quantity: 25,
      expiry: "18 Sep 2026",
      status: "Claimed",
      ngo: "Helping Hands NGO",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wide text-accent">
            Retailer Portal
          </p>

          <h1 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
            My Listings
          </h1>

          <p className="mt-3 max-w-2xl font-body text-text-muted">
            View your surplus food listings and check their claim status.
          </p>
        </div>

        {/* Listings */}
        <div className="space-y-5">

          {listings.map((listing) => (
            <div
              key={listing.id}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                <div>
                  <h2 className="font-heading text-xl font-bold text-gray-900">
                    {listing.product}
                  </h2>

                  <p className="mt-1 font-body text-sm text-text-muted">
                    {listing.category} · {listing.quantity} kg
                  </p>

                  <p className="mt-2 font-body text-sm text-text-muted">
                    Expiry: {listing.expiry}
                  </p>
                </div>

                <div className="text-left md:text-right">

                  <span
                    className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                      listing.status === "Claimed"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {listing.status}
                  </span>

                  {listing.status === "Claimed" && (
                    <p className="mt-2 font-body text-sm text-text-muted">
                      Claimed by: {listing.ngo}
                    </p>
                  )}

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}