import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Stat({ title, value, text }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-600">
        {title}
      </p>

      <p className="mt-2 text-3xl font-bold text-gray-900">
        {value}
      </p>

      <p className="mt-1 text-sm text-gray-600">
        {text}
      </p>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
        {number}
      </div>

      <div>
        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          {text}
        </p>
      </div>
    </div>
  );
}

function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#faf9f6]">

      {/* HERO SECTION */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">

          {/* Badge */}
          <span className="inline-flex rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800">
            {t.badge}
          </span>

          {/* Heading */}
          <h1 className="mt-6 max-w-5xl text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            {t.heroTitle1}{" "}
            <span className="text-green-700">
              {t.heroTitle2}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">
            {t.heroDescription}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            {/* Retailer Button */}
            <button
              onClick={() => {
                window.location.href = "/retailer";
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800"
            >
              <span>{t.retailerPortal}</span>
              <ArrowRight size={18} />
            </button>

            {/* Map Button */}
            <button
              onClick={() => {
                window.location.href = "/map";
              }}
              className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50"
            >
              {t.exploreMap}
            </button>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <Stat
            title={t.activeListings}
            value="0"
            text={t.availableSurplus}
          />

          <Stat
            title={t.unitsRescued}
            value="0"
            text={t.foodSaved}
          />

          <Stat
            title={t.estimatedMeals}
            value="0"
            text={t.mealsSupported}
          />

          <Stat
            title={t.partnerNGOs}
            value="0"
            text={t.activePartners}
          />

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
            {t.howItWorks}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            {t.howLoopCloses}
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-2">

            <Step
              number="1"
              title={t.step1Title}
              text={t.step1Text}
            />

            <Step
              number="2"
              title={t.step2Title}
              text={t.step2Text}
            />

            <Step
              number="3"
              title={t.step3Title}
              text={t.step3Text}
            />

            <Step
              number="4"
              title={t.step4Title}
              text={t.step4Text}
            />

            <Step
              number="5"
              title={t.step5Title}
              text={t.step5Text}
            />

          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;