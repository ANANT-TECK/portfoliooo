import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Instagram, Mail, Menu, MessageCircle, Phone, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import kaizoAsset from "../assets/kaizo-main.png.asset.json";
import { Button } from "../components/ui/button";
import { CONTACT, INSTAGRAM_URL, PROJECT_FORM_URL, WHATSAPP_URL } from "../lib/links";

const description = "EDITEDGE is my video editing business. I'm Kaizo, the editor behind every reel, long-form cut, color grade and cinematic edit.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EDITEDGE — Video editing by KAIZO" },
      { name: "description", content: description },
      { property: "og:title", content: "EDITEDGE — Video editing by KAIZO" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
       children: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Kaizo", jobTitle: "Video Editor and owner of EDITEDGE", worksFor: { "@type": "Organization", name: "EDITEDGE" }, sameAs: [INSTAGRAM_URL] }),
    }],
  }),
  component: Index,
});

const navItems = [
  ["Work", "work"], ["About", "about"], ["Pricing", "pricing"], ["Contact", "contact"],
] as const;

const work = [
  { name: "Short form", caption: "Reels & Shorts I cut for retention.", ids: ["1187106727", "1187106770", "1187106805", "1187106836"], vertical: true },
  { name: "Color grading", caption: "How a boring clip becomes a scene.", ids: ["1187108765", "1187321621"], vertical: true },
  { name: "Real estate", caption: "Property films that make people book a visit.", ids: ["1187108204"], vertical: true },
  { name: "Cinematic video", caption: "Story first, then the pretty stuff.", ids: ["1187633832"], vertical: true },
  { name: "Long form", caption: "Podcasts, documentaries and YouTube edits with pace.", ids: ["1187110342", "1187110374", "1187110407"], vertical: false },
];

const prices = [
  { title: "VIDEO EDITING", note: "most picked ★", prices: ["Short form — $50 per video", "Full length — $15 per minute"], items: ["Cinematic cuts & pacing", "Sound design + SFX", "Subtitles & motion text", "2 rounds of revisions"] },
  { title: "COLOR GRADING", note: "frame by frame", prices: ["Advanced cinematic correction", "$15 per minute"], items: ["Log/RAW handling", "Custom LUTs", "Skin-tone protection", "HDR-ready delivery"] },
  { title: "GRAPHIC DESIGN", note: "made to keep", prices: ["Logo & branding", "$20 per asset"], items: ["Vector logo files", "Brand color system", "Social kit", "Source files included"] },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-video-id]"));
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const middle = window.innerHeight / 2;
        const visible = cards.map((card) => {
          const rect = card.getBoundingClientRect();
          const shown = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
          return { id: card.dataset.videoId ?? "", ratio: shown / rect.height, distance: Math.abs((rect.top + rect.bottom) / 2 - middle) };
        }).filter((item) => item.ratio >= 0.55);
        visible.sort((a, b) => b.ratio - a.ratio || a.distance - b.distance);
        setActiveVideoId(visible[0]?.id ?? null);
      });
    };
    const observer = new IntersectionObserver(update, { threshold: [0, 0.25, 0.55, 0.75, 1] });
    cards.forEach((card) => observer.observe(card));
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div className="film-grain min-h-screen bg-background text-foreground">
      <Header open={menuOpen} setOpen={setMenuOpen} />
      <main>
        <section id="home" className="relative flex scroll-mt-20 items-center overflow-hidden border-b border-border px-5 pb-9 pt-27 md:min-h-[780px] md:px-10 md:pb-16 md:pt-28 lg:px-16">
          <div className="halftone absolute right-0 top-0 h-2/3 w-1/2 opacity-40" />
          <div className="absolute bottom-6 left-5 hidden font-mono text-[10px] text-muted-foreground [writing-mode:vertical-rl] md:block">FRAME 001 / KAIZO ARCHIVE</div>
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 md:gap-14 lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative z-10">
              <h1 className="font-display text-[clamp(3.9rem,10vw,10rem)] leading-[.95] tracking-normal">EDITEDGE</h1>
              <p className="mt-1 font-hand text-3xl text-primary md:mt-3 md:text-5xl">Video editing by KAIZO.</p>
              <div className="mt-5 max-w-[55%] sm:max-w-none md:mt-8">
                <p className="font-mono text-[10px] uppercase leading-relaxed text-primary md:text-sm">Reels · Long Form · Color Grading · Cinematic Editing</p>
                <p className="mt-3 max-w-xl text-base font-medium leading-snug md:mt-5 md:text-3xl">I turn raw footage into videos people actually finish watching.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
                <Button asChild><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Message me on WhatsApp <ArrowRight size={16} /></a></Button>
                <Button asChild variant="outline" className="hidden sm:inline-flex"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><Instagram size={18} /> @editedge_kaizo</a></Button>
              </div>
              <p className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground md:mt-5 md:text-[11px]"><span className="h-2 w-2 animate-[pulse-dot_1.5s_ease-in-out_infinite] rounded-full bg-chart-2" /> Open for new projects — replies on WhatsApp</p>
              <div className="mt-5 flex flex-wrap items-center gap-6 md:mt-9">
                <a href="#work" className="flex items-center gap-2 font-mono text-xs uppercase hover:text-primary">See my work <ArrowDown size={15} /></a>
                <span className="hidden rotate-[-2deg] font-hand text-2xl text-primary md:inline">Edited by Kaizo. Only Kaizo.</span>
              </div>
            </div>
            <div className="absolute right-2 top-30 z-0 w-[39%] max-w-[190px] md:relative md:right-auto md:top-auto md:mx-auto md:w-full md:max-w-[500px] md:px-7">
              <div className="absolute -left-4 top-14 hidden font-hand text-2xl text-primary md:block">the face behind every frame ↗</div>
              <div className="relative rotate-[-3deg] bg-paper p-1.5 pb-7 shadow-hard transition-transform duration-300 hover:rotate-[-1deg] md:p-3 md:pb-16">
                <span className="absolute -left-3 -top-2 h-5 w-14 rotate-[-8deg] bg-paper/60 backdrop-blur-[1px] md:-left-5 md:-top-3 md:h-9 md:w-28" />
                <span className="absolute -right-3 -top-2 h-5 w-14 rotate-[9deg] bg-paper/60 backdrop-blur-[1px] md:-right-5 md:h-9 md:w-28" />
                <img src={kaizoAsset.url} alt="Kaizo, the editor behind EDITEDGE" width="640" height="640" fetchPriority="high" className="aspect-square w-full object-cover" />
                <span className="absolute bottom-2 left-2 font-mono text-[7px] text-ink md:bottom-5 md:left-6 md:text-[11px]">KAIZO / 2026</span>
              </div>
              <div className="mt-8 hidden justify-end font-mono text-[10px] text-muted-foreground md:flex">REC <span className="mx-2 text-primary">●</span> 00:00:{String(24 + seconds).padStart(2, "0")}:12</div>
            </div>
          </div>
        </section>

        <section id="work" className="relative scroll-mt-20 overflow-hidden bg-paper px-5 pb-20 pt-8 text-ink md:px-10 md:py-24 lg:px-16">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-32 -translate-x-1/2 font-display text-[28vw] leading-none text-transparent opacity-10 [-webkit-text-stroke:2px_var(--ink)]">KAIZO</div>
          <SectionHeading number="/02" title="Selected work" note="press play. judge the cut." dark />
          <div className="relative mx-auto mt-7 max-w-7xl space-y-16 md:mt-16 md:space-y-20">
            {work.map((group, groupIndex) => (
              <article key={group.name}>
                <div className="mb-4 flex flex-col justify-between gap-1 border-b-2 border-ink pb-2 md:mb-7 md:flex-row md:items-end md:gap-2 md:pb-3">
                  <h3 className="font-display text-3xl uppercase md:text-6xl">{group.name}</h3>
                  <p className="font-hand text-xl text-primary md:text-2xl">{group.caption}</p>
                </div>
                <div className={group.vertical ? "grid grid-cols-2 gap-4 md:grid-cols-4" : "grid gap-5 md:grid-cols-3"}>
                  {group.ids.map((id, index) => <VideoCard key={id} id={id} active={activeVideoId === id} onSelect={() => setActiveVideoId(id)} vertical={group.vertical} index={index + groupIndex} />)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="relative scroll-mt-20 px-5 py-24 md:px-10 lg:px-16">
          <SectionHeading number="/03" title="About me" note="yes, just me." />
          <div className="mx-auto mt-16 grid max-w-6xl items-center gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div className="relative mx-auto max-w-sm">
              <div className="rounded-full border-2 border-dashed border-primary p-3">
                <img src={kaizoAsset.url} alt="Kaizo — main portrait" loading="lazy" width="640" height="640" className="aspect-square rounded-full object-cover" />
              </div>
              <span className="absolute -bottom-8 right-0 rotate-[-8deg] font-hand text-5xl text-primary">Kaizo</span>
            </div>
            <div>
              <p className="text-2xl leading-relaxed md:text-4xl">I'm Kaizo, the editor behind EDITEDGE. I edit videos for creators, brands and real-estate people who are tired of content that gets ignored. I handle everything myself — cutting, pacing, sound design, color — so what you get is one person's full attention, not a pipeline.</p>
              <div className="mt-9 flex flex-wrap gap-3">{["Precision cuts", "Cinematic color", "High-retention storytelling", "Fast turnaround"].map((badge, i) => <span key={badge} className={`border border-primary px-4 py-2 font-mono text-xs uppercase ${i % 2 ? "rotate-[-1deg]" : "rotate-[1deg]"}`}>{badge}</span>)}</div>
              <p className="mt-10 inline-block rotate-[-2deg] border-2 border-primary px-4 py-2 font-mono text-xs font-bold text-primary">ONE EDITOR. ONE STANDARD.</p>
              <p className="mt-7 font-hand text-3xl"><s className="text-muted-foreground">we</s> I made the cut.</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-20 bg-deep-blue px-5 py-24 md:px-10 lg:px-16">
          <SectionHeading number="/04" title="Pricing" note="clear numbers. no mystery." />
          <div className="mx-auto mt-16 grid max-w-7xl gap-8 lg:grid-cols-3">
            {prices.map((price, index) => (
              <article key={price.title} className={`paper-tear bg-paper p-7 text-ink shadow-hard ${index === 1 ? "lg:translate-y-8 lg:rotate-[1deg]" : index === 2 ? "lg:rotate-[-1deg]" : "lg:rotate-[1deg]"}`}>
                <p className="font-hand text-2xl text-primary">{price.note}</p>
                <h3 className="mt-2 border-b-2 border-dashed border-ink pb-5 font-display text-4xl">{price.title}</h3>
                <div className="space-y-2 border-b-2 border-dashed border-ink py-6">{price.prices.map((line, i) => <p key={line} className={i === price.prices.length - 1 ? "font-display text-3xl text-primary" : "font-semibold"}>{line}</p>)}</div>
                <ul className="my-6 space-y-3 font-mono text-xs">{price.items.map((item) => <li key={item}>+ {item}</li>)}</ul>
                <Button asChild className="w-full"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Talk to Kaizo <ArrowRight size={16} /></a></Button>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="scroll-mt-20 bg-paper px-5 py-24 text-ink md:px-10 lg:px-16">
          <SectionHeading number="/05" title="How I work" note="three beats. clean delivery." dark />
          <div className="relative mx-auto mt-20 grid max-w-6xl gap-16 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-primary md:block" />
            {["You send the footage & the vibe", "I cut, grade and sound-design it", "You review, I fix, you post"].map((step, index) => (
              <div key={step} className={`relative ${index === 1 ? "md:translate-y-12" : ""}`}>
                <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink bg-primary font-display text-3xl">0{index + 1}</span>
                <h3 className="mt-6 max-w-xs font-display text-3xl uppercase leading-tight md:text-4xl">{step}</h3>
                {index < 2 && <ArrowRight className="mt-6 text-primary md:hidden" />}
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="relative scroll-mt-20 overflow-hidden px-5 py-24 md:px-10 lg:px-16">
          <div className="halftone absolute inset-y-0 right-0 w-2/5 opacity-50" />
          <div className="relative mx-auto max-w-7xl">
            <p className="font-mono text-xs text-primary">/06 CONTACT</p>
            <h2 className="mt-4 max-w-5xl font-display text-[clamp(4.5rem,13vw,11rem)] uppercase leading-[.84]">Let's make something.</h2>
            <p className="mt-5 font-hand text-3xl text-primary">your footage deserves a proper cut ↘</p>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <ContactLink href={WHATSAPP_URL} label="WhatsApp" value={CONTACT.phoneDisplay} icon={<MessageCircle />} />
              <ContactLink href={INSTAGRAM_URL} label="Instagram" value="@editedge_kaizo" icon={<Instagram />} />
              <ContactLink href={`mailto:${CONTACT.email}`} label="Email" value={CONTACT.email} icon={<Mail />} />
              <ContactLink href={`tel:${CONTACT.phone}`} label="Phone · India" value={CONTACT.phoneDisplay} icon={<Phone />} />
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6"><Button asChild variant="paper"><a href={PROJECT_FORM_URL} target="_blank" rel="noreferrer">Fill the project form <ArrowRight size={16} /></a></Button><p className="font-hand text-3xl">Every edit on this page was made by me.</p></div>
          </div>
        </section>
      </main>
      <Footer />
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
         <Button asChild variant="icon" className="h-10 min-h-10 w-10" aria-label="Instagram"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><Instagram size={18} /></a></Button>
         <Button asChild variant="primary" className="h-14 min-h-14 w-14 rounded-full p-0" aria-label="Message Kaizo on WhatsApp"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle size={23} /></a></Button>
      </div>
    </div>
  );
}

function Header({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  return <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#home" className="flex items-center gap-3"><img src={kaizoAsset.url} alt="Kaizo avatar" className="h-10 w-10 rounded-full border-2 border-primary object-cover" /><span className="flex flex-col"><span className="font-display text-xl leading-none md:text-2xl">EDITEDGE</span><span className="font-hand text-base leading-none text-primary">by KAIZO</span></span></a>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="font-mono text-[11px] uppercase hover:text-primary">{label}</a>)}<Button asChild><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a></Button></nav>
        <Button variant="icon" className="md:hidden" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)}><Menu className="h-6 w-6" strokeWidth={2.5} /></Button>
      </div>
    </header>
    {open && <div className="fixed inset-0 z-[70] flex flex-col bg-background p-6 md:hidden"><div className="flex items-center justify-between"><span className="flex flex-col"><span className="font-display text-3xl">EDITEDGE</span><span className="font-hand text-xl text-primary">by KAIZO</span></span><Button variant="icon" aria-label="Close navigation" onClick={() => setOpen(false)}><X className="h-6 w-6" strokeWidth={2.5} /></Button></div><nav className="my-auto flex flex-col gap-2">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="font-display text-6xl uppercase hover:text-primary">{label}</a>)}</nav><div className="flex gap-5 font-mono text-xs uppercase"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a></div></div>}
  </>;
}

function SectionHeading({ number, title, note, dark = false }: { number: string; title: string; note: string; dark?: boolean }) {
  return <div className="mx-auto max-w-7xl"><p className="font-mono text-xs text-primary">{number}</p><div className={`mt-3 flex flex-col justify-between gap-1 border-b-2 pb-3 md:flex-row md:items-end md:gap-3 md:pb-5 ${dark ? "border-ink" : "border-foreground"}`}><h2 className="font-display text-5xl uppercase md:text-8xl">{title}</h2><p className="font-hand text-xl text-primary md:text-2xl">{note}</p></div></div>;
}

function VideoCard({ id, vertical, index, active, onSelect }: { id: string; vertical: boolean; index: number; active: boolean; onSelect: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<import("@vimeo/player").default | null>(null);
  useEffect(() => { if (active) setLoaded(true); }, [active]);
  useEffect(() => {
    if (!loaded || !iframeRef.current) return;
    let disposed = false;
    let player: import("@vimeo/player").default | null = null;
    import("@vimeo/player").then(({ default: Player }) => {
      if (disposed || !iframeRef.current) return;
      player = new Player(iframeRef.current);
      playerRef.current = player;
      player.ready().then(() => {
        if (disposed) return;
        player?.setVolume(0).catch(() => {});
        if (active) player?.play().then(() => setAutoplayFailed(false)).catch(() => setAutoplayFailed(true));
      }).catch(() => { if (!disposed) setAutoplayFailed(true); });
    });
    return () => { disposed = true; player?.pause().catch(() => {}); playerRef.current = null; };
  }, [loaded, id]);
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (active) player.play().then(() => setAutoplayFailed(false)).catch(() => setAutoplayFailed(true));
    else player.pause().catch(() => {});
  }, [active]);
  const rotation = index % 3 === 0 ? "rotate-[1deg]" : index % 2 === 0 ? "rotate-[-1deg]" : "rotate-[.5deg]";
  return <div data-video-id={id} className={`group relative border-2 border-ink bg-ink p-2 shadow-hard transition-transform hover:-translate-y-1 ${rotation}`}>
    {loaded ? <div className="relative"><iframe ref={iframeRef} src={`https://player.vimeo.com/video/${id}?autoplay=0&muted=1&playsinline=1&dnt=1`} title={`EDITEDGE portfolio video ${id}`} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className={`w-full border-0 ${vertical ? "aspect-[9/16]" : "aspect-video"}`} />{autoplayFailed && <Button variant="paper" onClick={() => { onSelect(); playerRef.current?.play().then(() => setAutoplayFailed(false)).catch(() => {}); }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-label={`Play portfolio video ${id}`}><Play size={16} fill="currentColor" /> PLAY</Button>}</div> : <Button variant="paper" onClick={() => { setLoaded(true); onSelect(); }} className={`relative w-full overflow-hidden border-0 p-0 ${vertical ? "aspect-[9/16]" : "aspect-video"}`} aria-label={`Play portfolio video ${id}`}><span className="absolute inset-0 halftone opacity-70" /><span className="relative flex items-center gap-2 font-display text-3xl"><Play fill="currentColor" /> PLAY</span><span className="absolute bottom-3 left-3 font-mono text-[9px]">VIMEO / {id}</span></Button>}
    <span className="absolute -top-3 left-1/2 h-7 w-20 -translate-x-1/2 rotate-[2deg] bg-paper/70" />
  </div>;
}

function ContactLink({ href, label, value, icon }: { href: string; label: string; value: string; icon: React.ReactNode }) {
   return <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex min-w-0 items-center gap-4 border-b border-border py-5 hover:border-primary"><span className="text-primary">{icon}</span><span className="min-w-0"><span className="block font-mono text-[10px] uppercase text-muted-foreground">{label}</span><span className="block break-words text-xl font-semibold md:text-2xl">{value}</span></span><ArrowRight className="ml-auto shrink-0 transition-transform group-hover:translate-x-1" /></a>;
}

function Footer() {
  return <footer className="border-t border-border px-5 py-10 md:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-end md:justify-between"><div><p className="font-display text-5xl">EDITEDGE</p><p className="font-hand text-2xl text-primary">by KAIZO</p><p className="mt-2 max-w-sm font-mono text-[10px] uppercase text-muted-foreground">© 2026 EDITEDGE. Created and owned by Kaizo. All rights reserved.</p></div><nav className="flex flex-wrap gap-5 font-mono text-[10px] uppercase">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="hover:text-primary">{label}</a>)}<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a></nav></div></footer>;
}