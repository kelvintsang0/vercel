
"use client";
import { useState } from "react";
import Image from "next/image";

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50 flex flex-col justify-between">
      <div>
        <div className="text-3xl font-black tracking-tight">{value}</div>
        <div className="mt-1 text-sm text-slate-600">{label}</div>
      </div>
      <div className="mt-3 text-xs text-slate-500">{sub}</div>
    </div>
  );
}

function ServiceCard({ title, points, icon }: { title: string; points: string[]; icon: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="text-3xl" aria-hidden>{icon}</div>
      <h3 className="mt-3 font-semibold text-lg">{title}</h3>
      <ul className="mt-3 space-y-2 text-slate-700 text-sm">
        {points.map((p) => (
          <li key={p}>• {p}</li>
        ))}
      </ul>
    </div>
  );
}

function DeepDive({ title, body, bullets }: { title: string; body: string; bullets: string[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-slate-700">{body}</p>
      <ul className="mt-4 space-y-2 text-slate-700 text-sm">
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
    </div>
  );
}

function Role({ company, title, period, items }: { company: string; title: string; period: string; items: string[] }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-indigo-900" />
      <h3 className="font-semibold">{company}</h3>
      <div className="text-sm text-slate-600">{title}</div>
      <div className="text-xs text-slate-500">{period}</div>
      <ul className="mt-3 space-y-2 text-slate-700 text-sm">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}

function Capability({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s}
            className="text-xs px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function ImpactCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-slate-700 text-sm">{desc}</p>
    </div>
  );
}

function ContactCard({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition block"
    >
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 font-medium text-slate-900 break-all">{value}</div>
    </a>
  );
}

function ImagePlaceholder({ title, hint }: { title: string; hint: string }) {
  return (
    <figure className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm">
      <div className="mx-auto h-40 w-full max-w-sm rounded-xl bg-slate-50 flex items-center justify-center">
        <span className="text-sm text-slate-500">[ Image: {title} ]</span>
      </div>
      <figcaption className="mt-3 text-xs text-slate-500">{hint}</figcaption>
    </figure>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");

    if (!name || !email || !message) {
      setStatus("Please complete all fields.");
      return;
    }

    const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "";

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });
        if (!res.ok) throw new Error("Request failed");
        setStatus("Thanks! Your message has been sent.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const subject = encodeURIComponent(`Website inquiry from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:kelvintsang@gmail.com?subject=${subject}&body=${body}`;
        setStatus("Opening your email client…");
      }
    } catch (err) {
      setStatus("Sorry, something went wrong. Please email me directly at kelvin.tsang@inoutflows.com.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-700">Name</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-sm text-slate-700">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="text-sm text-slate-700">Message</label>
        <textarea
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-indigo-200"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can I help?"
        />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="submit"
          className="bg-indigo-900 text-white px-5 py-2.5 rounded-xl shadow hover:-translate-y-0.5 transition"
        >
          Send message
        </button>
        <div className="text-sm text-slate-600">{status}</div>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        Tip: To enable direct in-page sending without opening your email client, set NEXT_PUBLIC_CONTACT_ENDPOINT to "/api/contact" after you configure the API route.
      </p>
    </form>
  );
}

export default function Page() {
  const sections = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "What I Do" },
    { id: "experience", label: "Experience" },
    { id: "capabilities", label: "Capabilities" },
    { id: "impact", label: "Impact" },
    { id: "community", label: "Speaking & Community" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#overview" className="font-semibold text-lg tracking-tight">
            Kelvin Tsang <span className="text-slate-400">· Data & AI Project Manager</span>
          </a>
          <nav className="hidden md:flex gap-6 text-sm">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="md:inline-block hidden bg-indigo-900 text-white px-3 py-1.5 rounded-xl text-sm hover:bg-indigo-800 transition"
          >
            Work with me
          </a>
        </div>
      </header>

      <section id="overview" className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              I build reliable <span className="bg-gradient-to-r from-indigo-900 to-blue-600 bg-clip-text text-transparent">data & AI operations</span> that scale.
            </h1>
            <p className="mt-5 text-slate-600 text-lg leading-relaxed">
              20 years across software development, analytics, and project delivery. I lead cross-functional teams to ship data platforms, govern data quality, and automate processes—so leaders get trusted insights and decisions are made faster.
            </p>
            <ul className="mt-6 space-y-2 text-slate-700">
              <li>• Manager, Data Quality & Stewardship — AIMCo (Canada)</li>
              <li>• VP, Chief Data Office — J.P. Morgan Asset Management (HK)</li>
              <li>• Analytics — Hong Kong Jockey Club (HK); Melco-Crown (Macau)</li>
            </ul>
            <div className="mt-7 flex gap-3 flex-wrap">
              {[
                { t: "CFA", c: "bg-emerald-600" },
                { t: "CDMP", c: "bg-indigo-600" },
                { t: "PMP", c: "bg-rose-600" },
                { t: "MBA", c: "bg-amber-600" },
                { t: "PSM I", c: "bg-sky-600" },
                { t: "AWS CCP / SAA", c: "bg-fuchsia-600" },
              ].map((b) => (
                <span
                  key={b.t}
                  className={`text-white text-xs px-2.5 py-1 rounded-full ${b.c}`}
                >
                  {b.t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <a
                href="#contact"
                className="bg-indigo-900 text-white px-5 py-2.5 rounded-xl shadow hover:-translate-y-0.5 transition"
              >
                Let’s talk
              </a>
              <a
                href="#services"
                className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-white transition"
              >
                See services
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="mb-4">
              <ImagePlaceholder title="Headshot / Portrait" hint="Upload a clear, friendly photo." />
            </div>
            <div className="aspect-[4/3] rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
              <div className="grid grid-cols-2 gap-4 h-full">
                <Stat label="Data Products launched" value="10+" sub="cross-functional squads" />
                <Stat label="Automations retired VBA" value="40+" sub="legacy tools modernized" />
                <Stat label="Quality issues managed" value="↓" sub="with governance & Atlan/Soda" />
                <Stat label="Stakeholders aligned" value="100+" sub="PMs in global workflows" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">From overview to detail — here’s how I help</h2>
        <p className="mt-2 text-slate-600">Start with a high-level plan, then go deep into execution. Engagements are modular—pick what you need.</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <ServiceCard title="Data Project Management" points={["Agile delivery, POM & OKRs","Roadmaps, backlogs, sprint ops","Vendor & stakeholder management"]} icon="📦"/>
          <ServiceCard title="Data Governance Team Building" points={["Stand up data stewardship","Catalog & quality tooling (Atlan, Soda)","SOPs, SOR criteria, controls"]} icon="🧭"/>
          <ServiceCard title="Process Automation" points={["Alteryx/Xceptor modernization","Retire VBA & manual workflows","Qlik/SQL/Python accelerators"]} icon="⚙️"/>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <DeepDive title="Investment Management & Analytics" body="A decade in asset-management operations with J.P. Morgan plus analytics roles at the Hong Kong Jockey Club and Melco-Crown. I understand data lineage from market data to fund accounting to client reporting—and the controls, SLAs, and risk mindsets that go with it." bullets={["Launched inaugural ETFs in Australia; automated 180 daily data points into Oracle.","Optimized Fact Sheets, saving 3.5 days/month across 50 SICAV funds.","Built regression & segmentation models; delivered 360° MIS dashboards."]}/>
          <DeepDive title="Data & AI Advisory" body="Bridge AI opportunities with practical data foundations. I use MIT-informed AI design frameworks to define behaviors, processes, and data strategies that actually ship." bullets={["Define metrics & scope, align strategy (best-product vs. full-solution).","Prioritize complementary assets: process, consent, compliance, infra.","Prototype assistants, quality monitors, and analytics copilots."]}/>
        </div>
      </section>

      <section id="experience" className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Experience</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-10">
            <Role
              company="Alberta Investment Management Corporation (AIMCo) — Canada"
              title="Manager, Data Quality & Stewardship; Data Product Delivery Lead"
              period="2024 — present"
              items={["Implemented data governance & stewardship program.","Onboarded Atlan (catalog) and Soda (data quality).","Lead Data Product squads across analysts, devs, QA, BI, and stewards."]}
            />
            <Role
              company="J.P. Morgan Asset Management — Hong Kong"
              title="VP, Chief Data Office (Promoted from Associate → VP)"
              period="2013 — 2023"
              items={["Project management & agile delivery as Scrum Master.","Product Owner for global funds database (POM).","Launched Australia ETFs; automated market-to-reporting data flows.","Transformed 40+ VBA tools to enterprise automations (Alteryx/Xceptor).","Streamlined proxy voting for 100+ PMs; integrated with firmwide workflow."]}
            />
            <Role
              company="Hong Kong Jockey Club — Hong Kong"
              title="Lead Customer Analyst"
              period="2011 — 2013"
              items={["Predictive models with regression & inferential stats (SAS).","Built 360° customer MIS; informed campaigns with lift up to 4×."]}
            />
            <Role
              company="Melco-Crown Entertainment — HK/Macau"
              title="Manager, Strategic Marketing"
              period="2008 — 2011"
              items={["Forecasting of events & segmentation; tracking creative KPIs."]}
            />
          </div>
        </div>
      </section>

      <section id="capabilities" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Capabilities</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Capability title="Data Management" skills={["Governance & Stewardship","Lineage & SOR","Metadata & Catalog (Atlan)","Data Quality (Soda)"]} />
          <Capability title="Tech & Tools" skills={["SQL, Python, Databricks","Alteryx, Xceptor","Qlik, Oracle, AWS","Azure DevOps", "JIRA/Confluence"]} />
          <Capability title="Delivery" skills={["Agile / Scrum","PMO & OKRs","Stakeholder mgmt.","Vendor mgmt."]} />
        </div>
      </section>

      <section id="impact" className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Impact & Highlights</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <ImpactCard title="Data Governance" desc="Designed controls, authored SOPs, and set SOR criteria; established metrics and working groups for alignment."/>
            <ImpactCard title="Automation" desc="Retired legacy PC & 40+ VBA tools by migrating to firmwide platforms—reducing risk and cycle time."/>
            <ImpactCard title="Reporting Ops" desc="Fact Sheet optimization eliminated duplicate data and saved 3.5 days each month across 50 funds."/>
            <ImpactCard title="ETF Launch" desc="Coordinated cross-functional team to launch inaugural ETFs; integrated 180 market data points into Oracle."/>
            <ImpactCard title="Analytics" desc="Built models and dashboards that improved campaign performance up to 4× and informed exec decisions."/>
            <ImpactCard title="Change Leadership" desc="Drove agile adoption; created one-pagers and newsletters for crisp decisions and transparency."/>
          </div>
        </div>
      </section>

      <section id="community" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Public Speaking, Leadership & Giving Back</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <h3 className="font-semibold text-lg">Speaking & Leadership</h3>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>• Co-Chair, Toastmasters District 96 Annual Conference 2025 (Burnaby Conference Center)</li>
              <li>• Area Director (2024/25), Vancouver Entrepreneurs Toastmasters</li>
              <li>• UBC Computer Science Mentorship — volunteer mentor</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <h3 className="font-semibold text-lg">Community & Passions</h3>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>• Regular blood donor and community volunteer</li>
              <li>• Music & teamwork: Member, JPMorgan HK Orchestra (2017–2023)</li>
              <li>• Multilingual: English, Chinese, Japanese</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <img
            src="/images/onstage.jpg"
            alt="Speaking on Stage"
            className="rounded-2xl shadow-md object-cover w-full h-64"
          />
          <img
            src="/images/teamwork.jpg"
            alt="Team Photo"
            className="rounded-2xl shadow-md object-cover w-full h-64"
          />
          <img
            src="/images/giveblood.jpg"
            alt="Blood Donation"
            className="rounded-2xl shadow-md object-cover w-full h-64"
          />
        </div>
      </section>

      <section id="contact" className="bg-gradient-to-b from-slate-100 to-white border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center">Let’s build your data & AI operations</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-center">
            Whether you need a fractional data leader to stand up governance, a delivery lead to ship data products, or help modernizing processes—I can help. Based in Vancouver, Canada.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <ContactCard label="Email" value="kelvintsang@gmail.com" href="mailto:kelvintsang@gmail.com" />
            <ContactCard label="LinkedIn" value="linkedin.com/in/kelvintsang" href="https://www.linkedin.com/in/kelvintsang" />
          </div>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Kelvin Tsang — All rights reserved.
      </footer>
    </div>
  );
}
