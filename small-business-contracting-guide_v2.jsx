import { useState, useRef } from "react";
import CONTENT from "./content.json";

// ─── Color Palette ───
const COLORS = {
  navy: "#0A1628",
  navyLight: "#132038",
  navyMid: "#1A2D50",
  accent: "#3B82F6",
  accentGlow: "#60A5FA",
  gold: "#F59E0B",
  goldLight: "#FCD34D",
  slate: "#94A3B8",
  slateLight: "#CBD5E1",
  white: "#F8FAFC",
  cardBg: "rgba(19, 32, 56, 0.7)",
  cardBorder: "rgba(59, 130, 246, 0.15)",
  green: "#10B981",
  red: "#EF4444",
  yellow: "#F59E0B",
  blue: "#3B82F6",
};

const STATUS_COLORS = { red: COLORS.red, green: COLORS.green, yellow: COLORS.yellow, blue: COLORS.blue };

// ─── Markdown-lite renderer: handles **bold** and *italic* ───
function Md({ text }) {
  if (!text) return null;
  const parts = [];
  let remaining = text;
  let key = 0;
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    if (match[2]) parts.push(<strong key={key++} style={{ color: COLORS.gold }}>{match[2]}</strong>);
    else if (match[3]) parts.push(<em key={key++}>{match[3]}</em>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  return <>{parts}</>;
}

// ─── Reusable Components ───

function NavBar({ sections, active, onNav }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,22,40,0.92)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${COLORS.cardBorder}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => onNav("home")}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: COLORS.navy }}>SB</div>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: COLORS.white, letterSpacing: "-0.02em" }}>{CONTENT.meta.siteTitle}</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {sections.map((s) => (
            <button key={s.id} onClick={() => onNav(s.id)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: active === s.id ? 600 : 400, fontFamily: "'Source Sans 3', system-ui, sans-serif", color: active === s.id ? COLORS.white : COLORS.slate, background: active === s.id ? COLORS.navyMid : "transparent", transition: "all 0.2s" }}>{s.label}</button>
          ))}
        </div>
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", color: COLORS.white, fontSize: 24, cursor: "pointer" }}>{mobileOpen ? "✕" : "☰"}</button>
      </div>
      {mobileOpen && (
        <div style={{ background: COLORS.navyLight, borderTop: `1px solid ${COLORS.cardBorder}`, padding: "12px 24px" }}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => { onNav(s.id); setMobileOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", border: "none", background: "none", color: active === s.id ? COLORS.accentGlow : COLORS.slateLight, fontWeight: active === s.id ? 600 : 400, fontSize: 15, fontFamily: "'Source Sans 3', system-ui, sans-serif", cursor: "pointer", borderBottom: `1px solid ${COLORS.cardBorder}` }}>{s.label}</button>
          ))}
        </div>
      )}
      <style>{`@media(max-width:860px){.desktop-nav{display:none!important}.mobile-menu-btn{display:block!important}}`}</style>
    </nav>
  );
}

function Card({ children, style = {}, highlight = false }) {
  return <div style={{ background: highlight ? `linear-gradient(135deg, ${COLORS.navyMid}, rgba(59,130,246,0.12))` : COLORS.cardBg, border: `1px solid ${highlight ? "rgba(59,130,246,0.3)" : COLORS.cardBorder}`, borderRadius: 16, padding: "28px 32px", ...style }}>{children}</div>;
}

function Badge({ color = COLORS.accent, children }) {
  const c = STATUS_COLORS[color] || color;
  return <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: COLORS.white, background: `${c}33`, border: `1px solid ${c}55` }}>{children}</span>;
}

function SectionHeading({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: COLORS.white, margin: 0, lineHeight: 1.2 }}>{title}</h2>
      {subtitle && <p style={{ color: COLORS.slate, fontSize: 16, marginTop: 10, lineHeight: 1.6, maxWidth: 700 }}>{subtitle}</p>}
    </div>
  );
}

function StatBox({ number, label, sublabel }) {
  return (
    <div style={{ textAlign: "center", flex: "1 1 140px", minWidth: 140, padding: "12px 8px" }}>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, background: `linear-gradient(135deg, ${COLORS.accentGlow}, ${COLORS.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1 }}>{number}</div>
      <div style={{ color: COLORS.white, fontSize: 14, fontWeight: 600, marginTop: 6 }}>{label}</div>
      {sublabel && <div style={{ color: COLORS.slate, fontSize: 12, marginTop: 2 }}>{sublabel}</div>}
    </div>
  );
}

function Accordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: COLORS.cardBg, border: `1px solid ${openIdx === i ? "rgba(59,130,246,0.3)" : COLORS.cardBorder}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.2s" }}>
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", border: "none", background: "none", cursor: "pointer", textAlign: "left" }}>
            <span style={{ color: COLORS.white, fontSize: 15, fontWeight: 600, fontFamily: "'Source Sans 3', system-ui, sans-serif", flex: 1, paddingRight: 12 }}>{item.title}</span>
            <span style={{ color: COLORS.accent, fontSize: 18, transition: "transform 0.2s", transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0 }}>+</span>
          </button>
          {openIdx === i && (
            <div style={{ padding: "0 20px 18px 20px", color: COLORS.slateLight, fontSize: 14, lineHeight: 1.7, fontFamily: "'Source Sans 3', system-ui, sans-serif" }}>
              {item.paragraphs ? item.paragraphs.map((p, j) => <p key={j} style={{ marginTop: j > 0 ? 10 : 0 }}><Md text={p} /></p>) : item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Section Renderers (driven by CONTENT) ───

function HomeSection({ onNav }) {
  const d = CONTENT.home;
  return (
    <div>
      <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto", padding: "40px 0 20px" }}>
        <div style={{ marginBottom: 20 }}><Badge color={COLORS.accent}>{d.badgeText}</Badge></div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, color: COLORS.white, lineHeight: 1.15, margin: 0 }}>
          {d.headline.split("Contracting")[0]}
          <span style={{ background: `linear-gradient(135deg, ${COLORS.accentGlow}, ${COLORS.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Contracting</span>
        </h1>
        <p style={{ color: COLORS.slateLight, fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.65, marginTop: 20, maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>{d.subtitle}</p>
      </div>
      <Card style={{ maxWidth: 800, margin: "32px auto", textAlign: "center" }} highlight>
        <div style={{ color: COLORS.slateLight, fontSize: 14, marginBottom: 6 }}>Last updated: {CONTENT.meta.lastUpdated}</div>
        <div style={{ color: COLORS.white, fontSize: 15, lineHeight: 1.6 }}>{d.updateNote}</div>
      </Card>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, maxWidth: 800, margin: "32px auto", justifyContent: "center" }}>
        {d.stats.map((s) => <StatBox key={s.label} {...s} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, maxWidth: 800, margin: "32px auto 0" }}>
        {CONTENT.sections.filter((s) => s.id !== "home").map((s) => (
          <button key={s.id} onClick={() => onNav(s.id)} style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: "18px 20px", cursor: "pointer", textAlign: "left", transition: "border-color 0.2s, transform 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.cardBorder; e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ color: COLORS.white, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{s.label}</div>
            <div style={{ color: COLORS.slate, fontSize: 13 }}>→ Explore</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function FoundationsSection() {
  const d = CONTENT.foundations;
  return (
    <div>
      <SectionHeading title={d.heading} subtitle={d.subtitle} />
      <Card style={{ marginBottom: 20 }}>
        <h3 style={{ color: COLORS.accentGlow, fontSize: 18, margin: "0 0 14px 0", fontFamily: "'Playfair Display', Georgia, serif" }}>{d.intro.title}</h3>
        <p style={{ color: COLORS.slateLight, fontSize: 14, lineHeight: 1.7 }}>{d.intro.body}</p>
      </Card>
      <Accordion items={d.topics.map((t) => ({
        title: t.title,
        content: t.thresholds ? (
          <div>
            <p><Md text={t.paragraphs?.[0] || "FAC 2025-06 updated several critical dollar thresholds:"} /></p>
            <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
              {t.thresholds.map((th) => (
                <div key={th.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "rgba(59,130,246,0.06)", borderRadius: 8, gap: 12, flexWrap: "wrap" }}>
                  <span style={{ color: COLORS.slateLight, fontSize: 13 }}>{th.label}</span>
                  <span style={{ color: COLORS.goldLight, fontWeight: 700, fontSize: 13 }}>{th.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : undefined,
        paragraphs: t.thresholds ? undefined : t.paragraphs,
      }))} />
    </div>
  );
}

function ProgramsSection() {
  const d = CONTENT.programs;
  return (
    <div>
      <SectionHeading title={d.heading} subtitle={d.subtitle} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {d.items.map((p) => (
          <Card key={p.name}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
              <h3 style={{ color: COLORS.white, fontSize: 18, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>{p.name}</h3>
              <Badge color={p.statusColor}>{p.status}</Badge>
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
              <span style={{ color: COLORS.slate, fontSize: 12 }}><strong style={{ color: COLORS.slateLight }}>Statute:</strong> {p.statute}</span>
              <span style={{ color: COLORS.slate, fontSize: 12 }}><strong style={{ color: COLORS.slateLight }}>Regs:</strong> {p.regs}</span>
            </div>
            <p style={{ color: COLORS.slateLight, fontSize: 14, lineHeight: 1.7, margin: "0 0 12px 0" }}>{p.description}</p>
            <div style={{ background: "rgba(59,130,246,0.06)", borderRadius: 10, padding: "14px 16px", borderLeft: `3px solid ${STATUS_COLORS[p.statusColor] || COLORS.accent}` }}>
              <div style={{ color: COLORS.slate, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Current Concerns — {CONTENT.meta.lastUpdated}</div>
              <p style={{ color: COLORS.slateLight, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{p.current}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FAR19Section() {
  const d = CONTENT.far19;
  return (
    <div>
      <SectionHeading title={d.heading} subtitle={d.subtitle} />
      <Card style={{ marginBottom: 20 }} highlight>
        <h3 style={{ color: COLORS.gold, fontSize: 16, margin: "0 0 10px 0" }}>{d.alert.title}</h3>
        <p style={{ color: COLORS.slateLight, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{d.alert.body}</p>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
        {d.highlights.map((h) => (
          <Card key={h.title}>
            <h4 style={{ color: COLORS.accentGlow, fontSize: 15, margin: "0 0 10px 0" }}>{h.title}</h4>
            <p style={{ color: COLORS.slateLight, fontSize: 14, lineHeight: 1.7, margin: 0 }}><Md text={h.body} /></p>
          </Card>
        ))}
      </div>
      <Accordion items={d.details} />
    </div>
  );
}

function DOEEMSection() {
  const d = CONTENT.doeEm;
  return (
    <div>
      <SectionHeading title={d.heading} subtitle={d.subtitle} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 24 }}>
        {d.stats.map((s) => <Card key={s.label} style={{ textAlign: "center", padding: "20px 16px" }}><StatBox {...s} /></Card>)}
      </div>
      <Accordion items={d.topics} />
    </div>
  );
}

function LandscapeSection() {
  const d = CONTENT.landscape;
  return (
    <div>
      <SectionHeading title={d.heading} subtitle={d.subtitle} />
      <Card style={{ marginBottom: 24 }}>
        <h3 style={{ color: COLORS.accentGlow, fontSize: 16, margin: "0 0 18px 0", fontFamily: "'Playfair Display', Georgia, serif" }}>Key Events Timeline</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {d.timeline.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: i < d.timeline.length - 1 ? `1px solid ${COLORS.cardBorder}` : "none", alignItems: "flex-start" }}>
              <div style={{ minWidth: 100, color: COLORS.slate, fontSize: 12, fontWeight: 600, paddingTop: 2, fontFamily: "monospace" }}>{t.date}</div>
              <div style={{ flex: 1 }}>
                <Badge color={t.color}>{t.badge}</Badge>
                <div style={{ color: COLORS.slateLight, fontSize: 14, marginTop: 6, lineHeight: 1.5 }}>{t.event}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Accordion items={d.topics} />
    </div>
  );
}

function ResourcesSection() {
  const d = CONTENT.resources;
  return (
    <div>
      <SectionHeading title={d.heading} subtitle={d.subtitle} />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {d.categories.map((cat) => (
          <Card key={cat.name}>
            <h3 style={{ color: COLORS.accentGlow, fontSize: 16, margin: "0 0 14px 0", fontFamily: "'Playfair Display', Georgia, serif" }}>{cat.name}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cat.links.map((item) => (
                <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", padding: "12px 16px", background: "rgba(59,130,246,0.05)", borderRadius: 10, textDecoration: "none", transition: "background 0.2s", borderLeft: `3px solid ${COLORS.accent}` }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(59,130,246,0.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(59,130,246,0.05)")}>
                  <div style={{ color: COLORS.white, fontWeight: 600, fontSize: 14 }}>{item.name} ↗</div>
                  <div style={{ color: COLORS.slate, fontSize: 13, marginTop: 3 }}>{item.desc}</div>
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <Card style={{ marginTop: 24, textAlign: "center" }} highlight>
        <p style={{ color: COLORS.slateLight, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{CONTENT.meta.disclaimer}</p>
      </Card>
    </div>
  );
}

// ─── Main App ───

const SECTION_COMPONENTS = {
  home: HomeSection,
  foundations: FoundationsSection,
  programs: ProgramsSection,
  far19: FAR19Section,
  "doe-em": DOEEMSection,
  landscape: LandscapeSection,
  resources: ResourcesSection,
};

export default function App() {
  const [section, setSection] = useState("home");
  const mainRef = useRef(null);

  const handleNav = (id) => {
    setSection(id);
    if (mainRef.current) mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const SectionComponent = SECTION_COMPONENTS[section] || HomeSection;

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${COLORS.navy} 0%, #0D1F3C 50%, ${COLORS.navy} 100%)`, fontFamily: "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif", color: COLORS.slateLight }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <NavBar sections={CONTENT.sections} active={section} onNav={handleNav} />
      <main ref={mainRef} style={{ maxWidth: 900, margin: "0 auto", padding: "88px 24px 60px" }}>
        <SectionComponent onNav={handleNav} />
      </main>
      <footer style={{ textAlign: "center", padding: "32px 24px", borderTop: `1px solid ${COLORS.cardBorder}`, color: COLORS.slate, fontSize: 13 }}>
        <div>{CONTENT.meta.footerLine1}</div>
        <div style={{ marginTop: 4, fontSize: 12 }}>{CONTENT.meta.footerLine2}</div>
      </footer>
    </div>
  );
}
