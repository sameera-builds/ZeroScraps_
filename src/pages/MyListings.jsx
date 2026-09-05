import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    product: "",
    category: "",
    quantity: "",
    expiry: "",
    description: "",
  });

  useEffect(() => {
    const savedListings =
      JSON.parse(localStorage.getItem("retailerListings")) || [];

    setListings(savedListings);
  }, []);

  const handleDelete = (id) => {
    const updatedListings = listings.filter(
      (listing) => listing.id !== id
    );

    localStorage.setItem(
      "retailerListings",
      JSON.stringify(updatedListings)
    );

    setListings(updatedListings);
  };

  const handleEdit = (listing) => {
    setEditingId(listing.id);

    setEditData({
      product: listing.product,
      category: listing.category,
      quantity: listing.quantity,
      expiry: listing.expiry,
      description: listing.description || "",
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = (id) => {
    const today = new Date().toISOString().split("T")[0];

    if (Number(editData.quantity) <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    if (editData.expiry <= today) {
      alert("Expiry date must be after today.");
      return;
    }

    const updatedListings = listings.map((listing) =>
      listing.id === id
        ? {
            ...listing,
            product: editData.product,
            category: editData.category,
            quantity: Number(editData.quantity),
            expiry: editData.expiry,
            description: editData.description,
          }
        : listing
    );

    localStorage.setItem(
      "retailerListings",
      JSON.stringify(updatedListings)
    );

    setListings(updatedListings);
    setEditingId(null);

    alert("Listing updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wide text-accent">
            Retailer Portal
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                My Listings
              </h1>

              <p className="mt-3 max-w-2xl font-body text-text-muted">
                View and manage your surplus food listings.
              </p>
            </div>

            <Link
              to="/retailer"
              className="w-fit rounded-xl bg-accent px-5 py-3 font-body font-semibold text-white transition hover:opacity-90"
            >
              Create Listing
            </Link>
          </div>
        </div>

        {/* Empty State */}
        {listings.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100">
            <h2 className="font-heading text-2xl font-bold text-gray-900">
              No listings yet
            </h2>

            <p className="mt-2 font-body text-text-muted">
              Create your first surplus food listing to get started.
            </p>

            <Link
              to="/retailer"
              className="mt-6 inline-block rounded-xl bg-accent px-6 py-3 font-body font-semibold text-white transition hover:opacity-90"
            >
              Create Listing
            </Link>
          </div>
        ) : (
          <div className="space-y-5">

            {listings.map((listing) => (
              <div
                key={listing.id}
                className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
              >

                {editingId === listing.id ? (
                  /* EDIT MODE */
                  <div>

                    <h2 className="mb-6 font-heading text-2xl font-bold text-gray-900">
                      Edit Listing
                    </h2>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                      <div>
                        <label className="mb-2 block font-body font-semibold text-gray-900">
                          Product Name
                        </label>

                        <input
                          type="text"
                          name="product"
                          value={editData.product}
                          onChange={handleEditChange}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block font-body font-semibold text-gray-900">
                          Category
                        </label>

                        <select
                          name="category"
                          value={editData.category}
                          onChange={handleEditChange}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-brand"
                        >
                          <option value="">Select Category</option>
                          <option value="Produce">Produce</option>
                          <option value="Dairy">Dairy</option>
                          <option value="Grains">Grains</option>
                          <option value="Packaged">Packaged</option>
                          <option value="Cooked Food">Cooked Food</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block font-body font-semibold text-gray-900">
                          Quantity (kg)
                        </label>

                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          value={editData.quantity}
                          onChange={handleEditChange}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block font-body font-semibold text-gray-900">
                          Expiry Date
                        </label>

                        <input
                          type="date"
                          name="expiry"
                          min={new Date().toISOString().split("T")[0]}
                          value={editData.expiry}
                          onChange={handleEditChange}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                        />
                      </div>

                    </div>

                    <div className="mt-5">
                      <label className="mb-2 block font-body font-semibold text-gray-900">
                        Description
                      </label>

                      <textarea
                        name="description"
                        rows="4"
                        value={editData.description}
                        onChange={handleEditChange}
                        className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                      />
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">

                      <button
                        type="button"
                        onClick={() => handleSaveEdit(listing.id)}
                        className="rounded-xl bg-accent px-5 py-3 font-body font-semibold text-white transition hover:opacity-90"
                      >
                        Save Changes
                      </button>

                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="rounded-xl border border-gray-200 px-5 py-3 font-body font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        Cancel
                      </button>

                    </div>

                  </div>
                ) : (
                  /* NORMAL MODE */
                  <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">

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

                      {listing.description && (
                        <p className="mt-2 font-body text-sm text-text-muted">
                          {listing.description}
                        </p>
                      )}
                    </div>

                    <div className="w-full md:w-auto">
                      <div className="flex flex-col items-start md:items-end">

                        <span
                          className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                            listing.status === "Claimed"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {listing.status}
                        </span>

                        {/* NGO Contact Information */}
                        {listing.status === "Claimed" &&
                          listing.ngo && (
                            <div className="mt-4 w-full rounded-xl bg-green-50 p-4 md:w-80">

                              <p className="font-body text-sm font-bold text-green-800">
                                Claimed by NGO
                              </p>

                              <p className="mt-2 font-body text-sm font-semibold text-gray-900">
                                {listing.ngo.name}
                              </p>

                              <p className="mt-1 font-body text-sm text-text-muted">
                                Contact: {listing.ngo.contactPerson}
                              </p>

                              <p className="mt-1 font-body text-sm text-text-muted">
                                📞 {listing.ngo.phone}
                              </p>

                              <p className="mt-1 font-body text-sm text-text-muted">
                                ✉️ {listing.ngo.email}
                              </p>

                            </div>
                          )}

                        <div className="mt-4 flex flex-wrap gap-2">

                          <button
                            type="button"
                            onClick={() => handleEdit(listing)}
                            disabled={listing.status === "Claimed"}
                            className={`rounded-xl border px-4 py-2 font-body text-sm font-semibold transition ${
                              listing.status === "Claimed"
                                ? "cursor-not-allowed border-gray-200 text-gray-400"
                                : "border-brand text-brand hover:bg-brand hover:text-white"
                            }`}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(listing.id)}
                            disabled={listing.status === "Claimed"}
                            className={`rounded-xl border px-4 py-2 font-body text-sm font-semibold transition ${
                              listing.status === "Claimed"
                                ? "cursor-not-allowed border-gray-200 text-gray-400"
                                : "border-red-200 text-red-600 hover:bg-red-50"
                            }`}
                          >
                            Delete
                          </button>

                        </div>

                      </div>
                    </div>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}