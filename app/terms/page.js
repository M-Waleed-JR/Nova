import Link from "next/link";
import CategoryNav from "@/components/products/CategoryNav";

export default function TermsPage() {
  return (
    <>
      <CategoryNav />
      <main className="min-h-screen bg-[#070c1a] text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase">
              NOVA Store Legal
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Terms of Service
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Please read these Terms of Service carefully before using our
              platform or purchasing any products from NOVA Store.
            </p>
          </div>

          {/* Terms Content Card */}
          <div className="space-y-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                1. Acceptance of Terms
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                By accessing or using NOVA Store, you agree to comply with and
                be bound by these Terms of Service, along with our Privacy and
                Return policies. If you do not agree with any part of these
                terms, you should discontinue use of our site immediately.
              </p>
            </section>

            <hr className="border-slate-800/80" />

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                2. User Accounts & Responsibilities
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                When creating an account or placing an order, you agree to
                provide true, accurate, and complete information. You are
                responsible for maintaining the confidentiality of your account
                details and password.
              </p>
            </section>

            <hr className="border-slate-800/80" />

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                3. Products, Pricing & Orders
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We strive to display accurate descriptions and pricing for all
                items. However, we reserve the right to correct pricing errors,
                modify product availability, or cancel orders at any time prior
                to shipping.
              </p>
            </section>

            <hr className="border-slate-800/80" />

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                4. Intellectual Property
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                All content on NOVA Store, including graphics, UI design, logos,
                text, and code, is the property of NOVA Store and is protected
                by copyright and intellectual property laws.
              </p>
            </section>

            <hr className="border-slate-800/80" />

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                5. Limitation of Liability
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                NOVA Store shall not be liable for any indirect, special, or
                consequential damages resulting from your use of the website or
                any products purchased through our services.
              </p>
            </section>
          </div>

          {/* Bottom CTA Card */}
          <div className="text-center bg-gradient-to-br from-purple-900/20 via-slate-900/40 to-cyan-900/20 border border-slate-800/80 rounded-2xl p-8 sm:p-12 space-y-5 shadow-xl">
            <h3 className="text-2xl font-bold text-white">
              Have Questions About Our Terms?
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              If you have any questions or need clarification regarding our
              Terms of Service, feel free to contact our team.
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
