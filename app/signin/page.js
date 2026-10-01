"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const socialIcons = [FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn];

const DURATION = "0.9s";
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

const transition = (...props) =>
  props
    .map(function (p) {
      return p + " " + DURATION + " " + EASE;
    })
    .join(", ");

/* ================= BUTTONS ================= */

const baseButton =
  "mt-3 w-full max-w-55 cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 px-6 py-3 text-xs font-bold uppercase tracking-[1.5px] text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/40 hover:brightness-110 active:translate-y-0";

const ghostButton =
  "mt-3 w-full max-w-55 cursor-pointer rounded-xl border border-white/60 bg-white/0 px-6 py-3 text-xs font-bold uppercase tracking-[1.5px] text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-blue-700";

/* ================= INPUT ================= */

function Field({ type = "text", placeholder, icon: Icon }) {
  return (
    <div className="group relative my-1.5 w-full">
      <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/35 transition-colors duration-300 group-focus-within:text-blue-300" />

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-blue-400/60 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/15"
      />
    </div>
  );
}

/* ================= FORM ================= */

const formClass =
  "flex h-full w-full flex-col items-center justify-center bg-transparent px-6 py-8 text-white sm:px-10";

/* ================= OVERLAY PANEL ================= */

const panelClass =
  "absolute top-0 flex h-full w-1/2 flex-col items-center justify-center px-8 text-center sm:px-[30px]";

/* ================= DIVIDER ================= */

function Divider({ children }) {
  return (
    <div className="my-4 flex w-full items-center gap-3 text-[10px] uppercase tracking-wider text-white/35 sm:text-[11px]">
      <span className="h-px flex-1 bg-white/10" />

      {children}

      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

/* ================= SOCIAL ICONS ================= */

function SocialIcons() {
  return (
    <div className="mb-1 mt-4 flex gap-2.5 sm:mt-5 sm:gap-3">
      {socialIcons.map((Icon, i) => (
        <a
          key={i}
          href="#"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white/70 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/60 hover:bg-blue-500/20 hover:text-white sm:h-10 sm:w-10 sm:text-sm"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}

/* ========================================================= */
/* ===================== DESKTOP AUTH ====================== */
/* ========================================================= */

function DesktopAuth({ active, setActive, handleSubmit }) {
  const formBase = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50%",
    height: "100%",
    willChange: "transform, opacity",
    transition: transition("transform", "opacity"),
  };

  return (
    <div className="relative hidden h-135 w-3xl max-w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/4 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:block">
      {/* ================= SIGN UP ================= */}

      <div
        inert={!active}
        style={{
          ...formBase,
          zIndex: active ? 5 : 1,
          opacity: active ? 1 : 0,
          transform: `translateX(${active ? "100%" : "0%"})`,
        }}
      >
        <form className={formClass} onSubmit={handleSubmit}>
          <h1 className="text-[2em] font-extrabold tracking-tight">
            Create Account
          </h1>

          <SocialIcons />

          <Divider>or register with email</Divider>

          <Field placeholder="Name" icon={FiUser} />

          <Field type="email" placeholder="Email" icon={FiMail} />

          <Field type="password" placeholder="Password" icon={FiLock} />

          <button type="submit" className={baseButton}>
            Sign Up
          </button>
        </form>
      </div>

      {/* ================= SIGN IN ================= */}

      <div
        inert={active}
        style={{
          ...formBase,
          zIndex: 2,
          opacity: active ? 0 : 1,
          transform: `translateX(${active ? "100%" : "0%"})`,
        }}
      >
        <form className={formClass} onSubmit={handleSubmit}>
          <h1 className="text-[2em] font-extrabold tracking-tight">
            Welcome Back
          </h1>

          <SocialIcons />

          <Divider>or sign in with email</Divider>

          <Field type="email" placeholder="Email" icon={FiMail} />

          <Field type="password" placeholder="Password" icon={FiLock} />

          <a
            href="#"
            className="mb-1 mt-4 text-[13px] text-blue-300/90 no-underline transition-colors duration-300 hover:text-white"
          >
            Forgot your password?
          </a>

          <button type="submit" className={baseButton}>
            Sign In
          </button>
        </form>
      </div>

      {/* ================= SLIDING OVERLAY ================= */}

      <div
        className="overflow-hidden"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "50%",
          height: "100%",
          zIndex: 1000,
          willChange: "transform",
          transform: `translateX(${active ? "-100%" : "0%"})`,
          borderRadius: active ? "0 150px 100px 0" : "150px 0 0 100px",
          transition: transition("transform", "border-radius"),
        }}
      >
        {/* ================= OVERLAY BACKGROUND ================= */}

        <div
          className="relative h-full bg-linear-to-br from-blue-700 via-indigo-600 to-teal-600 text-white"
          style={{
            left: "-100%",
            width: "200%",
            willChange: "transform",
            transform: `translateX(${active ? "50%" : "0%"})`,
            transition: transition("transform"),
          }}
        >
          {/* Decorative glows */}

          <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

          {/* ================= WELCOME BACK ================= */}

          <div
            className={panelClass}
            style={{
              transform: `translateX(${active ? "0%" : "-200%"})`,
              transition: transition("transform"),
            }}
          >
            <h1 className="text-[2em] font-extrabold tracking-tight">
              Welcome Back!
            </h1>

            <p className="my-5 text-sm leading-5 tracking-[0.3px] text-white/85">
              To keep connected with us, sign in with your personal info
            </p>

            <button
              type="button"
              className={ghostButton}
              onClick={() => setActive(false)}
            >
              Sign In
            </button>
          </div>

          {/* ================= HELLO FRIEND ================= */}

          <div
            className={`${panelClass} right-0`}
            style={{
              transform: `translateX(${active ? "200%" : "0%"})`,
              transition: transition("transform"),
            }}
          >
            <h1 className="text-[2em] font-extrabold tracking-tight">
              Hello, Friend!
            </h1>

            <p className="my-5 text-sm leading-5 tracking-[0.3px] text-white/85">
              Enter your details and start your journey with us
            </p>

            <button
              type="button"
              className={ghostButton}
              onClick={() => setActive(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* ====================== MOBILE AUTH ====================== */
/* ========================================================= */

function MobileAuth({ active, setActive, handleSubmit }) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-[24px] border border-white/10 bg-white/4 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:hidden">
      {/* ================= MOBILE SWITCHER ================= */}

      <div className="relative m-3 flex h-12 rounded-xl border border-white/10 bg-white/5 p-1">
        <div
          className="absolute left-1 top-1 h-10 w-[calc(50%-4px)] rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg shadow-blue-600/20 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${active ? "100%" : "0%"})`,
          }}
        />

        <button
          type="button"
          onClick={() => setActive(false)}
          className={`relative z-10 w-1/2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
            !active ? "text-white" : "text-white/45"
          }`}
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => setActive(true)}
          className={`relative z-10 w-1/2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
            active ? "text-white" : "text-white/45"
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* ================= MOBILE FORM ================= */}

      <div className="relative px-6 pb-7 pt-4">
        {/* ================= SIGN IN ================= */}

        <div
          className={`transition-all duration-500 ${
            active
              ? "pointer-events-none absolute inset-x-6 top-4 translate-x-8 opacity-0"
              : "relative translate-x-0 opacity-100"
          }`}
        >
          <form
            className="flex w-full flex-col items-center"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-[2em]">
              Welcome Back
            </h1>

            <SocialIcons />

            <Divider>or sign in with email</Divider>

            <Field type="email" placeholder="Email" icon={FiMail} />

            <Field type="password" placeholder="Password" icon={FiLock} />

            <a
              href="#"
              className="mb-1 mt-4 text-[12px] text-blue-300/90 no-underline transition-colors duration-300 hover:text-white"
            >
              Forgot your password?
            </a>

            <button type="submit" className={baseButton}>
              Sign In
            </button>
          </form>
        </div>

        {/* ================= SIGN UP ================= */}

        <div
          className={`transition-all duration-500 ${
            active
              ? "relative translate-x-0 opacity-100"
              : "pointer-events-none absolute inset-x-6 top-4 -translate-x-8 opacity-0"
          }`}
        >
          <form
            className="flex w-full flex-col items-center"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-[2em]">
              Create Account
            </h1>

            <SocialIcons />

            <Divider>or register with email</Divider>

            <Field placeholder="Name" icon={FiUser} />

            <Field type="email" placeholder="Email" icon={FiMail} />

            <Field type="password" placeholder="Password" icon={FiLock} />

            <button type="submit" className={baseButton}>
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* ================= MOBILE BOTTOM MESSAGE ================= */}

      <div className="border-t border-white/10 px-6 py-4 text-center">
        <p className="text-xs text-white/45">
          {active ? "Already have an account?" : "Don't have an account?"}
        </p>

        <button
          type="button"
          onClick={() => setActive(!active)}
          className="mt-1 text-xs font-semibold text-blue-300 transition-colors hover:text-white"
        >
          {active ? "Sign in instead" : "Create an account"}
        </button>
      </div>
    </div>
  );
}

/* ========================================================= */
/* ========================= MAIN ========================== */
/* ========================================================= */

export default function AuthForm() {
  const [active, setActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`${montserrat.className} relative flex min-h-screen items-center justify-center overflow-x-hidden bg-[#05060f] px-4 py-20 sm:px-6 md:py-10`}
    >
      {/* ================= LOGO ================= */}

      <div className="absolute left-4 top-5 z-50 sm:left-6 sm:top-6">
        <Link href="/" className="group flex items-center">
          <Image
            src="/logo/withOutBackground.png"
            alt="NOVA Logo"
            width={48}
            height={48}
            className="h-9 w-auto object-contain sm:h-10"
            priority
          />

          <span className="text-lg font-extrabold uppercase tracking-widest text-white drop-shadow-md sm:text-xl">
            NOVA
          </span>
        </Link>
      </div>

      {/* ================= AURORA BACKGROUND ================= */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-120 w-120 animate-[blob_14s_ease-in-out_infinite] rounded-full bg-blue-600/25 blur-[130px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-120 w-120 animate-[blob_18s_ease-in-out_infinite_reverse] rounded-full bg-cyan-500/15 blur-[130px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-600/15 blur-[110px]" />

      {/* ================= DESKTOP ================= */}

      <DesktopAuth
        active={active}
        setActive={setActive}
        handleSubmit={handleSubmit}
      />

      {/* ================= MOBILE ================= */}

      <MobileAuth
        active={active}
        setActive={setActive}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
