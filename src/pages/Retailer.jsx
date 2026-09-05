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

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceData, setVoiceData] = useState(null);
  const [voiceError, setVoiceError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const startVoiceInput = () => {
    setVoiceError("");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError(
        "Speech recognition is not supported. Please use Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsRecording(true);
    setTranscript("");
    setVoiceData(null);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      setTranscript(text);

      const extracted = extractVoiceData(text);

      setVoiceData(extracted);

      setIsRecording(false);
    };

    recognition.onerror = () => {
      setVoiceError(
        "Could not understand the voice input. Please try again."
      );

      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const extractVoiceData = (text) => {
    const lowerText = text.toLowerCase();

    /* ---------------- PRODUCT ---------------- */

    const products = [
      "tomatoes",
      "tomato",
      "potatoes",
      "potato",
      "onions",
      "onion",
      "carrots",
      "carrot",
      "apples",
      "apple",
      "bananas",
      "banana",
      "mangoes",
      "mango",
      "rice",
      "wheat",
      "milk",
      "bread",
    ];

    let product = "";

    for (const item of products) {
      if (lowerText.includes(item)) {
        product = item;
        break;
      }
    }

    if (product.endsWith("oes")) {
      product = product.slice(0, -2);
    } else if (product.endsWith("es")) {
      product = product.slice(0, -2);
    } else if (product.endsWith("s")) {
      product = product.slice(0, -1);
    }

    if (product) {
      product =
        product.charAt(0).toUpperCase() + product.slice(1);
    }

    /* ---------------- CATEGORY ---------------- */

    let category = "";

    if (
      [
        "tomato",
        "potato",
        "onion",
        "carrot",
        "apple",
        "banana",
        "mango",
      ].includes(product.toLowerCase())
    ) {
      category = "Produce";
    } else if (product.toLowerCase() === "milk") {
      category = "Dairy";
    } else if (
      ["rice", "wheat"].includes(product.toLowerCase())
    ) {
      category = "Grains";
    } else if (product.toLowerCase() === "bread") {
      category = "Packaged";
    }

    /* ---------------- QUANTITY ---------------- */

    const quantityMatch = lowerText.match(
      /(\d+(?:\.\d+)?)\s*(kg|kilograms?|g|grams?|quintals?|tons?|tonnes?)/
    );

    let quantity = "";
    let unit = "";

    if (quantityMatch) {
      quantity = Number(quantityMatch[1]);

      const detectedUnit = quantityMatch[2];

      if (
        detectedUnit === "kg" ||
        detectedUnit.startsWith("kilogram")
      ) {
        unit = "kg";
      } else if (
        detectedUnit === "g" ||
        detectedUnit.startsWith("gram")
      ) {
        unit = "g";
      } else if (detectedUnit.startsWith("quintal")) {
        unit = "quintal";
      } else {
        unit = "ton";
      }
    }

    /* ---------------- EXPIRY DATE ---------------- */

    const months = {
      january: "01",
      february: "02",
      march: "03",
      april: "04",
      may: "05",
      june: "06",
      july: "07",
      august: "08",
      september: "09",
      october: "10",
      november: "11",
      december: "12",
    };

    let expiry = "";

    /*
      Supports:

      10th September 2026
      10 September 2026
      September 10 2026
      10th September
      September 10
    */

    let expiryMatch = lowerText.match(
      /(?:expiry|expires?|expire|expiry date)\s*(?:at|on|is)?\s*(\d{1,2})(?:st|nd|rd|th)?\s*(january|february|march|april|may|june|july|august|september|october|november|december)(?:\s*(\d{4}))?/
    );

    if (expiryMatch) {
      const day = expiryMatch[1].padStart(2, "0");
      const month = months[expiryMatch[2]];
      const year = expiryMatch[3] || new Date().getFullYear();

      expiry = `${year}-${month}-${day}`;
    }

    /*
      Also supports:

      September 10 2026
      September 10
    */

    if (!expiry) {
      expiryMatch = lowerText.match(
        /(?:expiry|expires?|expire|expiry date)\s*(?:at|on|is)?\s*(january|february|march|april|may|june|july|august|september|october|november|december)\s*(\d{1,2})(?:st|nd|rd|th)?(?:\s*(\d{4}))?/
      );

      if (expiryMatch) {
        const month = months[expiryMatch[1]];
        const day = expiryMatch[2].padStart(2, "0");
        const year = expiryMatch[3] || new Date().getFullYear();

        expiry = `${year}-${month}-${day}`;
      }
    }

    /*
      Also supports:

      10/09/2026
      10-09-2026
    */

    if (!expiry) {
      expiryMatch = lowerText.match(
        /(?:expiry|expires?|expire|expiry date)\s*(?:at|on|is)?\s*(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})/
      );

      if (expiryMatch) {
        const day = expiryMatch[1].padStart(2, "0");
        const month = expiryMatch[2].padStart(2, "0");
        const year = expiryMatch[3];

        expiry = `${year}-${month}-${day}`;
      }
    }

    return {
      product,
      category,
      quantity,
      unit,
      expiry,
    };
  };

  /* ---------------- VOICE CONFIRM ---------------- */

  const handleConfirmVoice = () => {
    if (!voiceData) return;

    if (!voiceData.product) {
      alert("Product name could not be detected.");
      return;
    }

    if (!voiceData.category) {
      alert("Category could not be detected.");
      return;
    }

    if (!voiceData.quantity || Number(voiceData.quantity) <= 0) {
      alert("Quantity could not be detected.");
      return;
    }

    if (!voiceData.expiry) {
      alert(
        "Expiry date could not be detected. Please say something like 'expiry 10th September 2026'."
      );
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (voiceData.expiry <= today) {
      alert("Expiry date must be after today.");
      return;
    }

    /* CREATE LISTING DIRECTLY */

    const existingListings =
      JSON.parse(localStorage.getItem("retailerListings")) || [];

    const newListing = {
      id: Date.now(),
      product: voiceData.product,
      category: voiceData.category,
      quantity: Number(voiceData.quantity),
      expiry: voiceData.expiry,
      description: "",
      status: "Available",
      ngo: null,
    };

    const updatedListings = [
      newListing,
      ...existingListings,
    ];

    localStorage.setItem(
      "retailerListings",
      JSON.stringify(updatedListings)
    );

    alert("Voice listing created successfully!");

    setVoiceData(null);
    setTranscript("");
  };

  /* ---------------- WRITTEN FORM ---------------- */

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

    const updatedListings = [
      newListing,
      ...existingListings,
    ];

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

        {/* HEADER */}

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

        {/* CREATE LISTING CARD */}

        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>
              <h2 className="font-heading text-2xl font-bold text-gray-900">
                Create New Listing
              </h2>

              <p className="mt-2 font-body text-text-muted">
                Add your surplus food details below.
              </p>
            </div>

            <button
              type="button"
              onClick={startVoiceInput}
              disabled={isRecording}
              className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-body font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="text-lg">🎤</span>

              {isRecording
                ? "Listening..."
                : "Fill with Voice"}
            </button>

          </div>

          {/* VOICE ERROR */}

          {voiceError && (
            <div className="mt-6 rounded-xl bg-red-50 p-4">
              <p className="font-body text-sm text-red-700">
                {voiceError}
              </p>
            </div>
          )}

          {/* WHAT YOU SAID */}

          {transcript && (
            <div className="mt-6 rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100">

              <p className="font-body text-sm font-semibold text-gray-500">
                What you said
              </p>

              <p className="mt-2 font-body text-lg text-gray-900">
                "{transcript}"
              </p>

            </div>
          )}

          {/* VOICE CONFIRMATION */}

          {voiceData && (
            <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">

              <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent">
                Confirm Details
              </p>

              <h2 className="mt-2 font-heading text-2xl font-bold text-gray-900">
                Is this information correct?
              </h2>

              <div className="mt-6 space-y-5">

                {/* PRODUCT NAME */}

                <div>
                  <label className="mb-2 block font-body font-semibold text-gray-900">
                    Product Name
                  </label>

                  <input
                    type="text"
                    value={voiceData.product}
                    onChange={(e) =>
                      setVoiceData({
                        ...voiceData,
                        product: e.target.value,
                      })
                    }
                    placeholder="Not detected"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                  />
                </div>

                {/* CATEGORY */}

                <div>
                  <label className="mb-2 block font-body font-semibold text-gray-900">
                    Category
                  </label>

                  <select
                    value={voiceData.category}
                    onChange={(e) =>
                      setVoiceData({
                        ...voiceData,
                        category: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-brand"
                  >
                    <option value="">
                      Select Category
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

                {/* QUANTITY */}

                <div>
                  <label className="mb-2 block font-body font-semibold text-gray-900">
                    Quantity (kg)
                  </label>

                  <input
                    type="number"
                    value={voiceData.quantity}
                    onChange={(e) =>
                      setVoiceData({
                        ...voiceData,
                        quantity: e.target.value,
                      })
                    }
                    min="1"
                    placeholder="Not detected"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                  />
                </div>

                {/* EXPIRY DATE */}

                <div>
                  <label className="mb-2 block font-body font-semibold text-gray-900">
                    Expiry Date
                  </label>

                  <input
                    type="date"
                    value={voiceData.expiry}
                    onChange={(e) =>
                      setVoiceData({
                        ...voiceData,
                        expiry: e.target.value,
                      })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                  />
                </div>

              </div>

              {/* CONFIRM */}

              <button
                type="button"
                onClick={handleConfirmVoice}
                className="mt-8 w-full rounded-xl bg-accent px-6 py-3 font-body font-semibold text-white transition hover:opacity-90"
              >
                Confirm
              </button>

            </div>
          )}

          {/* NORMAL WRITTEN FORM */}

          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* PRODUCT */}

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

              {/* CATEGORY */}

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
                  <option value="">
                    Select Category
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

              {/* QUANTITY */}

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

              {/* EXPIRY */}

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

            {/* DESCRIPTION - WRITTEN FORM ONLY */}

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

            {/* CREATE LISTING */}

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