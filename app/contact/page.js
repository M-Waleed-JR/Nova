"use client";

import CategoryNav from "@/components/products/CategoryNav";
import React from "react";

function ContactPage() {
  return (
    <>
      <CategoryNav />
      <main className="min-h-[calc(100vh-120px)] bg-[#090D16] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Title */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Contact Us
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Have a question or need help with your order? Send us a message
              and our team will respond shortly.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 lg:p-8 backdrop-blur-md shadow-2xl">
            {/* Form Section */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Get in Touch
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Fill out the form below to reach out.
                </p>
              </div>

              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 bg-zinc-800/80 border border-zinc-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 bg-zinc-800/80 border border-zinc-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 bg-zinc-800/80 border border-zinc-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2.5 bg-zinc-800/80 border border-zinc-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full py-3 px-6 rounded-xl font-semibold text-zinc-950 bg-cyan-400 hover:bg-cyan-300 transition duration-200 active:scale-[0.99] shadow-lg shadow-cyan-400/20 cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Image Banner Section */}
            <div className="relative min-h-[320px] lg:min-h-[440px] w-full rounded-xl overflow-hidden border border-zinc-800">
              <img
                src="/contact.PNG"
                alt="Customer support team"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent flex flex-col justify-end p-6">
                <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                  Customer Support
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  We&apos;re here to help
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Our team is ready to assist you with sales, product inquiries,
                  and orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ContactPage;
