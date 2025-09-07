import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Instagram, Calendar, CheckCircle2, Menu, X, ArrowRight, Sparkles, Linkedin, Globe } from "lucide-react";
import emailjs from "@emailjs/browser";

/**
 * Adguy.sri — Freelance Ads & Landing Pages
 * Tech: HTML + CSS + JSX (React)
 *
 * ✅ What’s inside
 * - Responsive landing page
 * - Services section (LinkedIn Ads, Google Ads, Instagram Ads, Branding, Websites)
 * - Appointment booking modal + email notification via EmailJS (client-side)
 * - Contact & social links
 * - Smooth micro-animations (Framer Motion)
 *
 * ✉️ Email setup (EmailJS)
 * 1) Create a free account at https://www.emailjs.com/
 * 2) Add an Email Service (Gmail/SMTP).
 * 3) Create a Template with fields matching the form names below.
 * 4) Replace SERVICE_ID, TEMPLATE_ID, and PUBLIC_KEY constants.
 * 5) Test the form — you’ll receive an email with the details immediately.
 *
 * If you prefer not to use EmailJS, swap handleSubmit() to post to Formspree or your own API.
 */

// TODO: Replace these with your actual EmailJS credentials
// TODO: Replace these with your actual EmailJS credentials
const SERVICE_ID = "service_a820h8k";
const TEMPLATE_ID = "template_lxtr96o";
const PUBLIC_KEY = "p2O3cmcVEHoPlWBzM";

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || SERVICE_ID.includes("your_")) {
    setToast({ type: "error", msg: "Email not configured. Add your EmailJS keys in code." });
    return;
  }

  setSending(true);
  try {
    // 1️⃣ Send email to yourself
    await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });

    // 2️⃣ Send auto-reply to user
    await emailjs.send(SERVICE_ID, "auto_reply", {
      name: formRef.current.name.value,
      email: formRef.current.email.value,
      service: formRef.current.service.value,
      budget: formRef.current.budget.value,
      start_date: formRef.current.start_date.value,
      message: formRef.current.message.value
    }, PUBLIC_KEY);

    setToast({ type: "success", msg: "Appointment request sent! You’ll also receive a confirmation email." });
    formRef.current.reset();
    setBookingOpen(false);

  } catch (err) {
    setToast({ type: "error", msg: "Failed to send. Check EmailJS keys & network." });
    console.error(err);
  } finally {
    setSending(false);
    setTimeout(() => setToast(null), 4000);
  }
};



export default function AdguySriSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || SERVICE_ID.includes("your_")) {
      setToast({ type: "error", msg: "Email not configured. Add your EmailJS keys in code." });
      return;
    }
    setSending(true);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setToast({ type: "success", msg: "Appointment request sent! I’ll email you shortly." });
      (formRef.current)?.reset();
      setBookingOpen(false);
    } catch (err) {
      setToast({ type: "error", msg: "Failed to send. Check EmailJS keys & network." });
      console.error(err);
    } finally {
      setSending(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const services = [
    { title: "LinkedIn Ads", desc: "Precise B2B targeting, lead forms, and message ads that convert.", icon: <Linkedin size={20} /> },
    { title: "Google Ads", desc: "Full-funnel Search, PMax, YouTube & Display with data-led optimization.", icon: <Globe size={20} /> },
    { title: "Instagram Ads", desc: "Scroll-stopping creatives, reels, and story placements for ROAS.", icon: <Instagram size={20} /> },
    { title: "Branding", desc: "Identity, tone, and assets that make you memorable across channels.", icon: <Sparkles size={20} /> },
    { title: "Website Building", desc: "Fast, conversion-first landing pages that match your brand.", icon: <Globe size={20} /> },
  ];

  return (
    <div className="site">
      {/* NAVBAR */}
      <header className="nav">
        <div className="container nav-inner">
          <a href="#home" className="brand">
            <span className="dot" /> Adguy.sri
          </a>
          <nav className={`links ${menuOpen ? "open" : ""}`}>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <button className="btn btn-primary sm-hide" onClick={() => setBookingOpen(true)}>
              <Calendar className="mr-6" size={18} /> Book Appointment
            </button>
          </nav>
          <button className="menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="container hero-inner">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Ads that click. Landing pages that convert.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
            I help brands win attention and revenue with high-performing campaigns and conversion-first websites.
          </motion.p>
          <div className="cta">
            <button className="btn btn-primary" onClick={() => setBookingOpen(true)}>
              <Calendar className="mr-6" size={18} /> Book Appointment
            </button>
            <a href="#services" className="btn btn-ghost">
              Explore Services <ArrowRight className="ml-6" size={18} />
            </a>
          </div>
          <div className="stats">
            <div><strong>50+ </strong>Campaigns Launched</div>
            <div><strong>3–5x</strong> Typical ROAS</div>
            <div><strong>100ms</strong> Core Web Vitals-minded builds</div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="container">
          <h2>Services</h2>
          <p className="muted">Choose one, or pair ads with a high-converting landing page for the full effect.</p>
          <div className="grid">
            {services.map((s) => (
              <motion.div key={s.title} className="card" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <button className="chip" onClick={() => setBookingOpen(true)}>
                  <CheckCircle2 size={16} /> Get this
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="section alt">
        <div className="container">
          <h2>Recent Work</h2>
          <p className="muted">A quick peek — full case studies on request.</p>
          <div className="grid work">
            {[
              { t: "D2C Skincare", d: "3.4x ROAS in 60 days with creative testing + PMax." },
              { t: "B2B SaaS", d: "LinkedIn + Search combo drove 120 qualified demos." },
              { t: "EdTech", d: "Landing page rebuild lifted CVR by 41%." },
            ].map((w) => (
              <div className="card" key={w.t}>
                <div className="badge">Case Study</div>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container about">
          <div>
            <h2>Why brands work with me</h2>
            <ul className="ticks">
              <li><CheckCircle2 size={18} /> Performance-first strategy, not vanity metrics</li>
              <li><CheckCircle2 size={18} /> Fast builds that respect SEO & Core Web Vitals</li>
              <li><CheckCircle2 size={18} /> Clean reporting and clear next steps</li>
            </ul>
          </div>
          <div className="card note">
            <h3>Reach me</h3>
            <a className="row" href="mailto:adguysri@gmail.com"><Mail size={18} /> adguysri@gmail.com</a>
            <a className="row" href="https://instagram.com/Adguy.sri" target="_blank" rel="noreferrer"><Instagram size={18} /> @Adguy.sri</a>
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="cta-strip">
        <div className="container strip-inner">
          <h3>Ready to grow? Let’s plan your next win.</h3>
          <button className="btn btn-primary" onClick={() => setBookingOpen(true)}>
            <Calendar className="mr-6" size={18} /> Book Appointment
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container foot">
          <div className="brand"><span className="dot" /> Adguy.sri</div>
          <div className="links">
            <a href="mailto:adguysri@gmail.com"><Mail size={16} /> Mail</a>
            <a href="https://instagram.com/Adguy.sri" target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram</a>
          </div>
          <small>© {new Date().getFullYear()} Adguy.sri — Ads & Landing Pages</small>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {bookingOpen && (
          <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="dialog" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
              <button className="close" onClick={() => setBookingOpen(false)} aria-label="Close">✕</button>
              <h3>Book an Appointment</h3>
              <p className="muted">Fill this out and I’ll confirm by email.</p>
              <form ref={formRef} onSubmit={handleSubmit} className="form">
                <input type="hidden" name="subject" value="New Appointment — Adguy.sri" />

                <div className="row2">
                  <label>
                    <span>Name</span>
                    <input name="name" type="text" placeholder="Your full name" required />
                  </label>
                  <label>
                    <span>Email</span>
                    <input name="email" type="email" placeholder="you@example.com" required />
                  </label>
                </div>

                <div className="row2">
                  <label>
                    <span>Brand / Company</span>
                    <input name="company" type="text" placeholder="Company or project" />
                  </label>
                  <label>
                    <span>Service</span>
                    <select name="service" required>
                      <option value="">Select a service…</option>
                      <option>LinkedIn Ads</option>
                      <option>Google Ads</option>
                      <option>Instagram Ads</option>
                      <option>Branding</option>
                      <option>Website Building</option>
                    </select>
                  </label>
                </div>

                <div className="row2">
                  <label>
                    <span>Budget (₹)</span>
                    <input name="budget" type="text" placeholder="e.g., 50,000 – 2,00,000" />
                  </label>
                  <label>
                    <span>Target start date</span>
                    <input name="start_date" type="date" />
                  </label>
                </div>

                <label>
                  <span>Goals / Notes</span>
                  <textarea name="message" rows={4} placeholder="Tell me about your goals, timelines, audience, etc." />
                </label>

                <button className="btn btn-primary" type="submit" disabled={sending}>
                  {sending ? "Sending…" : "Send Request"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div className={`toast ${toast.type}`} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline CSS for easy drop-in (you can move this to App.css) */}
      <style>{`
        :root {
          --bg: #0b0d10;
          --card: #11141a;
          --muted: #9aa4b2;
          --text: #e6edf3;
          --brand: #6ee7ff;
          --brand-2: #9b8cff;
          --line: #1b2028;
        }
        * { box-sizing: border-box; }
        html, body, #root { height: 100%; background: var(--bg); color: var(--text); }
        body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"; }
        a { color: inherit; text-decoration: none; }
        .container { width: min(1200px, 92%); margin: 0 auto; }
        .muted { color: var(--muted); }
        .btn { display: inline-flex; align-items: center; gap: .5rem; padding: 0.9rem 1.1rem; border: 1px solid var(--line); background: transparent; color: var(--text); border-radius: 999px; cursor: pointer; font-weight: 600; }
        .btn-primary { background: linear-gradient(135deg, var(--brand), var(--brand-2)); color: #0b0d10; border: none; }
        .btn-ghost { background: transparent; }
        .btn:disabled { opacity: .7; cursor: not-allowed; }
        .chip { display: inline-flex; align-items: center; gap: .4rem; border-radius: 999px; padding: .45rem .7rem; border: 1px solid var(--line); background: #0f1319; color: var(--text); }
        .mr-6 { margin-right: .4rem; } .ml-6 { margin-left: .4rem; }

        .nav { position: sticky; top: 0; z-index: 20; backdrop-filter: blur(8px); background: rgba(11,13,16,.65); border-bottom: 1px solid var(--line); }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; padding: .9rem 0; }
        .brand { font-weight: 800; letter-spacing: .2px; display: inline-flex; align-items: center; gap: .5rem; }
        .brand .dot { width: .75rem; height: .75rem; border-radius: 50%; background: linear-gradient(135deg, var(--brand), var(--brand-2)); display: inline-block; }
        .links { display: flex; gap: 1rem; align-items: center; }
        .links a { padding: .4rem .6rem; border-radius: .6rem; }
        .links a:hover { background: #0f1319; }
        .menu { display: none; background: transparent; border: none; color: var(--text); }
        @media (max-width: 860px) {
          .sm-hide { display: none; }
          .menu { display: inline-flex; }
          .links { position: absolute; right: 4%; top: 60px; background: #0f1319; border: 1px solid var(--line); border-radius: 1rem; padding: .6rem; display: none; flex-direction: column; width: 240px; }
          .links.open { display: flex; }
        }

        .hero { padding: 6rem 0 4rem; background: radial-gradient(1200px 600px at 20% -10%, rgba(110,231,255,.15), transparent), radial-gradient(1000px 500px at 80% -10%, rgba(155,140,255,.14), transparent); }
        .hero h1 { font-size: clamp(1.8rem, 3.2vw + 1.2rem, 3.2rem); line-height: 1.1; margin: 0 0 1rem; }
        .hero p { font-size: 1.1rem; color: var(--muted); max-width: 800px; }
        .cta { display: flex; gap: .6rem; margin-top: 1.2rem; }
        .stats { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: .8rem; margin-top: 2rem; color: var(--muted); }
        .stats strong { color: var(--text); }
        @media (max-width: 720px) { .stats { grid-template-columns: 1fr; } }

        .section { padding: 4rem 0; }
        .section h2 { font-size: 1.8rem; margin: 0 0 .4rem; }
        .grid { margin-top: 1.2rem; display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 1rem; }
        .grid.work { grid-template-columns: repeat(3, minmax(0,1fr)); }
        @media (max-width: 980px) { .grid, .grid.work { grid-template-columns: repeat(2, minmax(0,1fr)); } }
        @media (max-width: 680px) { .grid, .grid.work { grid-template-columns: 1fr; } }
        .card { background: var(--card); border: 1px solid var(--line); border-radius: 1rem; padding: 1rem; }
        .card .icon { width: 36px; height: 36px; display: grid; place-items: center; border-radius: 10px; background: #0f1319; border: 1px solid var(--line); margin-bottom: .6rem; }
        .badge { display: inline-block; padding: .25rem .55rem; border: 1px solid var(--line); border-radius: .5rem; color: var(--muted); margin-bottom: .6rem; font-size: .82rem; }
        .alt { background: linear-gradient(180deg, rgba(17,20,26,.6), rgba(17,20,26, .2)); }

        .about { display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; align-items: start; }
        .note { position: sticky; top: 84px; }
        .ticks { list-style: none; padding: 0; margin: .6rem 0 0; display: grid; gap: .5rem; color: var(--muted); }
        .ticks li { display: flex; gap: .6rem; align-items: center; }
        @media (max-width: 860px) { .about { grid-template-columns: 1fr; } .note { position: static; } }

        .cta-strip { padding: 2.6rem 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: #0f1319; }
        .strip-inner { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        @media (max-width: 680px) { .strip-inner { flex-direction: column; align-items: flex-start; } }

        .footer { padding: 2rem 0; color: var(--muted); }
        .foot { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .foot .links { display: flex; gap: .8rem; }
        .foot .links a { display: inline-flex; gap: .4rem; align-items: center; color: var(--muted); }
        @media (max-width: 680px) { .foot { flex-direction: column; align-items: flex-start; } }

        .modal { position: fixed; inset: 0; display: grid; place-items: center; background: rgba(0,0,0,.5); z-index: 50; padding: 1rem; }
        .dialog { width: min(720px, 96%); background: var(--card); border: 1px solid var(--line); border-radius: 1rem; padding: 1rem; position: relative; }
        .close { position: absolute; top: .8rem; right: .8rem; background: transparent; border: none; color: var(--muted); font-size: 1.1rem; cursor: pointer; }
        .form { display: grid; gap: .8rem; margin-top: .6rem; }
        .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; }
        @media (max-width: 640px) { .row2 { grid-template-columns: 1fr; } }
        label { display: grid; gap: .35rem; font-size: .92rem; color: var(--muted); }
        input, select, textarea { width: 100%; padding: .8rem .9rem; border-radius: .7rem; background: #0f1319; border: 1px solid var(--line); color: var(--text); }
        input:focus, select:focus, textarea:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 4px rgba(110,231,255,.12); }

        .toast { position: fixed; bottom: 20px; right: 20px; background: #0f1319; border: 1px solid var(--line); padding: .8rem 1rem; border-radius: .8rem; }
        .toast.success { border-color: #2ecc71; }
        .toast.error { border-color: #e74c3c; }
      `}</style>
    </div>
  );
}
