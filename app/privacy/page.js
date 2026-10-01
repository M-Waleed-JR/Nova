import CategoryNav from "@/components/products/CategoryNav";
import Link from "next/link";

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how NOVA Store collects,
              uses, and safeguards your personal information.
            </p>
          </div>

          {/* Policy Content Card */}
          <div className="space-y-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-10 backdrop-blur-md shadow-2xl">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                1. Information We Collect
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We collect information you provide directly to us when creating
                an account, placing an order, or contacting support:
              </p>
              <ul className="list-disc list-inside text-slate-400 text-sm sm:text-base space-y-2 pl-2">
                <li>
                  Contact details such as your name, email address, phone
                  number, and shipping address.
                </li>
                <li>
                  Payment details (processed securely through encrypted payment
                  gateways).
                </li>
                <li>Account credentials and shopping history on NOVA Store.</li>
              </ul>
            </section>

            <hr className="border-slate-800/80" />

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                2. How We Use Your Information
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We use the collected information exclusively to provide and
                improve our services, including:
              </p>
              <ul className="list-disc list-inside text-slate-400 text-sm sm:text-base space-y-2 pl-2">
                <li>
                  Processing and fulfilling your orders and handling returns or
                  refunds.
                </li>
                <li>
                  Sending order updates, shipping notifications, and customer
                  service responses.
                </li>
                <li>
                  Enhancing store security, preventing fraud, and optimizing
                  user experience.
                </li>
              </ul>
            </section>

            <hr className="border-slate-800/80" />

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                3. Data Protection & Sharing
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We do not sell or rent your personal data to third parties. We
                only share necessary information with trusted service providers
                (e.g., payment gateways and shipping partners) solely to
                complete your transactions under strict privacy standards.
              </p>
            </section>

            <hr className="border-slate-800/80" />

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                4. Cookies & Local Storage
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                NOVA Store uses essential cookies and browser local storage to
                remember your cart items, wishlists, and active session
                preferences. You can disable cookies in your browser settings at
                any time.
              </p>
            </section>

            <hr className="border-slate-800/80" />

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-cyan-400">
                5. Your Rights & Choices
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                You have full control over your personal data. You can access,
                update, or request the deletion of your account and personal
                details by contacting our support team.
              </p>
            </section>
          </div>

          {/* Bottom CTA Card */}
          <div className="text-center bg-gradient-to-br from-purple-900/20 via-slate-900/40 to-cyan-900/20 border border-slate-800/80 rounded-2xl p-8 sm:p-12 space-y-5 shadow-xl">
            <h3 className="text-2xl font-bold text-white">
              Questions About Your Privacy?
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              If you have any questions or concerns regarding how your data is
              handled, feel free to reach out to us.
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
