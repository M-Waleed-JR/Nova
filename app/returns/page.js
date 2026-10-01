import Link from "next/link";
import CategoryNav from "@/components/products/CategoryNav";

export default function ReturnsPage() {
  return (
    <>
      <CategoryNav />
      <main className="min-h-screen bg-[#070c1a] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase">
              NOVA Store Customer Service
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Returns & Refund Policy
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We want you to be completely satisfied with your purchase. Learn
              more about how returns, replacements, and refunds work at NOVA
              Store.
            </p>
          </div>

          {/* Policy Details Card */}
          <div className="space-y-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                1. Return Window & Eligibility
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                You can request a return or exchange within{" "}
                <span className="text-white font-semibold">14 days</span> of
                receiving your order. To be eligible for a return:
              </p>
              <ul className="list-disc list-inside text-slate-400 text-sm sm:text-base space-y-2 pl-2">
                <li>Item must be unused and in its original condition.</li>
                <li>
                  Must be in original packaging with all accessories and seals
                  intact.
                </li>
                <li>Proof of purchase or order number is required.</li>
              </ul>
            </section>

            <hr className="border-slate-800/80" />

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                2. Refund Process
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Once we receive and inspect your returned item, we will process
                your refund. Refunds will be credited back to your original
                payment method within{" "}
                <span className="text-white font-semibold">
                  3 to 7 business days
                </span>
                .
              </p>
            </section>

            <hr className="border-slate-800/80" />

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                3. Damaged or Incorrect Items
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                If you receive a defective or incorrect product, please reach
                out to our support team immediately. We will cover all shipping
                costs for returning defective items and issue a replacement or
                full refund right away.
              </p>
            </section>
          </div>

          {/* Bottom CTA Card */}
          <div className="text-center bg-gradient-to-br from-purple-900/20 via-slate-900/40 to-cyan-900/20 border border-slate-800/80 rounded-2xl p-8 sm:p-12 space-y-5 shadow-xl">
            <h3 className="text-2xl font-bold text-white">
              Have Questions or Need to Start a Return?
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Our customer support team is ready to assist you. Click below to
              go to our contact page and submit your request.
            </p>

            {/* Contact Button */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[13px] border border-cyan-400/65 text-white font-bold text-sm bg-[#0b1120] bg-gradient-to-br from-purple-500/20 to-cyan-400/10 shadow-[0_12px_30px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400 hover:shadow-[0_16px_35px_rgba(0,0,0,0.38),0_0_22px_rgba(34,211,238,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                <span>Contact Us</span>
                <span
                  className="text-cyan-400 text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
