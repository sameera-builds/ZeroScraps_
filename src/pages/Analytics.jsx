import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { useLanguage } from "../context/LanguageContext";

const analyticsTranslations = {
  English: {
    title: "Impact Dashboard",
    subtitle: "Track the food rescued and its community impact.",
    total: "Total Food Saved",
    active: "Active Listings",
    claimed: "Claimed Donations",
    meals: "Estimated Meals",
    ngoTitle: "Food Saved by NGO",
    categoryTitle: "Food Saved by Category",
    loading: "Loading analytics...",
    error: "Unable to load analytics data.",
    noData: "No data available yet.",
    kg: "kg",
    mealsWord: "meals",
  },

  हिन्दी: {
    title: "प्रभाव डैशबोर्ड",
    subtitle: "बचाए गए भोजन और उसके सामुदायिक प्रभाव को ट्रैक करें।",
    total: "कुल बचाया गया भोजन",
    active: "सक्रिय लिस्टिंग",
    claimed: "दावा किए गए दान",
    meals: "अनुमानित भोजन",
    ngoTitle: "NGO द्वारा बचाया गया भोजन",
    categoryTitle: "श्रेणी के अनुसार बचाया गया भोजन",
    loading: "विश्लेषण लोड हो रहा है...",
    error: "विश्लेषण डेटा लोड नहीं हो सका।",
    noData: "अभी कोई डेटा उपलब्ध नहीं है।",
    kg: "किग्रा",
    mealsWord: "भोजन",
  },

  বাংলা: {
    title: "প্রভাব ড্যাশবোর্ড",
    subtitle: "উদ্ধার করা খাবার এবং এর সামাজিক প্রভাব ট্র্যাক করুন।",
    total: "মোট সংরক্ষিত খাবার",
    active: "সক্রিয় তালিকা",
    claimed: "দাবি করা দান",
    meals: "আনুমানিক খাবার",
    ngoTitle: "NGO দ্বারা সংরক্ষিত খাবার",
    categoryTitle: "বিভাগ অনুযায়ী সংরক্ষিত খাবার",
    loading: "বিশ্লেষণ লোড হচ্ছে...",
    error: "বিশ্লেষণ ডেটা লোড করা যায়নি।",
    noData: "এখনও কোনো ডেটা নেই।",
    kg: "কেজি",
    mealsWord: "খাবার",
  },

  தமிழ்: {
    title: "தாக்க டாஷ்போர்டு",
    subtitle: "மீட்கப்பட்ட உணவு மற்றும் அதன் சமூக தாக்கத்தை கண்காணிக்கவும்.",
    total: "மொத்தமாக சேமிக்கப்பட்ட உணவு",
    active: "செயலில் உள்ள பட்டியல்கள்",
    claimed: "கோரப்பட்ட நன்கொடைகள்",
    meals: "மதிப்பிடப்பட்ட உணவுகள்",
    ngoTitle: "NGO மூலம் சேமிக்கப்பட்ட உணவு",
    categoryTitle: "வகை வாரியாக சேமிக்கப்பட்ட உணவு",
    loading: "பகுப்பாய்வு ஏற்றப்படுகிறது...",
    error: "பகுப்பாய்வு தரவை ஏற்ற முடியவில்லை.",
    noData: "இன்னும் தரவு இல்லை.",
    kg: "கிலோ",
    mealsWord: "உணவுகள்",
  },

  తెలుగు: {
    title: "ప్రభావ డాష్‌బోర్డ్",
    subtitle: "రక్షించబడిన ఆహారం మరియు దాని సామాజిక ప్రభావాన్ని ట్రాక్ చేయండి.",
    total: "మొత్తం సేవ్ చేసిన ఆహారం",
    active: "క్రియాశీల జాబితాలు",
    claimed: "క్లెయిమ్ చేసిన విరాళాలు",
    meals: "అంచనా భోజనాలు",
    ngoTitle: "NGO ద్వారా సేవ్ చేసిన ఆహారం",
    categoryTitle: "వర్గం ప్రకారం సేవ్ చేసిన ఆహారం",
    loading: "విశ్లేషణ లోడ్ అవుతోంది...",
    error: "విశ్లేషణ డేటాను లోడ్ చేయలేకపోయాము.",
    noData: "ఇంకా డేటా అందుబాటులో లేదు.",
    kg: "కిలోలు",
    mealsWord: "భోజనాలు",
  },

  मराठी: {
    title: "प्रभाव डॅशबोर्ड",
    subtitle: "वाचवलेले अन्न आणि त्याचा सामाजिक परिणाम ट्रॅक करा.",
    total: "एकूण वाचवलेले अन्न",
    active: "सक्रिय सूची",
    claimed: "दावा केलेले दान",
    meals: "अंदाजे जेवणे",
    ngoTitle: "NGO द्वारे वाचवलेले अन्न",
    categoryTitle: "श्रेणीनुसार वाचवलेले अन्न",
    loading: "विश्लेषण लोड होत आहे...",
    error: "विश्लेषण डेटा लोड करता आला नाही.",
    noData: "अजून कोणताही डेटा उपलब्ध नाही.",
    kg: "किलो",
    mealsWord: "जेवणे",
  },

  ગુજરાતી: {
    title: "અસર ડેશબોર્ડ",
    subtitle: "બચાવેલા ખોરાક અને તેની સામુદાયિક અસરને ટ્રૅક કરો.",
    total: "કુલ બચાવેલો ખોરાક",
    active: "સક્રિય સૂચિઓ",
    claimed: "દાવો કરેલા દાન",
    meals: "અંદાજિત ભોજન",
    ngoTitle: "NGO દ્વારા બચાવેલો ખોરાક",
    categoryTitle: "શ્રેણી અનુસાર બચાવેલો ખોરાક",
    loading: "વિશ્લેષણ લોડ થઈ રહ્યું છે...",
    error: "વિશ્લેષણ ડેટા લોડ થઈ શક્યો નથી.",
    noData: "હજુ સુધી કોઈ ડેટા ઉપલબ્ધ નથી.",
    kg: "કિગ્રા",
    mealsWord: "ભોજન",
  },
};

function getText(language) {
  return analyticsTranslations[language] || analyticsTranslations.English;
}

function getValue(row, keys, fallback = null) {
  for (const key of keys) {
    if (
      row &&
      row[key] !== undefined &&
      row[key] !== null &&
      row[key] !== ""
    ) {
      return row[key];
    }
  }

  return fallback;
}

function getQuantity(row) {
  const value = getValue(row, [
    "quantity",
    "qty",
    "weight",
    "quantity_kg",
    "weight_kg",
    "food_quantity",
    "amount",
  ], 0);

  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function getCategory(row) {
  return getValue(row, [
    "category",
    "food_category",
    "type",
  ], "Other");
}

function getListingStatus(row) {
  return String(
    getValue(row, ["status", "listing_status"], "")
  ).toLowerCase();
}

function getClaimStatus(row) {
  return String(
    getValue(row, ["status", "claim_status"], "")
  ).toLowerCase();
}

function getId(row) {
  return getValue(row, [
    "id",
    "listing_id",
    "surplus_listing_id",
  ]);
}

function getNgoId(row) {
  return getValue(row, [
    "ngo_id",
    "organization_id",
  ]);
}

function getNgoName(row) {
  return getValue(row, [
    "ngo_name",
    "name",
    "organization_name",
  ], "Unknown NGO");
}

export default function Analytics() {
  const { language } = useLanguage();

  const text = useMemo(() => getText(language), [language]);

  const [listings, setListings] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [claims, setClaims] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function fetchAnalytics() {
      setLoading(true);
      setError(null);

      try {
        const [
          listingsResponse,
          ngosResponse,
          claimsResponse,
        ] = await Promise.all([
          supabase
            .from("surplus_listings")
            .select("*"),

          supabase
            .from("ngos")
            .select("*"),

          supabase
            .from("claims")
            .select("*"),
        ]);

        if (listingsResponse.error) {
          throw listingsResponse.error;
        }

        if (ngosResponse.error) {
          throw ngosResponse.error;
        }

        if (claimsResponse.error) {
          throw claimsResponse.error;
        }

        if (!mounted) return;

        setListings(listingsResponse.data || []);
        setNgos(ngosResponse.data || []);
        setClaims(claimsResponse.data || []);
      } catch (err) {
        console.error("Analytics error:", err);

        if (!mounted) return;

        setError(err?.message || text.error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchAnalytics();

    return () => {
      mounted = false;
    };
  }, [text.error]);

  const analytics = useMemo(() => {
    /*
      --------------------------------------------------
      TOTAL FOOD SAVED
      --------------------------------------------------
    */

    let totalFoodSaved = 0;

    listings.forEach((listing) => {
      const status = getListingStatus(listing);

      const isClaimed =
        status === "claimed" ||
        status === "completed" ||
        status === "donated" ||
        status === "collected";

      if (isClaimed) {
        totalFoodSaved += getQuantity(listing);
      }
    });

    /*
      If status isn't being used in your database,
      calculate from claims as a fallback.
    */

    if (totalFoodSaved === 0 && claims.length > 0) {
      const claimedListingIds = new Set(
        claims
          .filter((claim) => {
            const status = getClaimStatus(claim);

            return (
              status === "" ||
              status === "claimed" ||
              status === "approved" ||
              status === "completed" ||
              status === "accepted"
            );
          })
          .map((claim) => getId(claim))
          .filter(Boolean)
      );

      listings.forEach((listing) => {
        if (claimedListingIds.has(getId(listing))) {
          totalFoodSaved += getQuantity(listing);
        }
      });
    }

    /*
      --------------------------------------------------
      ACTIVE LISTINGS
      --------------------------------------------------
    */

    const activeListings = listings.filter((listing) => {
      const status = getListingStatus(listing);

      if (!status) return true;

      return [
        "active",
        "available",
        "pending",
        "open",
      ].includes(status);
    }).length;

    /*
      --------------------------------------------------
      CLAIMED DONATIONS
      --------------------------------------------------
    */

    let claimedDonations = claims.filter((claim) => {
      const status = getClaimStatus(claim);

      if (!status) return true;

      return [
        "claimed",
        "approved",
        "completed",
        "accepted",
        "collected",
      ].includes(status);
    }).length;

    if (claimedDonations === 0) {
      claimedDonations = listings.filter((listing) => {
        const status = getListingStatus(listing);

        return [
          "claimed",
          "completed",
          "donated",
          "collected",
        ].includes(status);
      }).length;
    }

    /*
      --------------------------------------------------
      ESTIMATED MEALS
      --------------------------------------------------
      
      1 kg ≈ 10 meals
    */

    const estimatedMeals = Math.round(totalFoodSaved * 10);

    /*
      --------------------------------------------------
      NGO NAME MAP
      --------------------------------------------------
    */

    const ngoMap = {};

    ngos.forEach((ngo) => {
      const id = getId(ngo);

      if (id) {
        ngoMap[id] = getNgoName(ngo);
      }
    });

    /*
      --------------------------------------------------
      FOOD SAVED BY NGO
      --------------------------------------------------
    */

    const ngoTotals = {};

    listings.forEach((listing) => {
      const listingStatus = getListingStatus(listing);

      const isClaimed =
        listingStatus === "claimed" ||
        listingStatus === "completed" ||
        listingStatus === "donated" ||
        listingStatus === "collected";

      if (!isClaimed) return;

      const listingId = getId(listing);

      let relatedClaims = claims.filter((claim) => {
        const claimListingId = getValue(claim, [
          "listing_id",
          "surplus_listing_id",
          "food_listing_id",
        ]);

        return (
          listingId &&
          claimListingId &&
          String(claimListingId) === String(listingId)
        );
      });

      if (relatedClaims.length === 0) {
        relatedClaims = [null];
      }

      relatedClaims.forEach((claim) => {
        const ngoId =
          getNgoId(claim || {}) ||
          getNgoId(listing);

        const ngoName =
          getNgoName(claim || {}) !== "Unknown NGO"
            ? getNgoName(claim || {})
            : ngoMap[ngoId] ||
              getNgoName(listing);

        if (!ngoTotals[ngoName]) {
          ngoTotals[ngoName] = 0;
        }

        ngoTotals[ngoName] += getQuantity(listing);
      });
    });

    /*
      If the database does not have listing status,
      use claims directly.
    */

    if (
      Object.keys(ngoTotals).length === 0 &&
      claims.length > 0
    ) {
      claims.forEach((claim) => {
        const listingId = getValue(claim, [
          "listing_id",
          "surplus_listing_id",
        ]);

        const listing = listings.find(
          (item) =>
            String(getId(item)) === String(listingId)
        );

        const ngoId = getNgoId(claim);

        const ngoName =
          getNgoName(claim) !== "Unknown NGO"
            ? getNgoName(claim)
            : ngoMap[ngoId] || "Unknown NGO";

        if (!ngoTotals[ngoName]) {
          ngoTotals[ngoName] = 0;
        }

        if (listing) {
          ngoTotals[ngoName] += getQuantity(listing);
        }
      });
    }

    /*
      --------------------------------------------------
      FOOD SAVED BY CATEGORY
      --------------------------------------------------
    */

    const categoryTotals = {};

    listings.forEach((listing) => {
      const status = getListingStatus(listing);

      const isClaimed =
        status === "claimed" ||
        status === "completed" ||
        status === "donated" ||
        status === "collected";

      if (!isClaimed) return;

      const category = getCategory(listing);

      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }

      categoryTotals[category] += getQuantity(listing);
    });

    /*
      --------------------------------------------------
      SORT DATA
      --------------------------------------------------
    */

    const byNgo = Object.entries(ngoTotals)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);

    const byCategory = Object.entries(categoryTotals)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .filter((item) => item.value > 0)
      .sort((a, b) => b.value - a.value);

    return {
      totalFoodSaved,
      activeListings,
      claimedDonations,
      estimatedMeals,
      byNgo,
      byCategory,
    };
  }, [listings, ngos, claims]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-700" />

              <p className="text-lg text-gray-600">
                {text.loading}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf9f6] px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold text-red-700">
              {text.error}
            </h2>

            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <main className="mx-auto max-w-7xl px-8 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
            {text.title}
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            {text.subtitle}
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL FOOD */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <p className="mb-3 text-base text-gray-500">
              {text.total}
            </p>

            <p className="text-4xl font-bold text-gray-950">
              {Number(
                analytics.totalFoodSaved || 0
              ).toLocaleString()}{" "}
              {text.kg}
            </p>
          </div>

          {/* ACTIVE */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <p className="mb-3 text-base text-gray-500">
              {text.active}
            </p>

            <p className="text-4xl font-bold text-gray-950">
              {analytics.activeListings.toLocaleString()}
            </p>
          </div>

          {/* CLAIMED */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <p className="mb-3 text-base text-gray-500">
              {text.claimed}
            </p>

            <p className="text-4xl font-bold text-gray-950">
              {analytics.claimedDonations.toLocaleString()}
            </p>
          </div>

          {/* MEALS */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <p className="mb-3 text-base text-gray-500">
              {text.meals}
            </p>

            <p className="text-4xl font-bold text-gray-950">
              {analytics.estimatedMeals.toLocaleString()}
            </p>
          </div>
        </div>

        {/* NGO SECTION */}
        <section className="mb-10">
          <h2 className="mb-5 text-2xl font-bold text-gray-950 md:text-3xl">
            {text.ngoTitle}
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {analytics.byNgo.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {text.noData}
              </div>
            ) : (
              analytics.byNgo.map((ngo, index) => (
                <div
                  key={`${ngo.name}-${index}`}
                  className="flex items-center justify-between border-b border-gray-200 px-6 py-5 last:border-b-0"
                >
                  <span className="text-base text-gray-900">
                    {ngo.name}
                  </span>

                  <span className="text-base font-medium text-gray-900">
                    {Number(ngo.value).toLocaleString()} {text.kg}
                  </span>
                </div>
              ))
            )}

          </div>
        </section>

        {/* CATEGORY SECTION */}
        <section className="pb-12">
          <h2 className="mb-5 text-2xl font-bold text-gray-950 md:text-3xl">
            {text.categoryTitle}
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {analytics.byCategory.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {text.noData}
              </div>
            ) : (
              analytics.byCategory.map((category, index) => (
                <div
                  key={`${category.name}-${index}`}
                  className="flex items-center justify-between border-b border-gray-200 px-6 py-5 last:border-b-0"
                >
                  <span className="text-base text-gray-900">
                    {category.name}
                  </span>

                  <span className="text-base font-medium text-gray-900">
                    {Number(category.value).toLocaleString()}{" "}
                    {text.kg}
                  </span>
                </div>
              ))
            )}

          </div>
        </section>

      </main>
    </div>
  );
}