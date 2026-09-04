import { useState } from "react";
import { Link } from "react-router-dom";

export default function Retailer() {
  const [formData, setFormData] = useState({
    product: "",
    category: "",
    quantity: "",
    expiry: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    if (Number(formData.quantity) <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }

    if (formData.expiry <= today) {
      alert("Expiry date must be after today.");
      return;
    }

    const existingListings =
      JSON.parse(localStorage.getItem("retailerListings")) || [];

    const newListing = {
      id: Date.now(),
      product: formData.product,
      category: formData.category,
      quantity: Number(formData.quantity),
      expiry: formData.expiry,
      description: formData.description,
      status: "Available",
      ngo: null,
    };

    const updatedListings = [newListing, ...existingListings];

    localStorage.setItem(
      "retailerListings",
      JSON.stringify(updatedListings)
    );

    alert("Listing created successfully!");

    setFormData({
      product: "",
      category: "",
      quantity: "",
      expiry: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wide text-accent">
            Retailer Portal
          </p>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
                Manage your surplus food
              </h1>

              <p className="mt-3 max-w-2xl font-body text-text-muted">
                Create food listings and help nearby NGOs discover surplus
                food before it goes to waste.
              </p>
            </div>

            <Link
              to="/my-listings"
              className="w-fit rounded-xl border border-brand px-5 py-3 font-body font-semibold text-brand transition hover:bg-brand hover:text-white"
            >
              My Listings
            </Link>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            Create New Listing
          </h2>

          <p className="mt-2 font-body text-text-muted">
            Add your surplus food details below.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block font-body font-semibold text-gray-900">
                  Product Name
                </label>

                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="Example: Fresh Milk"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-body font-semibold text-gray-900">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-brand"
                  required
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
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Example: 50"
                  min="1"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-body font-semibold text-gray-900">
                  Expiry Date
                </label>

                <input
                  type="date"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                  required
                />
              </div>

            </div>

            <div className="mt-6">
              <label className="mb-2 block font-body font-semibold text-gray-900">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the surplus food..."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
              />
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-accent px-6 py-3 font-body font-semibold text-white transition hover:opacity-90"
              >
                Create Listing
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}