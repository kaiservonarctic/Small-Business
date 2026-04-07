import { useState, useRef } from "react";
import CONTENT from "./content.json";

// ─── USWDS-Inspired Color Palette ───
const COLORS = {
  // Primary
  primary: "#1a4480",
  primaryDark: "#162e51",
  primaryDarker: "#0b1a2e",
  primaryLight: "#2672de",
  primaryLighter: "#d9e8f6",
  primaryPale: "#eff6fb",
  // Accent
  accent: "#d83933",
  accentDark: "#b51d09",
  accentLight: "#f2938c",
  // Gold / Secondary
  gold: "#e5a000",
  goldLight: "#ffe396",
  goldDark: "#936f38",
  // Neutrals
  ink: "#1b1b1b",
  text: "#2d2d2d",
  textLight: "#565c65",
  border: "#c9c9c9",
  borderLight: "#dfe1e2",
  bg: "#f0f0f0",
  bgLight: "#f7f7f7",
  white: "#ffffff",
  // Status
  success: "#00a91c",
  successLight: "#ecf3ec",
  warning: "#e5a000",
  warningLight: "#faf3d1",
  error: "#d54309",
  errorLight: "#f4e3db",
  info: "#00bde3",
  infoLight: "#e7f6f8",
};

// Maps content.json color keywords to USWDS palette colors
const STATUS_COLORS = {
  red: COLORS.error,
  green: COLORS.success,
  yellow: COLORS.warning,
  blue: COLORS.primary,
  info: COLORS.info,
  primary: COLORS.primary,
};

const resolveColor = (c) => STATUS_COLORS[c] || c || COLORS.primary;

// ─── Markdown-lite renderer: handles **bold** and *italic* ───
function Md({ text }) {
  if (!text) return null;
  const parts = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    if (match[2]) {
      parts.push(
        <strong key={key++} style={{ color: COLORS.primaryDark, fontWeight: 700 }}>
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      parts.push(<em key={key++}>{match[3]}</em>);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return <>{parts}</>;
}

// Renders an array of paragraph strings with markdown-lite support
function Paragraphs({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <>
      {items.map((p, i) => (
        <p key={i} style={{ marginTop: i > 0 ? 12 : 0 }}>
          <Md text={p} />
        </p>
      ))}
    </>
  );
}

// ─── Site Chrome ───

function GovBanner() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ background: COLORS.bgLight, fontSize: 13 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src="https://flagcdn.com/20x15/us.png"
            alt="U.S. flag"
            style={{ width: 20, height: 15 }}
          />
          <span style={{ color: COLORS.textLight }}>
            An official website of the United States government
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "none",
              border: "none",
              color: COLORS.primaryLight,
              cursor: "pointer",
              fontSize: 13,
              textDecoration: "underline",
              padding: 0,
            }}
          >
            Here's how you know {expanded ? "▲" : "▼"}
          </button>
        </div>
        {expanded && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 32,
              padding: "16px 0 12px 28px",
              color: COLORS.textLight,
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            <div style={{ flex: "1 1 280px" }}>
              <strong style={{ color: COLORS.text }}>Official websites use .gov</strong>
              <br />
              A .gov website belongs to an official government organization in the United States.
            </div>
            <div style={{ flex: "1 1 280px" }}>
              <strong style={{ color: COLORS.text }}>Secure .gov websites use HTTPS</strong>
              <br />
              A lock or https:// means you've safely connected to the .gov website.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NavBar({ sections, active, onNav }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <GovBanner />
      <nav style={{ background: COLORS.primaryDark, borderBottom: `4px solid ${COLORS.accent}` }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
            onClick={() => onNav("home")}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 4,
                background: COLORS.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 14,
                color: COLORS.primaryDark,
                letterSpacing: "-0.02em",
              }}
            >
              SB
            </div>
            <span
              style={{
                fontFamily: "'Merriweather', Georgia, serif",
                fontSize: 17,
                fontWeight: 700,
                color: COLORS.white,
              }}
            >
              {CONTENT.meta.siteTitle}
            </span>
          </div>

          <div style={{ display: "flex", gap: 2, alignItems: "center" }} className="desktop-nav">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => onNav(s.id)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 4,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: active === s.id ? 700 : 400,
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  color: active === s.id ? COLORS.white : "rgba(255,255,255,0.75)",
                  background: active === s.id ? "rgba(255,255,255,0.12)" : "transparent",
                  transition: "all 0.15s",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: COLORS.white,
              fontSize: 24,
              cursor: "pointer",
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileOpen && (
          <div
            style={{
              background: COLORS.primaryDarker,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              padding: "8px 24px",
            }}
            className="mobile-dropdown"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onNav(s.id);
                  setMobileOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 0",
                  border: "none",
                  background: "none",
                  color: active === s.id ? COLORS.white : "rgba(255,255,255,0.7)",
                  fontWeight: active === s.id ? 700 : 400,
                  fontSize: 15,
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <style>{`
          @media (max-width: 860px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: block !important; }
          }
        `}</style>
      </nav>
    </div>
  );
}

// ─── Reusable UI ───

function Card({ children, style = {}, highlight = false }) {
  return (
    <div
      style={{
        background: COLORS.white,
        border: `1px solid ${highlight ? COLORS.primary : COLORS.borderLight}`,
        borderRadius: 8,
        padding: "24px 28px",
        boxShadow: highlight ? "0 2px 8px rgba(26,68,128,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
        ...(highlight ? { borderLeft: `4px solid ${COLORS.primary}` } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Badge({ color = COLORS.primary, children }) {
  const c = resolveColor(color);
  const bgMap = {
    [COLORS.success]: COLORS.successLight,
    [COLORS.error]: COLORS.errorLight,
    [COLORS.warning]: COLORS.warningLight,
    [COLORS.primary]: COLORS.primaryPale,
    [COLORS.info]: COLORS.infoLight,
  };
  const textMap = {
    [COLORS.success]: "#216e1f",
    [COLORS.error]: "#6f3331",
    [COLORS.warning]: "#5c4809",
    [COLORS.primary]: COLORS.primaryDark,
    [COLORS.info]: "#0e4f5c",
  };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        color: textMap[c] || COLORS.primaryDark,
        background: bgMap[c] || COLORS.primaryPale,
        border: `1px solid ${c}44`,
      }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 32, borderBottom: `2px solid ${COLORS.primary}`, paddingBottom: 20 }}>
      <h2
        style={{
          fontFamily: "'Merriweather', Georgia, serif",
          fontSize: "clamp(24px, 3.5vw, 34px)",
          fontWeight: 700,
          color: COLORS.primaryDark,
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            color: COLORS.textLight,
            fontSize: 16,
            marginTop: 10,
            lineHeight: 1.65,
            maxWidth: 720,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Accordion({ items }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: COLORS.white,
            border: `1px solid ${openIdx === i ? COLORS.primary : COLORS.borderLight}`,
            borderRadius: 6,
            overflow: "hidden",
            transition: "border-color 0.15s",
          }}
        >
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 20px",
              border: "none",
              background: openIdx === i ? COLORS.primaryPale : "transparent",
              cursor: "pointer",
              textAlign: "left",
              transition: "background 0.15s",
            }}
          >
            <span
              style={{
                color: COLORS.primaryDark,
                fontSize: 15,
                fontWeight: 700,
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                flex: 1,
                paddingRight: 12,
              }}
            >
              {item.title}
            </span>
            <span
              style={{
                color: COLORS.primary,
                fontSize: 20,
                fontWeight: 700,
                transition: "transform 0.2s",
                transform: openIdx === i ? "rotate(45deg)" : "rotate(0deg)",
                flexShrink: 0,
              }}
            >
              +
            </span>
          </button>
          {openIdx === i && (
            <div
              style={{
                padding: "4px 20px 20px 20px",
                color: COLORS.text,
                fontSize: 15,
                lineHeight: 1.7,
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
              }}
            >
              {item.render ? item.render() : <Paragraphs items={item.paragraphs} />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function StatBox({ number, label, sublabel }) {
  return (
    <div style={{ textAlign: "center", flex: "1 1 140px", minWidth: 140, padding: "12px 8px" }}>
      <div
        style={{
          fontFamily: "'Merriweather', Georgia, serif",
          fontSize: "clamp(28px, 3.5vw, 42px)",
          fontWeight: 700,
          color: COLORS.primary,
          lineHeight: 1.1,
        }}
      >
        {number}
      </div>
      <div style={{ color: COLORS.text, fontSize: 14, fontWeight: 700, marginTop: 6 }}>{label}</div>
      {sublabel && (
        <div style={{ color: COLORS.textLight, fontSize: 13, marginTop: 2 }}>{sublabel}</div>
      )}
    </div>
  );
}

// ─── Section Renderers (driven by content.json) ───

function HomeSection({ onNav }) {
  const d = CONTENT.home;
  return (
    <div>
      <div
        style={{
          background: COLORS.primaryDark,
          margin: "-32px -24px 32px -24px",
          padding: "48px 24px 40px",
          borderBottom: `4px solid ${COLORS.gold}`,
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
          <div style={{ marginBottom: 16 }}>
            <Badge color={COLORS.info}>{d.badgeText}</Badge>
          </div>
          <h1
            style={{
              fontFamily: "'Merriweather', Georgia, serif",
              fontSize: "clamp(28px, 4.5vw, 48px)",
              fontWeight: 700,
              color: COLORS.white,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {d.headline}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(16px, 2vw, 18px)",
              lineHeight: 1.65,
              marginTop: 16,
              maxWidth: 640,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {d.subtitle}
          </p>
        </div>
      </div>

      <Card style={{ maxWidth: 800, margin: "0 auto 32px" }} highlight>
        <div
          style={{
            color: COLORS.textLight,
            fontSize: 13,
            marginBottom: 4,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          Last updated: {CONTENT.meta.lastUpdated}
        </div>
        <div style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.6 }}>
          <Md text={d.updateNote} />
        </div>
      </Card>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          maxWidth: 800,
          margin: "0 auto 32px",
          justifyContent: "center",
          background: COLORS.primaryPale,
          borderRadius: 8,
          padding: "20px 16px",
        }}
      >
        {d.stats.map((s) => (
          <StatBox key={s.label} {...s} />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        {CONTENT.sections
          .filter((s) => s.id !== "home")
          .map((s) => (
            <button
              key={s.id}
              onClick={() => onNav(s.id)}
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.borderLight}`,
                borderRadius: 6,
                padding: "16px 20px",
                cursor: "pointer",
                textAlign: "left",
                transition: "border-color 0.15s, box-shadow 0.15s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.primary;
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(26,68,128,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.borderLight;
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
              }}
            >
              <div
                style={{
                  color: COLORS.primaryDark,
                  fontWeight: 700,
                  fontSize: 15,
                  marginBottom: 4,
                }}
              >
                {s.label}
              </div>
              <div style={{ color: COLORS.primary, fontSize: 14, fontWeight: 600 }}>Explore →</div>
            </button>
          ))}
      </div>
    </div>
  );
}

function FoundationsSection() {
  const d = CONTENT.foundations;
  const items = d.topics.map((t) => {
    if (t.thresholds) {
      return {
        title: t.title,
        render: () => (
          <div>
            <p style={{ marginTop: 0 }}>FAC 2025-06 updated several critical dollar thresholds:</p>
            <div style={{ marginTop: 12, display: "grid", gap: 6 }}>
              {t.thresholds.map((th) => (
                <div
                  key={th.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: COLORS.bgLight,
                    borderRadius: 4,
                    gap: 12,
                    flexWrap: "wrap",
                    border: `1px solid ${COLORS.borderLight}`,
                  }}
                >
                  <span style={{ color: COLORS.text, fontSize: 14 }}>{th.label}</span>
                  <span style={{ color: COLORS.primaryDark, fontWeight: 700, fontSize: 14 }}>
                    {th.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ),
      };
    }
    return { title: t.title, paragraphs: t.paragraphs };
  });

  return (
    <div>
      <SectionHeading title={d.heading} subtitle={d.subtitle} />
      <Card style={{ marginBottom: 20 }}>
        <h3
          style={{
            color: COLORS.primaryDark,
            fontSize: 18,
            margin: "0 0 12px 0",
            fontFamily: "'Merriweather', Georgia, serif",
          }}
        >
          {d.intro.title}
        </h3>
        <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7 }}>
          <Md text={d.intro.body} />
        </p>
      </Card>
      <Accordion items={items} />
    </div>
  );
}

function ProgramsSection() {
  const d = CONTENT.programs;
  return (
    <div>
      <SectionHeading title={d.heading} subtitle={d.subtitle} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {d.items.map((p) => {
          const statusColor = resolveColor(p.statusColor);
          return (
            <Card key={p.name}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <h3
                  style={{
                    color: COLORS.primaryDark,
                    fontSize: 18,
                    fontWeight: 700,
                    margin: 0,
                    fontFamily: "'Merriweather', Georgia, serif",
                  }}
                >
                  {p.name}
                </h3>
                <Badge color={statusColor}>{p.status}</Badge>
              </div>
              <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ color: COLORS.textLight, fontSize: 13 }}>
                  <strong style={{ color: COLORS.text }}>Statute:</strong> {p.statute}
                </span>
                <span style={{ color: COLORS.textLight, fontSize: 13 }}>
                  <strong style={{ color: COLORS.text }}>Regs:</strong> {p.regs}
                </span>
              </div>
              <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, margin: "0 0 14px 0" }}>
                <Md text={p.description} />
              </p>
              <div
                style={{
                  background: COLORS.bgLight,
                  borderRadius: 6,
                  padding: "14px 16px",
                  borderLeft: `4px solid ${statusColor}`,
                }}
              >
                <div
                  style={{
                    color: COLORS.textLight,
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: 6,
                  }}
                >
                  Current Status — {CONTENT.meta.lastUpdated}
                </div>
                <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                  <Md text={p.current} />
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function FAR19Section() {
  const d = CONTENT.far19;
  return (
    <div>
      <SectionHeading title={d.heading} subtitle={d.subtitle} />
      <Card
        style={{
          marginBottom: 20,
          background: COLORS.warningLight,
          borderLeft: `4px solid ${COLORS.warning}`,
        }}
      >
        <h3
          style={{
            color: COLORS.primaryDark,
            fontSize: 16,
            margin: "0 0 8px 0",
            fontFamily: "'Merriweather', Georgia, serif",
          }}
        >
          {d.alert.title}
        </h3>
        <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
          <Md text={d.alert.body} />
        </p>
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {d.highlights.map((h) => (
          <Card key={h.title}>
            <h4
              style={{
                color: COLORS.primary,
                fontSize: 15,
                margin: "0 0 10px 0",
                fontWeight: 700,
              }}
            >
              {h.title}
            </h4>
            <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              <Md text={h.body} />
            </p>
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {d.stats.map((s) => (
          <Card key={s.label} style={{ textAlign: "center", padding: "20px 16px" }}>
            <StatBox {...s} />
          </Card>
        ))}
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
        <h3
          style={{
            color: COLORS.primaryDark,
            fontSize: 17,
            margin: "0 0 18px 0",
            fontFamily: "'Merriweather', Georgia, serif",
          }}
        >
          Key Events Timeline
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {d.timeline.map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 16,
                padding: "14px 0",
                borderBottom:
                  i < d.timeline.length - 1 ? `1px solid ${COLORS.borderLight}` : "none",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  minWidth: 110,
                  color: COLORS.textLight,
                  fontSize: 13,
                  fontWeight: 700,
                  paddingTop: 2,
                  fontFamily: "'Source Code Pro', monospace",
                }}
              >
                {t.date}
              </div>
              <div style={{ flex: 1 }}>
                <Badge color={resolveColor(t.color)}>{t.badge}</Badge>
                <div style={{ color: COLORS.text, fontSize: 14, marginTop: 6, lineHeight: 1.5 }}>
                  {t.event}
                </div>
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
            <h3
              style={{
                color: COLORS.primaryDark,
                fontSize: 17,
                margin: "0 0 14px 0",
                fontFamily: "'Merriweather', Georgia, serif",
              }}
            >
              {cat.name}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {cat.links.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    background: COLORS.bgLight,
                    borderRadius: 6,
                    textDecoration: "none",
                    transition: "background 0.15s",
                    borderLeft: `4px solid ${COLORS.primary}`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.primaryPale)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.bgLight)}
                >
                  <div style={{ color: COLORS.primary, fontWeight: 700, fontSize: 14 }}>
                    {item.name} →
                  </div>
                  <div style={{ color: COLORS.textLight, fontSize: 13, marginTop: 3 }}>
                    {item.desc}
                  </div>
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card
        style={{
          marginTop: 24,
          background: COLORS.primaryPale,
          border: `1px solid ${COLORS.primaryLighter}`,
        }}
      >
        <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, margin: 0, textAlign: "center" }}>
          {CONTENT.meta.disclaimer}
        </p>
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
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const SectionComponent = SECTION_COMPONENTS[section] || HomeSection;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        fontFamily: "'Source Sans 3', 'Source Sans Pro', system-ui, sans-serif",
        color: COLORS.text,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Source+Sans+3:wght@300;400;500;600;700&family=Source+Code+Pro:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <NavBar sections={CONTENT.sections} active={section} onNav={handleNav} />
      <main
        ref={mainRef}
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "32px 24px 60px",
        }}
      >
        <SectionComponent onNav={handleNav} />
      </main>
      <footer
        style={{
          background: COLORS.primaryDarker,
          textAlign: "center",
          padding: "32px 24px",
          color: "rgba(255,255,255,0.6)",
          fontSize: 14,
        }}
      >
        <div style={{ color: COLORS.white, fontWeight: 700, marginBottom: 4 }}>
          {CONTENT.meta.footerLine1}
        </div>
        <div>{CONTENT.meta.footerLine2}</div>
      </footer>
    </div>
  );
}
