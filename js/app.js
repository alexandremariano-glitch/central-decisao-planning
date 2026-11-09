const { useState, useEffect, useRef } = React;

const D = window.CDCData;
const { CELLS, MODULES, GUIDES, AREA_PROFILES, IMPACT_WHO } = D;
const S = window.CDCSound;

const reducedMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const cellById = (id) => CELLS.find((c) => c.id === id);

function useTypewriter(text, speed = 16) {
  const [out, setOut] = useState(reducedMotion() ? text : "");
  useEffect(() => {
    if (reducedMotion()) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

/* ---------- Icons ---------- */

function Icon({ name, size = 18 }) {
  const p = { stroke: "currentColor", strokeWidth: 2, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    pain: <path {...p} d="M13 2 4 14h7l-1 8 9-12h-7z" />,
    target: (
      <>
        <circle {...p} cx="12" cy="12" r="9" />
        <circle {...p} cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      </>
    ),
    in: <path {...p} d="M3 12h11M10 8l4 4-4 4M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" />,
    gear: (
      <>
        <circle {...p} cx="12" cy="12" r="3.2" />
        <path {...p} d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
      </>
    ),
    value: <path {...p} d="M6 3h12l4 6-10 12L2 9zM2 9h20M9 3l3 18M15 3l-3 18" />,
    out: <path {...p} d="M10 12h11M17 8l4 4-4 4M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4" />,
    globe: (
      <>
        <circle {...p} cx="12" cy="12" r="9" />
        <path {...p} d="M3 12h18M12 3c3.2 3.2 3.2 14.8 0 18M12 3c-3.2 3.2-3.2 14.8 0 18" />
      </>
    ),
    link: <path {...p} d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
    brain: <path {...p} d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z" />,
    check: <path {...p} d="M5 12l5 5 9-10" />,
    shield: <path {...p} d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
    spark: <path {...p} d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
    trend: <path {...p} d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
    arrow: <path {...p} d="M5 12h14M13 6l6 6-6 6" />,
    back: <path {...p} d="M19 12H5M11 6l-6 6 6 6" />,
    power: <path {...p} d="M12 3v9M6.3 6.3a8 8 0 1 0 11.4 0" />,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

/* ---------- Shell ---------- */

function BayerLogo() {
  return (
    <div className="logo-corner" aria-hidden="true">
      <img src="assets/bayer-logo.png" alt="" />
    </div>
  );
}

function Hud({ progress, onToggleSound, onReset }) {
  return (
    <div className="hud">
      <div className="hud-actions">
        <button type="button" className="icon-btn" onClick={onToggleSound} aria-label={progress.soundEnabled ? "Desativar som" : "Ativar som"}>
          {progress.soundEnabled ? (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
              <path d="M16 8a5 5 0 0 1 0 8M18.5 5.5a8.5 8.5 0 0 1 0 13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
              <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
        <button type="button" className="icon-btn" onClick={onReset} aria-label="Reiniciar jornada">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function GuideToast({ who, text, onClose }) {
  const typed = useTypewriter(text, 14);
  useEffect(() => {
    const id = setTimeout(onClose, 10000);
    return () => clearTimeout(id);
  }, [text]);
  return (
    <div className="guide-toast" role="status">
      <img src={GUIDES[who].img} alt="" />
      <div>
        <p className="guide-toast-name">{GUIDES[who].name} · Guia da Central</p>
        <p>{typed}</p>
      </div>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Fechar mensagem">
        ×
      </button>
    </div>
  );
}

/* ---------- Intro ---------- */

function Intro({ onStart }) {
  const [stage, setStage] = useState(reducedMotion() ? 3 : 0);
  useEffect(() => {
    if (stage >= 3) return;
    const id = setTimeout(() => setStage((s) => s + 1), stage === 0 ? 900 : 1000);
    return () => clearTimeout(id);
  }, [stage]);
  const line =
    "Boas-vindas à Central de Planning. Aqui você vai entender como uma necessidade de mercado se transforma em produto disponível, e qual o papel de cada célula nessa jornada.";
  const typed = useTypewriter(stage >= 2 ? line : "", 16);
  const steps = [
    { t: "Escolha uma célula no mapa", s: "Seis células, uma única cadeia" },
    { t: "Explore os 9 módulos", s: "Na ordem que fizer sentido para você" },
    { t: "Responda o quiz", s: "E conquiste o selo da célula" },
  ];

  return (
    <section className={`intro stage-${stage}`}>
      <div className="intro-bg" aria-hidden="true">
        <div className="intro-grid" />
        {CELLS.map((c, i) => (
          <img key={c.id} className="intro-ghost" src={c.img} alt="" style={{ "--i": i }} />
        ))}
      </div>

      <div className="intro-main">
        <div className="intro-guide">
          <img src={GUIDES.lia.img} alt="Lia, Guia da Central" />
        </div>
        <div className="intro-copy">
          <p className="eyebrow">Lia · Guia da Central</p>
          <h1>Central de Decisão da Cadeia de Planning</h1>
          <p className="intro-line" aria-live="polite">
            {typed}
            <span className="caret" aria-hidden="true" />
          </p>
          <p className="intro-sub">Nenhuma célula opera sozinha. Ao final, você terá uma visão de ponta a ponta da cadeia de Planning.</p>
          <div className="cta-row">
            <button type="button" className="btn-primary btn-xl" onClick={onStart} autoFocus>
              Começar a jornada
            </button>
          </div>
        </div>
      </div>

      <ol className="intro-steps">
        {steps.map((st, i) => (
          <li key={st.t} style={{ "--i": i }}>
            <span className="intro-step-n">{i + 1}</span>
            <div>
              <strong>{st.t}</strong>
              <span>{st.s}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------- Map ---------- */

const POS = {
  demand: { x: 19, y: 56 },
  supply: { x: 33, y: 30 },
  drp: { x: 52, y: 22 },
  inventory: { x: 70, y: 32 },
  quotas: { x: 82, y: 62 },
  digital: { x: 50, y: 64 },
};
const MKT_POS = { x: 6, y: 46 };
const LINKS = [
  ["mkt", "demand"],
  ["demand", "supply"],
  ["supply", "drp"],
  ["drp", "inventory"],
  ["inventory", "quotas"],
];

function pt(id) {
  const p = id === "mkt" ? MKT_POS : POS[id];
  return { x: p.x * 1.6, y: p.y * 0.9 };
}

function fiberPath(a, b) {
  const p = pt(a);
  const q = pt(b);
  const mx = (p.x + q.x) / 2;
  const my = Math.min(p.y, q.y) - 6;
  return `M ${p.x} ${p.y} Q ${mx} ${my} ${q.x} ${q.y}`;
}

function MapView({ progress, onOpen, zoomTo, justDone, onComplete }) {
  const done = CELLS.filter((c) => progress.quiz[c.id]).map((c) => c.id);
  const allDone = done.length === CELLS.length;
  const zoomStyle = zoomTo ? { transformOrigin: `${POS[zoomTo].x}% ${POS[zoomTo].y}%`, transform: "scale(2.6)", opacity: 0 } : undefined;

  return (
    <section className="map-stage">
      <div className="map-heading">
        <p className="eyebrow">Mapa da cadeia de Planning</p>
        <h2>{allDone ? "Todas as jornadas concluídas" : "Escolha uma célula para começar"}</h2>
      </div>

      <div className={`world all-live`} style={zoomStyle}>
        <div className="world-floor" aria-hidden="true" />
        <svg className="world-fibers" viewBox="0 0 160 90" aria-hidden="true">
          <defs>
            <linearGradient id="fiberLive" x1="0" x2="1">
              <stop offset="0" stopColor="#00bcff" />
              <stop offset="1" stopColor="#5ee0a0" />
            </linearGradient>
          </defs>
          {LINKS.map(([a, b], i) => {
            const d = fiberPath(a, b);
            return (
              <g key={a + b}>
                <path d={d} className="fiber-base" />
                <path d={d} className={`fiber-live ${justDone === a || justDone === b ? "fresh" : ""}`} />
                <circle r="0.9" className="fiber-packet">
                  <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={d} />
                </circle>
              </g>
            );
          })}
          {CELLS.filter((c) => c.id !== "digital").map((c) => {
            const d = fiberPath("digital", c.id);
            return (
              <g key={"dg" + c.id}>
                <path d={d} className="fiber-digital live" />
                <circle r="0.7" className="fiber-packet violet">
                  <animateMotion dur="2.8s" repeatCount="indefinite" path={d} />
                </circle>
              </g>
            );
          })}
        </svg>

        <div className="ci-beacon" style={{ left: `${MKT_POS.x}%`, top: `${MKT_POS.y}%` }}>
          <span className="beacon-ring" />
          <span className="beacon-core">
            <Icon name="globe" size={24} />
          </span>
          <span className="beacon-label">Necessidade do mercado</span>
        </div>

        {CELLS.map((c) => {
          const isDone = done.includes(c.id);
          const seen = (progress.visited[c.id] || []).length;
          return (
            <button
              key={c.id}
              type="button"
              className={`tile ${isDone ? "done" : ""} ${!isDone ? "next" : ""} ${justDone === c.id ? "fresh" : ""}`}
              style={{ left: `${POS[c.id].x}%`, top: `${POS[c.id].y}%`, "--c": c.color }}
              onClick={() => onOpen(c.id)}
              aria-label={`${c.name}: ${c.short}. ${isDone ? "Selo conquistado." : `${seen} de ${MODULES.length} módulos explorados.`}`}
            >
              <span className="tile-halo" aria-hidden="true" />
              <img src={c.img} alt="" draggable="false" />
              <span className="tile-label">{c.name}</span>
              <span className="tile-short" aria-hidden="true">
                {c.short}
              </span>
              {isDone ? (
                <span className="tile-seal" aria-hidden="true">
                  <Icon name="check" size={16} />
                </span>
              ) : (
                <span className="tile-progress" aria-hidden="true">
                  {seen}/{MODULES.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="map-foot">
        <p className="map-legend">
          Cada célula é uma jornada com {MODULES.length} módulos. Explore na ordem que quiser e conclua o quiz para conquistar o selo.
        </p>
        {allDone && (
          <button type="button" className="btn-green btn-xl" onClick={onComplete}>
            Ver conclusão
          </button>
        )}
      </div>
    </section>
  );
}

/* ---------- Character ---------- */

function CharacterStage({ cell, celebrate }) {
  const ref = useRef(null);
  const speech = useTypewriter(cell.speech, 20);
  const [tip, setTip] = useState(null);

  const onMove = (e) => {
    if (reducedMotion() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    ref.current.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  return (
    <aside ref={ref} className={`stage live ${celebrate ? "celebrate" : ""}`} style={{ "--c": cell.color }} onMouseMove={onMove}>
      <div className="stage-glow" aria-hidden="true" />
      <div className="stage-particles" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ "--i": i }} />
        ))}
      </div>
      <img className="stage-char" src={cell.img} alt={`Especialista de ${cell.name}`} />
      <div className="stage-chips stage-chips-left" aria-label="O que recebo">
        <span className="chip-title">Recebo</span>
        {cell.inputs.slice(0, 4).map((o, i) => (
          <StageChip key={o.name} item={o} summary={o.why} index={i} onShow={setTip} onHide={() => setTip(null)} />
        ))}
      </div>
      <div className="stage-chips stage-chips-right show" aria-label="O que entrego">
        <span className="chip-title">Entrego</span>
        {cell.outputs.slice(0, 4).map((o, i) => (
          <StageChip key={o.name} item={o} summary={o.impact} index={i} deliver onShow={setTip} onHide={() => setTip(null)} />
        ))}
      </div>
      <div className="stage-caption">
        {tip && <p className="stage-summary">{tip}</p>}
        <div className="speech">
          <p className="speech-name">{cell.name}</p>
          <p>
            “{speech}
            {speech.length === cell.speech.length ? "”" : ""}
          </p>
        </div>
      </div>
      {celebrate && <div className="seal-stamp" aria-hidden="true">Selo {cell.name}</div>}
    </aside>
  );
}

/* ---------- Shared bits ---------- */

function StageChip({ item, summary, index, deliver, onShow, onHide }) {
  return (
    <button
      type="button"
      className={`chip ${deliver ? "deliver" : ""}`}
      style={{ "--i": index }}
      aria-label={`${item.name}. ${summary}`}
      onMouseEnter={() => onShow(summary)}
      onMouseLeave={onHide}
      onFocus={() => onShow(summary)}
      onBlur={onHide}
    >
      {item.name}
    </button>
  );
}

function UserChip({ id }) {
  const c = cellById(id);
  if (!c) return <span className="user-chip neutral">{id}</span>;
  return (
    <span className="user-chip" style={{ "--c": c.color }}>
      <img src={c.img} alt="" />
      {c.name}
    </span>
  );
}

function ModHead({ kicker, title, sub }) {
  return (
    <header className="mod-head">
      <p className="eyebrow">{kicker}</p>
      <h3>{title}</h3>
      {sub && <p className="mod-sub">{sub}</p>}
    </header>
  );
}

/* ---------- Module 1: pain ---------- */

function PainModule({ cell }) {
  const [off, setOff] = useState(false);
  return (
    <div className="mod">
      <ModHead kicker="A dor que esta célula resolve" title={cell.pain.headline} sub={cell.pain.intro} />
      <div className={`pain-sim ${off ? "off" : ""}`}>
        <div className="pain-core" style={{ "--c": cell.color }}>
          <img src={cell.img} alt="" />
          <span className="pain-state">{off ? "Offline" : "Online"}</span>
        </div>
        <div className="pain-copy">
          <p className="pain-q">E se {cell.name} desaparecesse amanhã?</p>
          <button
            type="button"
            className={off ? "btn-ghost" : "btn-danger"}
            onClick={() => {
              off ? S.unlock() : S.alert();
              setOff(!off);
            }}
            aria-pressed={off}
          >
            <Icon name="power" size={16} />
            {off ? "Religar a célula" : "Desligar a célula"}
          </button>
        </div>
      </div>
      {off && (
        <div className="impact-grid" aria-live="polite">
          {IMPACT_WHO.map((who, i) => (
            <div key={who} className="impact-card" style={{ "--i": i }}>
              <span>{who}</span>
              <p>{cell.pain.without[i]}</p>
            </div>
          ))}
        </div>
      )}
      {!off && <p className="hint">Desligue a célula para ver o efeito em clientes, vendas, fábricas e na Supply Chain.</p>}
    </div>
  );
}

/* ---------- Module 2: mission ---------- */

function MissionModule({ cell }) {
  const typed = useTypewriter(cell.mission.statement, 22);
  const cards = [
    { k: "Razão de existir", v: cell.mission.reason, icon: "spark" },
    { k: "Objetivo principal", v: cell.mission.goal, icon: "target" },
    { k: "Contribuição para a Bayer", v: cell.mission.contribution, icon: "trend" },
  ];
  return (
    <div className="mod">
      <ModHead kicker="Missão da célula" title="Por que existimos" />
      <blockquote className="mission-statement" style={{ "--c": cell.color }}>
        {typed}
        <span className="caret" aria-hidden="true" />
      </blockquote>
      <p className="mission-question">
        Pergunta central: <strong>{cell.question}</strong>
      </p>
      <div className="mission-cards">
        {cards.map((c, i) => (
          <div key={c.k} className="mission-card" style={{ "--i": i, "--c": cell.color }}>
            <span className="mission-icon">
              <Icon name={c.icon} size={20} />
            </span>
            <strong>{c.k}</strong>
            <p>{c.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Module 3 and 6: inputs / outputs ---------- */

function FlowModule({ cell, mode }) {
  const isIn = mode === "in";
  const items = isIn ? cell.inputs : cell.outputs;
  const [sel, setSel] = useState(null);
  const [seen, setSeen] = useState({});
  const item = sel != null ? items[sel] : null;
  const count = Object.keys(seen).length;

  const core = (
    <div className="flow-core" style={{ "--c": cell.color }}>
      <img src={cell.img} alt="" />
      <span>{cell.name}</span>
    </div>
  );

  return (
    <div className="mod">
      <ModHead
        kicker={isIn ? "Inputs" : "Outputs"}
        title={isIn ? "O que chega até nós" : "O que entregamos para a cadeia"}
        sub={isIn ? "Clique em cada input para ver de onde ele vem e por que precisamos dele." : "Clique em cada entrega para ver quem usa e como ela impacta a cadeia."}
      />
      <div className={`flow ${isIn ? "flow-in" : "flow-out"}`} style={{ "--c": cell.color, "--rows": items.length }}>
        {isIn ? null : core}
        <div className="flow-items">
          {items.map((it, i) => (
            <div key={it.name} className="flow-row">
              {!isIn && <span className="flow-wire" style={{ "--i": i }} aria-hidden="true" />}
              <button
                type="button"
                className={`flow-item ${sel === i ? "active" : ""} ${seen[i] ? "seen" : ""}`}
                onClick={() => {
                  S.click();
                  setSel(i);
                  setSeen((s) => ({ ...s, [i]: true }));
                }}
                aria-pressed={sel === i}
              >
                {it.name}
              </button>
              {isIn && <span className="flow-wire" style={{ "--i": i }} aria-hidden="true" />}
            </div>
          ))}
        </div>
        {isIn ? core : null}
      </div>
      <p className="hint">
        {count} de {items.length} explorados
      </p>
      {item && (
        <div className="flow-detail" key={item.name}>
          <strong>{item.name}</strong>
          {isIn ? (
            <div className="flow-detail-grid">
              <div>
                <span>Vem de</span>
                <p>{item.from}</p>
              </div>
              <div>
                <span>Por que precisamos</span>
                <p>{item.why}</p>
              </div>
            </div>
          ) : (
            <div className="flow-detail-grid">
              <div>
                <span>Quem usa</span>
                <div className="user-chips">
                  {item.users.map((u) => (
                    <UserChip key={u} id={u} />
                  ))}
                </div>
              </div>
              <div>
                <span>Impacto na cadeia</span>
                <p>{item.impact}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Module 4: doing + spotlights ---------- */

function SpotLayers() {
  const layers = ["Histórico", "Estratégia comercial", "Tendências", "Comportamento do mercado", "Informações das Units", "Inteligência dos Assets"];
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n === 0 || n >= layers.length) return;
    const id = setTimeout(() => setN((x) => x + 1), reducedMotion() ? 0 : 380);
    return () => clearTimeout(id);
  }, [n]);
  const full = n >= layers.length;
  return (
    <div className="spot">
      <p className="step-label">Como nasce o Best Estimate</p>
      <div className="layers">
        {layers.map((l, i) => (
          <div key={l} className={`layer ${i < n ? "on" : ""}`} style={{ "--i": i }}>
            <span className="layer-label">{l}</span>
          </div>
        ))}
        <div className={`layer-result ${full ? "on" : ""}`}>
          <span className="layer-label">Best Estimate</span>
        </div>
      </div>
      {!full ? (
        <button
          type="button"
          className="btn-primary"
          disabled={n > 0}
          onClick={() => {
            S.unlock();
            setN(1);
          }}
        >
          Montar o Best Estimate
        </button>
      ) : (
        <div className="feedback good">Não é apenas um forecast, nem apenas matemática. É a visão consensual da Bayer, e o principal direcionador da cadeia.</div>
      )}
    </div>
  );
}

function SpotBridge() {
  const factors = [
    { id: "mnt", label: "Manutenção em uma linha", delta: -15 },
    { id: "mp", label: "Matéria-prima atrasada", delta: -10 },
    { id: "gain", label: "Ganho produtivo", delta: 8 },
    { id: "rec", label: "Recuperação de uma parada", delta: 7 },
  ];
  const [on, setOn] = useState({});
  const deliver = Math.max(0, Math.min(110, 92 + factors.reduce((a, f) => a + (on[f.id] ? f.delta : 0), 0)));
  const gap = 100 - deliver;
  return (
    <div className="spot">
      <p className="step-label">Mercado e capacidade operacional</p>
      <div className="bridge">
        <div className="bridge-row">
          <span>O que o mercado pede</span>
          <div className="bridge-track">
            <div className="bridge-fill market" style={{ width: `${(100 / 110) * 100}%` }} />
          </div>
          <strong>100</strong>
        </div>
        <div className="bridge-row">
          <span>O que a operação entrega</span>
          <div className="bridge-track">
            <div className={`bridge-fill ops ${gap > 0 ? "short" : ""}`} style={{ width: `${(deliver / 110) * 100}%` }} />
          </div>
          <strong>{deliver}</strong>
        </div>
      </div>
      <p className="hint">Ative os eventos da fábrica e veja como a disponibilidade muda:</p>
      <div className="toggle-row">
        {factors.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`toggle ${on[f.id] ? "on" : ""} ${f.delta > 0 ? "plus" : "minus"}`}
            aria-pressed={!!on[f.id]}
            onClick={() => {
              S.click();
              setOn((o) => ({ ...o, [f.id]: !o[f.id] }));
            }}
          >
            {f.label}
            <small>{f.delta > 0 ? `+${f.delta}` : f.delta}</small>
          </button>
        ))}
      </div>
      <div className={`feedback ${gap > 0 ? "warn" : "good"}`}>
        {gap > 0
          ? `Gap de ${gap} unidades. Supply torna essa restrição visível cedo, para que a cadeia decida: priorizar, distribuir por cotas ou buscar alternativas.`
          : "A disponibilidade cobre a demanda. Ganhos e recuperações comunicados a tempo viram oportunidades de atendimento."}
      </div>
    </div>
  );
}

function SpotNetwork() {
  const regions = [
    { id: "co", name: "Centro-Oeste", need: 50 },
    { id: "se", name: "Sudeste", need: 30 },
    { id: "sul", name: "Sul", need: 20 },
  ];
  const modes = {
    concentrated: { label: "Estoque concentrado", stock: { co: 0, se: 100, sul: 0 } },
    positioned: { label: "Posicionado pela carteira", stock: { co: 50, se: 30, sul: 20 } },
  };
  const [mode, setMode] = useState("concentrated");
  const st = modes[mode].stock;
  const served = regions.reduce((a, r) => a + Math.min(r.need, st[r.id]), 0);
  return (
    <div className="spot">
      <p className="step-label">Estoque no Brasil não é cliente atendido</p>
      <div className="seg" role="group" aria-label="Cenário de posicionamento">
        {Object.entries(modes).map(([k, m]) => (
          <button
            key={k}
            type="button"
            className={mode === k ? "on" : ""}
            aria-pressed={mode === k}
            onClick={() => {
              S.whoosh();
              setMode(k);
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="regions">
        {regions.map((r) => {
          const s = st[r.id];
          const status = s >= r.need ? (s > r.need ? "excess" : "ok") : "short";
          return (
            <div key={r.id} className={`region ${status}`}>
              <strong>CD {r.name}</strong>
              <div className="region-bars">
                <div className="region-bar">
                  <span>Necessidade</span>
                  <i style={{ width: `${r.need}%` }} className="need" />
                </div>
                <div className="region-bar">
                  <span>Estoque</span>
                  <i style={{ width: `${s}%` }} className="stock" />
                </div>
              </div>
              <span className="region-status">{status === "ok" ? "Atendido" : status === "excess" ? "Sobra local" : "Falta local"}</span>
            </div>
          );
        })}
      </div>
      <div className={`feedback ${served === 100 ? "good" : "warn"}`}>
        Nos dois cenários existem 100 unidades no Brasil. {served === 100 ? "Posicionado onde a carteira mostra necessidade, todo o mercado é atendido." : `Concentrado em um só CD, apenas ${served} unidades atendem clientes. O resto é estoque no lugar errado.`}
      </div>
    </div>
  );
}

function SpotBalance() {
  const [v, setV] = useState(50);
  const zone = v < 30 ? "low" : v > 70 ? "high" : "mid";
  const info = {
    low: { t: "Pouco estoque", items: ["Ruptura", "Perda de vendas", "Cliente sem produto"] },
    mid: { t: "Equilíbrio", items: ["Disponibilidade", "Saúde financeira", "Capital protegido"] },
    high: { t: "Muito estoque", items: ["Excesso", "Vencimento", "Capital parado"] },
  }[zone];
  return (
    <div className="spot">
      <p className="step-label">O dilema da área</p>
      <div className={`balance ${zone}`}>
        <div className="balance-scale" aria-hidden="true">
          <span>Pouco</span>
          <span>Equilíbrio</span>
          <span>Muito</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          aria-label="Nível de estoque"
          aria-valuetext={info.t}
        />
        <div className="balance-out">
          <strong>{info.t}</strong>
          <div className="balance-items">
            {info.items.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="step-label">Projeção de inventário</p>
      <div className="equation">
        <span>Estoque atual</span>
        <b>+</b>
        <span>Disponibilidade futura</span>
        <b>−</b>
        <span>Consumo futuro</span>
        <b>=</b>
        <span className="eq-result">Riscos antecipados</span>
      </div>
    </div>
  );
}

function SpotRateio() {
  const regions = [
    { id: "co", name: "Centro-Oeste", demand: 50 },
    { id: "se", name: "Sudeste", demand: 30 },
    { id: "sul", name: "Sul", demand: 20 },
  ];
  const modes = {
    first: { label: "Ordem de chegada", alloc: { co: 50, se: 30, sul: 0 } },
    strategy: { label: "Com estratégia", alloc: { co: 40, se: 24, sul: 16 } },
  };
  const [mode, setMode] = useState("first");
  const a = modes[mode].alloc;
  return (
    <div className="spot">
      <p className="step-label">Demanda de 100, disponibilidade de 80</p>
      <div className="seg" role="group" aria-label="Regra de distribuição">
        {Object.entries(modes).map(([k, m]) => (
          <button
            key={k}
            type="button"
            className={mode === k ? "on" : ""}
            aria-pressed={mode === k}
            onClick={() => {
              S.click();
              setMode(k);
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div className="rateio">
        {regions.map((r) => (
          <div key={r.id} className="rateio-row">
            <span>{r.name}</span>
            <div className="rateio-track">
              <div className="rateio-dem" />
              <div className="rateio-cota" key={mode + r.id} style={{ width: `${(a[r.id] / r.demand) * 100}%` }} />
            </div>
            <strong>
              {a[r.id]} / {r.demand}
            </strong>
          </div>
        ))}
      </div>
      <div className={`feedback ${mode === "strategy" ? "good" : "warn"}`}>
        {mode === "first"
          ? "Quem pediu primeiro levou tudo. O Sul ficou sem nada, mesmo que fosse estratégico."
          : "A falta foi distribuída com critério e transparência. A regra pode proteger prioridades comerciais específicas."}
      </div>
    </div>
  );
}

function SpotPillars() {
  const pillars = [
    { id: "gov", t: "Governança de dados", d: "Garantir qualidade e consistência.", ex: "Todas as células olham para o mesmo número de estoque." },
    { id: "vis", t: "Visibilidade", d: "Transformar dados em informação útil.", ex: "Um desvio aparece antes de virar problema." },
    { id: "aut", t: "Automação", d: "Eliminar atividades manuais e aumentar produtividade.", ex: "Horas montando informação viram minutos de análise." },
  ];
  const [open, setOpen] = useState(null);
  return (
    <div className="spot">
      <p className="step-label">Os três pilares</p>
      <div className="pillars">
        {pillars.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`pillar ${open === p.id ? "open" : ""}`}
            aria-expanded={open === p.id}
            onClick={() => {
              S.click();
              setOpen(open === p.id ? null : p.id);
            }}
          >
            <strong>{p.t}</strong>
            <span>{p.d}</span>
            {open === p.id && <em>{p.ex}</em>}
          </button>
        ))}
      </div>
      <p className="step-label">Atuação como enabler</p>
      <div className="enabler">
        {CELLS.filter((c) => c.id !== "digital").map((c, i) => (
          <span key={c.id} className="enabler-node" style={{ "--c": c.color, "--i": i }}>
            <img src={c.img} alt="" />
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}

const SPOTLIGHTS = { layers: SpotLayers, bridge: SpotBridge, network: SpotNetwork, balance: SpotBalance, rateio: SpotRateio, pillars: SpotPillars };

function DoingModule({ cell }) {
  const Spot = SPOTLIGHTS[cell.doing.spotlight];
  const { forum, highlight } = cell.doing;
  return (
    <div className="mod">
      <ModHead kicker="O que fazemos" title="Como a célula pensa" sub="Não é sobre sistemas ou procedimentos. É sobre o raciocínio do negócio." />
      <p className="step-label">Perguntas que ajudamos a responder</p>
      <div className="q-cards">
        {cell.doing.questions.map((q, i) => (
          <div key={q} className="q-card" style={{ "--i": i, "--c": cell.color }}>
            {q}
          </div>
        ))}
      </div>
      <p className="step-label">Como pensamos</p>
      <ul className="think-list">
        {cell.doing.thinking.map((t) => (
          <li key={t}>
            <Icon name="check" size={16} />
            {t}
          </li>
        ))}
      </ul>
      {Spot && <Spot />}
      {forum && (
        <div className="forum">
          <span className="forum-tag">Fórum importante</span>
          <strong>{forum.name}</strong>
          <p>{forum.with}</p>
          <div className="forum-topics">
            {forum.topics.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      )}
      {highlight && (
        <div className="forum">
          <span className="forum-tag">Para não esquecer</span>
          <strong>{highlight.title}</strong>
          <p>{highlight.text}</p>
        </div>
      )}
    </div>
  );
}

/* ---------- Module 5: value ---------- */

function ValueModule({ cell }) {
  const cols = [
    { k: "Protege", icon: "shield", items: cell.value.protects },
    { k: "Habilita", icon: "spark", items: cell.value.enables },
    { k: "Melhora", icon: "trend", items: cell.value.improves },
  ];
  return (
    <div className="mod">
      <ModHead kicker="Valor gerado" title={`O que ${cell.name} entrega para a Bayer`} />
      <div className="value-cols">
        {cols.map((c, ci) => (
          <div key={c.k} className="value-col" style={{ "--c": cell.color }}>
            <span className="value-icon">
              <Icon name={c.icon} size={22} />
            </span>
            <strong>{c.k}</strong>
            <ul>
              {c.items.map((it, i) => (
                <li key={it} style={{ "--i": ci * 2 + i }}>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Module 7: areas ---------- */

function AreasModule({ cell }) {
  const [sel, setSel] = useState(null);
  const a = sel && cell.areas[sel];
  const profile = AREA_PROFILES.find((p) => p.id === sel);
  return (
    <div className="mod">
      <ModHead kicker="Como sua área se conecta conosco" title="Qual atividade é mais próxima da sua rotina?" sub="Escolha um perfil para ver a via de mão dupla com esta célula." />
      <div className="profiles">
        {AREA_PROFILES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`profile ${sel === p.id ? "on" : ""}`}
            aria-pressed={sel === p.id}
            onClick={() => {
              S.click();
              setSel(p.id);
            }}
          >
            <strong>{p.title}</strong>
            <span>{p.sub}</span>
          </button>
        ))}
      </div>
      {a && (
        <div className="two-way" key={sel} style={{ "--c": cell.color }}>
          <p className="two-way-title">Se você {profile.title.toLowerCase()}</p>
          <div className="two-way-grid">
            <div className="way">
              <span>
                Você impacta {cell.name}
                <Icon name="arrow" size={14} />
              </span>
              <p>{a.us}</p>
            </div>
            <div className="way back">
              <span>
                <Icon name="back" size={14} />
                {cell.name} impacta você
              </span>
              <p>{a.you}</p>
            </div>
          </div>
          <div className="day-example">
            <span>No dia a dia</span>
            <p>{a.example}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Module 8: chain ---------- */

function ChainModule({ cell }) {
  const others = CELLS.filter((c) => c.id !== cell.id);
  const [sel, setSel] = useState(null);
  const link = sel && cell.links[sel];
  const target = sel && cellById(sel);
  const center = { x: 50, y: 50 };
  const nodes = others.map((c, i) => {
    const ang = (-90 + (360 / others.length) * i) * (Math.PI / 180);
    return { c, x: 50 + Math.cos(ang) * 38, y: 50 + Math.sin(ang) * 36 };
  });
  return (
    <div className="mod">
      <ModHead kicker="Conexões com a cadeia" title="Nenhuma célula opera isoladamente" sub="Clique em cada célula para ver o que trocamos." />
      <div className="radial">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {nodes.map((n) => {
            const d = `M ${center.x} ${center.y} L ${n.x} ${n.y}`;
            return (
              <g key={n.c.id}>
                <path d={d} className={`radial-line ${sel === n.c.id ? "on" : ""}`} style={{ stroke: n.c.color }} />
                <circle r="1.1" fill={cell.color}>
                  <animateMotion dur="2.4s" repeatCount="indefinite" path={d} />
                </circle>
                <circle r="1.1" fill={n.c.color}>
                  <animateMotion dur="3.1s" repeatCount="indefinite" path={`M ${n.x} ${n.y} L ${center.x} ${center.y}`} />
                </circle>
              </g>
            );
          })}
        </svg>
        <div className="radial-center" style={{ "--c": cell.color }}>
          <img src={cell.img} alt="" />
          <span>{cell.name}</span>
        </div>
        {nodes.map((n) => (
          <button
            key={n.c.id}
            type="button"
            className={`radial-node ${sel === n.c.id ? "on" : ""}`}
            style={{ left: `${n.x}%`, top: `${n.y}%`, "--c": n.c.color }}
            onClick={() => {
              S.click();
              setSel(n.c.id);
            }}
            aria-pressed={sel === n.c.id}
          >
            <img src={n.c.img} alt="" />
            <span>{n.c.name}</span>
          </button>
        ))}
      </div>
      {link ? (
        <div className="exchange" key={sel}>
          <div className="exchange-col" style={{ "--c": cell.color }}>
            <span>{cell.name} entrega para {target.name}</span>
            <p>{link.gives}</p>
          </div>
          <div className="exchange-col" style={{ "--c": target.color }}>
            <span>{cell.name} recebe de {target.name}</span>
            <p>{link.gets}</p>
          </div>
        </div>
      ) : (
        <p className="hint">Os pontos que percorrem as linhas representam informações indo e voltando entre as células.</p>
      )}
    </div>
  );
}

/* ---------- Module 9: quiz ---------- */

function QuizModule({ cell, result, onComplete }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(!!result);
  const q = cell.quiz[idx];
  const picked = answers[idx];
  const score = answers.filter((a, i) => a === cell.quiz[i].correct).length;

  const restart = () => {
    setIdx(0);
    setAnswers([]);
    setFinished(false);
  };

  if (finished) {
    const shown = answers.length === cell.quiz.length ? score : result ? result.score : 0;
    const total = cell.quiz.length;
    return (
      <div className="mod">
        <ModHead kicker="Quiz" title="Resultado" />
        <div className="quiz-result" style={{ "--c": cell.color }}>
          <div className="quiz-score">
            <strong>
              {shown}/{total}
            </strong>
            <span>respostas certas</span>
          </div>
          <p>
            {shown === total
              ? `Você entendeu como ${cell.name} pensa e se conecta com a cadeia.`
              : shown >= total / 2
                ? `Boa leitura. Revise os módulos que quiser para aprofundar o papel de ${cell.name}.`
                : `Vale revisitar os módulos de ${cell.name}. O selo já é seu: o objetivo é entender, não decorar.`}
          </p>
          <div className="seal-mini" aria-label={`Selo ${cell.name} conquistado`}>
            <Icon name="check" size={20} />
            Selo {cell.name}
          </div>
        </div>
        <button type="button" className="btn-ghost" onClick={restart}>
          Refazer o quiz
        </button>
      </div>
    );
  }

  return (
    <div className="mod">
      <ModHead kicker={`Quiz · pergunta ${idx + 1} de ${cell.quiz.length}`} title={q.q} />
      <div className="quiz-dots" aria-hidden="true">
        {cell.quiz.map((_, i) => (
          <span key={i} className={i < idx ? (answers[i] === cell.quiz[i].correct ? "good" : "bad") : i === idx ? "now" : ""} />
        ))}
      </div>
      <div className="option-col">
        {q.options.map((o, i) => {
          const state = picked == null ? "" : i === q.correct ? "picked good" : i === picked ? "picked bad" : "";
          return (
            <button
              key={o}
              type="button"
              className={`option wide ${state}`}
              disabled={picked != null}
              onClick={() => {
                i === q.correct ? S.unlock() : S.alert();
                const next = [...answers];
                next[idx] = i;
                setAnswers(next);
              }}
            >
              <strong>{o}</strong>
            </button>
          );
        })}
      </div>
      {picked != null && (
        <>
          <div className={`feedback ${picked === q.correct ? "good" : "warn"}`}>
            <strong>{picked === q.correct ? "Isso mesmo. " : "Quase. "}</strong>
            {q.explain}
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              if (idx + 1 < cell.quiz.length) {
                S.click();
                setIdx(idx + 1);
              } else {
                const total = cell.quiz.length;
                const final = answers.filter((a, i) => a === cell.quiz[i].correct).length;
                setFinished(true);
                onComplete({ score: final, total });
              }
            }}
            autoFocus
          >
            {idx + 1 < cell.quiz.length ? "Próxima pergunta" : "Ver resultado"}
          </button>
        </>
      )}
    </div>
  );
}

/* ---------- Cell view ---------- */

function CellView({ cell, progress, onVisit, onQuizDone, onBack }) {
  const visited = progress.visited[cell.id] || [];
  const [mod, setMod] = useState(() => MODULES.find((m) => !visited.includes(m.id))?.id || "pain");
  const [celebrate, setCelebrate] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    onVisit(cell.id, mod);
  }, [mod]);

  const go = (id) => {
    if (id === mod) return;
    S.click();
    setMod(id);
    if (panelRef.current && window.innerWidth < 980) panelRef.current.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  };

  const next = MODULES[MODULES.findIndex((m) => m.id === mod) + 1];

  const content = {
    pain: <PainModule cell={cell} />,
    mission: <MissionModule cell={cell} />,
    inputs: <FlowModule cell={cell} mode="in" />,
    doing: <DoingModule cell={cell} />,
    value: <ValueModule cell={cell} />,
    outputs: <FlowModule cell={cell} mode="out" />,
    areas: <AreasModule cell={cell} />,
    chain: <ChainModule cell={cell} />,
    quiz: (
      <QuizModule
        cell={cell}
        result={progress.quiz[cell.id]}
        onComplete={(r) => {
          const first = !progress.quiz[cell.id];
          onQuizDone(cell.id, r);
          if (first) {
            S.seal();
            setCelebrate(true);
            setTimeout(() => setCelebrate(false), 2800);
          } else {
            S.success();
          }
        }}
      />
    ),
  }[mod];

  return (
    <section className="station">
      <CharacterStage cell={cell} celebrate={celebrate} />
      <div className="console" style={{ "--c": cell.color }}>
        <header className="console-head">
          <p className="eyebrow">{cell.name} · Jornada da célula</p>
          <h2>{cell.mission.statement}</h2>
        </header>
        <div className="cell-body">
          <nav className="mod-nav" aria-label={`Módulos de ${cell.name}`}>
            {MODULES.map((m, i) => {
              const seen = visited.includes(m.id);
              const done = m.id === "quiz" && progress.quiz[cell.id];
              return (
                <button
                  key={m.id}
                  type="button"
                  className={`mod-btn ${mod === m.id ? "active" : ""} ${seen ? "seen" : ""}`}
                  onClick={() => go(m.id)}
                  aria-current={mod === m.id ? "step" : undefined}
                >
                  <span className="mod-n">{done || (seen && mod !== m.id) ? <Icon name="check" size={13} /> : i + 1}</span>
                  <span className="mod-icon">
                    <Icon name={m.icon} size={16} />
                  </span>
                  <span className="mod-title">{m.title}</span>
                </button>
              );
            })}
          </nav>
          <div className="mod-panel" ref={panelRef} key={mod}>
            {content}
            {next && (
              <div className="mod-next">
                <button type="button" className="btn-primary" onClick={() => go(next.id)}>
                  {next.title}
                  <Icon name="arrow" size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
        <footer className="console-foot">
          <div className="foot-actions">
            <button type="button" className="btn-ghost" onClick={onBack}>
              Voltar ao mapa
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}

/* ---------- Completion ---------- */

function Completion({ progress, onMap, onRestart }) {
  const total = CELLS.reduce((a, c) => a + (progress.quiz[c.id] ? progress.quiz[c.id].score : 0), 0);
  const max = CELLS.reduce((a, c) => a + c.quiz.length, 0);
  return (
    <section className="synthesis">
      <div className="synth-guide">
        <img src={GUIDES.theo.img} alt="Theo, Guia da Central" />
      </div>
      <div className="synth-body">
        <p className="eyebrow">Theo · Guia da Central</p>
        <h2>Você percorreu a cadeia de ponta a ponta</h2>
        <p className="synth-line">Seis células, uma única cadeia. Da necessidade de mercado ao produto disponível, cada decisão depende da anterior e alimenta a próxima.</p>

        <div className="final-seal" role="img" aria-label="Selo Visão Integrada da Cadeia de Planning">
          <span className="seal-ring" />
          <span className="seal-text">Visão Integrada da Cadeia de Planning</span>
        </div>

        <div className="synth-result">
          <div className="good">
            <span>Respostas certas nos quizzes</span>
            <strong>
              {total}/{max}
            </strong>
          </div>
          <div>
            <span>Selos conquistados</span>
            <strong>6/6</strong>
          </div>
        </div>

        <ol className="synth-list">
          {CELLS.map((c) => (
            <li key={c.id} style={{ "--c": c.color }}>
              <img src={c.img} alt="" />
              <div>
                <strong>{c.name}</strong>
                <span className="q">{c.question}</span>
                <span className="a">
                  Quiz: {progress.quiz[c.id] ? progress.quiz[c.id].score : 0}/{c.quiz.length}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div className="cta-row">
          <button type="button" className="btn-ghost" onClick={onMap}>
            Voltar ao mapa
          </button>
          <button type="button" className="btn-primary" onClick={onRestart}>
            Recomeçar a jornada
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- App ---------- */

function App() {
  const [progress, setProgress] = useState(() => window.CDCStorage.load());
  const [zoomTo, setZoomTo] = useState(null);
  const [toast, setToast] = useState(null);
  const [justDone, setJustDone] = useState(null);

  useEffect(() => {
    window.CDCStorage.save(progress);
    S.setEnabled(progress.soundEnabled);
  }, [progress]);

  const update = (patch) => setProgress((p) => ({ ...p, ...patch }));

  const start = () => {
    S.ensure();
    S.unlock();
    update({ phase: "map" });
    setToast({ who: "lia", text: "Este é o mapa da cadeia. Comece por qualquer célula: cada uma tem 9 módulos e um quiz que vale o selo." });
  };

  const openCell = (id) => {
    S.whoosh();
    setToast(null);
    if (reducedMotion()) {
      update({ phase: "cell", currentCell: id });
      return;
    }
    setZoomTo(id);
    setTimeout(() => {
      setZoomTo(null);
      update({ phase: "cell", currentCell: id });
      window.scrollTo(0, 0);
    }, 650);
  };

  const visit = (cellId, modId) => {
    setProgress((p) => {
      const list = p.visited[cellId] || [];
      if (list.includes(modId)) return p;
      return { ...p, visited: { ...p.visited, [cellId]: [...list, modId] } };
    });
  };

  const quizDone = (cellId, r) => {
    setProgress((p) => {
      const prev = p.quiz[cellId];
      const best = prev && prev.score > r.score ? prev : r;
      return { ...p, quiz: { ...p.quiz, [cellId]: best } };
    });
  };

  const backToMap = () => {
    const id = progress.currentCell;
    const earned = id && progress.quiz[id];
    update({ phase: "map", currentCell: null });
    window.scrollTo(0, 0);
    if (earned) {
      setJustDone(id);
      setTimeout(() => setJustDone(null), 2600);
      const doneCount = CELLS.filter((c) => progress.quiz[c.id]).length;
      if (doneCount === CELLS.length) {
        setToast({ who: "theo", text: "Os seis selos estão conquistados. Abra a conclusão para ver sua visão integrada da cadeia." });
      } else {
        setToast({ who: "lia", text: `Selo de ${cellById(id).name} na conta. Faltam ${CELLS.length - doneCount} células para completar a visão de ponta a ponta.` });
      }
    }
  };

  const reset = () => {
    if (!window.confirm("Recomeçar a jornada do zero?")) return;
    window.CDCStorage.clear();
    setToast(null);
    setProgress(window.CDCStorage.defaultState());
  };

  const cell = cellById(progress.currentCell);

  return (
    <div className="app">
      <BayerLogo />
      {progress.phase !== "intro" && (
        <Hud
          progress={progress}
          onToggleSound={() => {
            const v = !progress.soundEnabled;
            S.setEnabled(v);
            if (v) S.click();
            update({ soundEnabled: v });
          }}
          onReset={reset}
        />
      )}

      {progress.phase === "intro" && <Intro onStart={start} />}

      {progress.phase === "map" && (
        <MapView
          progress={progress}
          onOpen={openCell}
          zoomTo={zoomTo}
          justDone={justDone}
          onComplete={() => {
            setToast(null);
            S.success();
            update({ phase: "complete" });
            window.scrollTo(0, 0);
          }}
        />
      )}

      {progress.phase === "cell" && cell && (
        <CellView key={cell.id} cell={cell} progress={progress} onVisit={visit} onQuizDone={quizDone} onBack={backToMap} />
      )}

      {progress.phase === "complete" && (
        <Completion
          progress={progress}
          onMap={() => update({ phase: "map" })}
          onRestart={() => {
            window.CDCStorage.clear();
            setProgress({ ...window.CDCStorage.defaultState(), phase: "map", soundEnabled: progress.soundEnabled });
          }}
        />
      )}

      {toast && progress.phase === "map" && <GuideToast who={toast.who} text={toast.text} onClose={() => setToast(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
