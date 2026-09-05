import { useState } from "react";
import { getPricingRecommendation } from "../utils/pricing";

export default function Pricing() {
  const [product, setProduct] = useState("Tomatoes");
  const [demand, setDemand] = useState("high");
  const [quantity, setQuantity] = useState(50);
  const [daysToExpiry, setDaysToExpiry] = useState(5);
  const [currentPrice, setCurrentPrice] = useState(100);
  const [marketPrice, setMarketPrice] = useState(110);
  const [marketCondition, setMarketCondition] = useState("stable");
  const [buyersAvailable, setBuyersAvailable] = useState(true);
  const [isSafe, setIsSafe] = useState(true);

  const initialRecommendation = getPricingRecommendation({
    demand: "high",
    quantity: 50,
    daysToExpiry: 5,
    currentPrice: 100,
    marketPrice: 110,
    marketCondition: "stable",
    buyersAvailable: true,
    isSafe: true,
  });

  const [recommendation, setRecommendation] = useState(
    initialRecommendation
  );

  const generateRecommendation = () => {
    const result = getPricingRecommendation({
      demand,
      quantity: Number(quantity),
      daysToExpiry: Number(daysToExpiry),
      currentPrice: Number(currentPrice),
      marketPrice: Number(marketPrice),
      marketCondition,
      buyersAvailable,
      isSafe,
    });

    setRecommendation(result);
  };

  const loadScenario = (scenario) => {
    let scenarioData = {};

    if (scenario === "sell") {
      scenarioData = {
        demand: "high",
        quantity: 20,
        daysToExpiry: 7,
        currentPrice: 100,
        marketPrice: 110,
        marketCondition: "rising",
        buyersAvailable: true,
        isSafe: true,
      };
    }

    if (scenario === "discount") {
      scenarioData = {
        demand: "declining",
        quantity: 60,
        daysToExpiry: 5,
        currentPrice: 100,
        marketPrice: 100,
        marketCondition: "stable",
        buyersAvailable: true,
        isSafe: true,
      };
    }

    if (scenario === "urgent") {
      scenarioData = {
        demand: "high",
        quantity: 50,
        daysToExpiry: 1,
        currentPrice: 153,
        marketPrice: 110,
        marketCondition: "falling",
        buyersAvailable: true,
        isSafe: true,
      };
    }

    if (scenario === "donate") {
      scenarioData = {
        demand: "low",
        quantity: 80,
        daysToExpiry: 5,
        currentPrice: 100,
        marketPrice: 100,
        marketCondition: "falling",
        buyersAvailable: false,
        isSafe: true,
      };
    }

    if (scenario === "unsafe") {
      scenarioData = {
        demand: "high",
        quantity: 30,
        daysToExpiry: 0,
        currentPrice: 100,
        marketPrice: 110,
        marketCondition: "stable",
        buyersAvailable: true,
        isSafe: false,
      };
    }

    setDemand(scenarioData.demand);
    setQuantity(scenarioData.quantity);
    setDaysToExpiry(scenarioData.daysToExpiry);
    setCurrentPrice(scenarioData.currentPrice);
    setMarketPrice(scenarioData.marketPrice);
    setMarketCondition(scenarioData.marketCondition);
    setBuyersAvailable(scenarioData.buyersAvailable);
    setIsSafe(scenarioData.isSafe);

    const result = getPricingRecommendation(scenarioData);
    setRecommendation(result);
  };

  const getStatusStyle = () => {
    switch (recommendation.status) {
      case "SELL NOW":
        return "border-green-200 bg-green-50 text-green-700";

      case "DISCOUNT":
        return "border-yellow-200 bg-yellow-50 text-yellow-700";

      case "URGENT SALE":
        return "border-orange-200 bg-orange-50 text-orange-700";

      case "DONATE":
        return "border-red-200 bg-red-50 text-red-700";

      case "DO NOT DISTRIBUTE":
        return "border-gray-300 bg-gray-100 text-gray-700";

      default:
        return "border-gray-200 bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wide text-accent">
            AI Pricing Assistant
          </p>

          <h1 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
            Dynamic Pricing Recommendation
          </h1>

          <p className="mt-3 max-w-3xl font-body text-text-muted">
            Get smart pricing recommendations based on demand, quantity,
            freshness, market conditions, and buyer availability.
          </p>
        </div>

        {/* Scenario Buttons */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="font-heading text-xl font-bold text-gray-900">
            Test Scenarios
          </h2>

          <p className="mt-1 font-body text-sm text-text-muted">
            Try different situations to see how the recommendation changes.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => loadScenario("sell")}
              className="rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-100"
            >
              🟢 High Demand
            </button>

            <button
              onClick={() => loadScenario("discount")}
              className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-2.5 text-sm font-semibold text-yellow-700 transition hover:bg-yellow-100"
            >
              🟡 Declining Demand
            </button>

            <button
              onClick={() => loadScenario("urgent")}
              className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
            >
              🟠 Near Expiry
            </button>

            <button
              onClick={() => loadScenario("donate")}
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
              🔴 No Buyers
            </button>

            <button
              onClick={() => loadScenario("unsafe")}
              className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
            >
              ❌ Unsafe
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Input Section */}
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8">
            <h2 className="font-heading text-2xl font-bold text-gray-900">
              Product Information
            </h2>

            <p className="mt-2 font-body text-text-muted">
              Enter the current product conditions.
            </p>

            <div className="mt-7 space-y-5">

              {/* Product */}
              <div>
                <label className="mb-2 block font-body font-semibold text-gray-900">
                  Product Name
                </label>

                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="Example: Tomatoes"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                />
              </div>

              {/* Demand */}
              <div>
                <label className="mb-2 block font-body font-semibold text-gray-900">
                  Demand
                </label>

                <select
                  value={demand}
                  onChange={(e) => setDemand(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-brand"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="declining">Declining</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-2 block font-body font-semibold text-gray-900">
                  Available Quantity (kg)
                </label>

                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                />
              </div>

              {/* Expiry */}
              <div>
                <label className="mb-2 block font-body font-semibold text-gray-900">
                  Days Until Expiry
                </label>

                <input
                  type="number"
                  min="0"
                  value={daysToExpiry}
                  onChange={(e) => setDaysToExpiry(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                />
              </div>

              {/* Current Price */}
              <div>
                <label className="mb-2 block font-body font-semibold text-gray-900">
                  Current Price (₹/kg)
                </label>

                <input
                  type="number"
                  min="0"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                />
              </div>

              {/* Market Price */}
              <div>
                <label className="mb-2 block font-body font-semibold text-gray-900">
                  Market Price (₹/kg)
                </label>

                <input
                  type="number"
                  min="0"
                  value={marketPrice}
                  onChange={(e) => setMarketPrice(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand"
                />
              </div>

              {/* Market Condition */}
              <div>
                <label className="mb-2 block font-body font-semibold text-gray-900">
                  Market Condition
                </label>

                <select
                  value={marketCondition}
                  onChange={(e) => setMarketCondition(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-brand"
                >
                  <option value="rising">📈 Rising</option>
                  <option value="stable">➡️ Stable</option>
                  <option value="falling">📉 Falling</option>
                </select>
              </div>

              {/* Buyers */}
              <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                <div>
                  <p className="font-body font-semibold text-gray-900">
                    Buyers Available
                  </p>

                  <p className="mt-1 text-sm text-text-muted">
                    Are there currently interested buyers?
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setBuyersAvailable(!buyersAvailable)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    buyersAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {buyersAvailable ? "Yes" : "No"}
                </button>
              </div>

              {/* Safety */}
              <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                <div>
                  <p className="font-body font-semibold text-gray-900">
                    Food is Safe
                  </p>

                  <p className="mt-1 text-sm text-text-muted">
                    Is the product safe to distribute?
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSafe(!isSafe)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    isSafe
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isSafe ? "Safe" : "Unsafe"}
                </button>
              </div>

              {/* Generate */}
              <button
                onClick={generateRecommendation}
                className="w-full rounded-xl bg-accent px-6 py-3.5 font-body font-semibold text-white transition hover:opacity-90"
              >
                🔄 Refresh Recommendation
              </button>
            </div>
          </div>

          {/* Recommendation Section */}
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-8">
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent">
              AI Recommendation
            </p>

            <h2 className="mt-2 font-heading text-2xl font-bold text-gray-900">
              {product || "Product"}
            </h2>

            {/* Status */}
            <div
              className={`mt-6 rounded-2xl border p-6 text-center ${getStatusStyle()}`}
            >
              <div className="text-5xl">
                {recommendation.emoji}
              </div>

              <h3 className="mt-3 font-heading text-2xl font-bold">
                {recommendation.status}
              </h3>
            </div>

            {/* Prices */}
            <div className="mt-6 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm font-medium text-text-muted">
                  Current Price
                </p>

                <p className="mt-2 font-heading text-2xl font-bold text-gray-900">
                  ₹{Number(currentPrice).toLocaleString("en-IN")}/kg
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-sm font-medium text-text-muted">
                  Recommended Price
                </p>

                <p className="mt-2 font-heading text-2xl font-bold text-brand">
                  ₹
                  {Number(
                    recommendation.recommendedPrice
                  ).toLocaleString("en-IN")}
                  /kg
                </p>
              </div>
            </div>

            {/* Discount */}
            <div className="mt-4 rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between">
                <span className="font-body font-semibold text-gray-900">
                  Recommended Discount
                </span>

                <span className="font-heading text-2xl font-bold text-accent">
                  {recommendation.discountPercent}%
                </span>
              </div>
            </div>

            {/* Market Information */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-text-muted">
                  Market Condition
                </p>

                <p className="mt-1 font-semibold capitalize text-gray-900">
                  {marketCondition === "rising" && "📈 Rising"}
                  {marketCondition === "stable" && "➡️ Stable"}
                  {marketCondition === "falling" && "📉 Falling"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-text-muted">
                  Available Quantity
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {quantity} kg
                </p>
              </div>
            </div>

            {/* Reason */}
            <div className="mt-4 rounded-xl bg-gray-50 p-5">
              <p className="font-body font-semibold text-gray-900">
                Why this recommendation?
              </p>

              <p className="mt-2 text-sm leading-6 text-text-muted">
                {recommendation.reason}
              </p>
            </div>

            {/* Calculation */}
            <div className="mt-4 rounded-xl border border-brand/20 bg-brand/5 p-5">
              <p className="font-body font-semibold text-gray-900">
                How was this price calculated?
              </p>

              <p className="mt-2 text-sm leading-6 text-text-muted">
                {recommendation.calculation}
              </p>
            </div>

            {/* Confidence */}
            <div className="mt-4 rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between">
                <span className="font-body font-semibold text-gray-900">
                  Confidence Score
                </span>

                <span className="font-heading text-xl font-bold text-brand">
                  {Math.round(recommendation.confidence * 100)}%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-brand transition-all"
                  style={{
                    width: `${recommendation.confidence * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Simple Explanation */}
            <div className="mt-6 rounded-xl border border-brand/20 bg-brand/5 p-5">
              <p className="text-sm leading-6 text-text-muted">
                <span className="font-semibold text-gray-900">
                  Simple explanation:{" "}
                </span>

                {recommendation.status === "SELL NOW" &&
                  "Your product is fresh and demand is strong, so selling now at a suitable market price is recommended."}

                {recommendation.status === "DISCOUNT" &&
                  "Demand or market conditions are weaker, so reducing the price can help attract buyers."}

                {recommendation.status === "URGENT SALE" &&
                  "The product is about to expire, so it should be sold quickly at a lower price."}

                {recommendation.status === "DONATE" &&
                  "There are no buyers right now, but the food is still safe, so donating it can prevent waste."}

                {recommendation.status === "DO NOT DISTRIBUTE" &&
                  "The food is expired or unsafe and should not be sold or distributed."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}