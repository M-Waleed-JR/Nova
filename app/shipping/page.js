import CategoryNav from "@/components/products/CategoryNav";
import React from "react";

export default function ShippingPolicyPage() {
  return (
    <>
      <CategoryNav />
      <main className="min-h-[calc(100vh-120px)] bg-[#090D16] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Page Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Shipping Policy
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Learn more about our shipping rates, processing times, and
              delivery terms at NOVA Store.
            </p>
          </div>

          {/* Policy Cards Grid */}
          <div className="space-y-6">
            {/* Processing Time */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md">
              <h2 className="text-lg font-semibold text-cyan-400 mb-2">
                1. Order Processing Time
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                All orders are processed within{" "}
                <strong className="text-white">2–4 business days</strong>.
                Orders are not processed, shipped, or delivered on weekends or
                public holidays.
              </p>
            </div>

            {/* Rates & Free Shipping */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md">
              <h2 className="text-lg font-semibold text-cyan-400 mb-2">
                2. Shipping Rates & Free Shipping
              </h2>
              <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
                <li>
                  <strong className="text-white">Free Shipping:</strong>{" "}
                  Automatically applied to all orders over{" "}
                  <strong className="text-cyan-400">$1,000</strong>.
                </li>
                <li>
                  <strong className="text-white">Standard Shipping:</strong>{" "}
                  Calculated at checkout for orders below $1,000. Estimated
                  delivery takes <strong>2–5 business days</strong>.
                </li>
              </ul>
            </div>

            {/* Tracking Policy */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md">
              <h2 className="text-lg font-semibold text-cyan-400 mb-2">
                3. Order Tracking Information
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We currently{" "}
                <strong className="text-white">
                  do not provide direct package tracking numbers
                </strong>
                . Once your order has been dispatched, you will receive a
                dispatch confirmation via email/SMS. If you need updates
                regarding your shipment, please reach out directly to our
                support team.
              </p>
            </div>

            {/* Damaged Packages */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md">
              <h2 className="text-lg font-semibold text-cyan-400 mb-2">
                4. Damaged or Delayed Packages
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                NOVA Store is not liable for items damaged during shipping
                without prior notice. If you receive your order damaged, please
                contact us within{" "}
                <strong className="text-white">48 hours</strong> with your order
                ID and proof of damage to assist you immediately.
              </p>
            </div>

            {/* Support Callout */}
            <div className="bg-zinc-800/40 border border-cyan-500/20 rounded-2xl p-6 text-center space-y-3">
              <h3 className="text-base font-semibold text-white">
                Have questions about your order delivery?
              </h3>
              <p className="text-xs text-slate-400">
                Our support team is available to assist you with any delivery
                inquiries.
              </p>
              <a
                href="/contact"
                className="inline-block py-2.5 px-6 rounded-xl font-medium text-xs text-zinc-950 bg-cyan-400 hover:bg-cyan-300 transition shadow-md shadow-cyan-400/20"
              >
                Contact Customer Support
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
