// ZeroScraps - Dynamic Pricing Recommendation Engine
// Person 2 + Person 3

export function getPricingRecommendation({
  demand,
  quantity,
  daysToExpiry,
  currentPrice,
  marketPrice,
  marketCondition,
  buyersAvailable,
  isSafe = true,
}) {
  const qty = Number(quantity) || 0;
  const expiry = Number(daysToExpiry);
  const current = Number(currentPrice) || 0;
  const market = Number(marketPrice) || current;

  // ❌ Unsafe or expired
  if (!isSafe || expiry <= 0) {
    return {
      status: "DO NOT DISTRIBUTE",
      emoji: "❌",
      recommendedPrice: 0,
      discountPercent: 100,
      reason:
        "The product is expired or unsafe. It should not be sold or distributed.",
      confidence: 0.99,
      calculation:
        "Safety is the highest priority, so the product cannot be distributed.",
    };
  }

  // 🔴 No buyers but food is still safe
  if (!buyersAvailable) {
    return {
      status: "DONATE",
      emoji: "🔴",
      recommendedPrice: 0,
      discountPercent: 100,
      reason:
        "There are currently no buyers, but the food is still safe. Donating it can prevent food waste.",
      confidence: 0.94,
      calculation:
        "The food is safe, but there are no available buyers, so donation is recommended.",
    };
  }

  /*
   * Start with a discount based on demand.
   */
  let discount = 0;

  if (demand === "declining") {
    discount = 15;
  } else if (demand === "low") {
    discount = 20;
  } else if (demand === "medium") {
    discount = 8;
  } else if (demand === "high") {
    discount = 0;
  }

  /*
   * Quantity adjustment
   *
   * Large surplus = more pressure to sell quickly.
   */
  if (qty >= 100) {
    discount += 10;
  } else if (qty >= 50) {
    discount += 5;
  } else if (qty <= 10) {
    discount -= 3;
  }

  /*
   * Market condition adjustment.
   */
  if (marketCondition === "rising") {
    discount -= 5;
  } else if (marketCondition === "falling") {
    discount += 8;
  }

  /*
   * Compare current price with market price.
   */
  if (market > 0 && current > market * 1.1) {
    discount += 5;
  } else if (market > 0 && current < market * 0.9) {
    discount -= 3;
  }

  /*
   * Near-expiry products need stronger discounts.
   */
  if (expiry <= 1) {
    discount = Math.max(discount, 30);
  } else if (expiry <= 2) {
    discount = Math.max(discount, 25);
  } else if (expiry <= 3) {
    discount = Math.max(discount, 15);
  }

  // Keep discount within a sensible range.
  discount = Math.max(0, Math.min(50, Math.round(discount)));

  /*
   * 🟠 Urgent Sale
   */
  if (expiry <= 1) {
    const recommendedPrice = Math.max(
      1,
      Math.round(current * (1 - discount / 100))
    );

    return {
      status: "URGENT SALE",
      emoji: "🟠",
      recommendedPrice,
      discountPercent: discount,
      reason:
        "The product is very close to expiry and buyers are available. Sell quickly at a reduced price.",
      confidence: 0.93,
      calculation:
        `The price was reduced by ${discount}% because the product expires within ${expiry} day.`,
    };
  }

  /*
   * 🟡 Discount
   */
  if (
    demand === "declining" ||
    demand === "low" ||
    discount > 0
  ) {
    const recommendedPrice = Math.max(
      1,
      Math.round(current * (1 - discount / 100))
    );

    return {
      status: "DISCOUNT",
      emoji: "🟡",
      recommendedPrice,
      discountPercent: discount,
      reason:
        "Demand or market conditions suggest that a lower price can help attract buyers and sell the surplus sooner.",
      confidence: 0.89,
      calculation:
        `The system considered demand, available quantity, market condition, expiry, and market price and applied a ${discount}% discount.`,
    };
  }

  /*
   * 🟢 Sell Now
   */
  let recommendedPrice = market;

  if (marketCondition === "rising") {
    recommendedPrice = Math.round(market * 1.05);
  } else if (marketCondition === "falling") {
    recommendedPrice = Math.round(market * 0.95);
  }

  return {
    status: "SELL NOW",
    emoji: "🟢",
    recommendedPrice,
    discountPercent: 0,
    reason:
      "Demand is strong and the product has sufficient freshness. Selling now at a suitable market price is recommended.",
    confidence: 0.95,
    calculation:
      "The product is fresh and demand is strong, so no discount is required. The market condition was used to adjust the recommended price.",
  };
}