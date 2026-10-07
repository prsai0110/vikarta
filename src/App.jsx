import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react';

const services = [
  { id: '01', title: 'BRANDING', lead: 'Build a brand people remember.', items: ['Brand Strategy', 'Brand Naming', 'Logo Design', 'Visual Identity', 'Brand Guidelines', 'Packaging', 'Marketing Collateral'] },
  { id: '02', title: 'ADVERTISING', lead: 'Ideas that get attention.', items: ['Advertising Campaigns', 'Campaign Concepts', 'Creative Direction', 'Digital Advertising', 'Print Advertising', 'Outdoor Advertising', 'Product Launches', 'Promotional Campaigns'] },
  { id: '03', title: 'SOCIAL MEDIA', lead: 'Make your brand part of the conversation.', items: ['Social Media Strategy', 'Creative Posts', 'Content Campaigns', 'Reels', 'Social Media Videos', 'Festival Campaigns', 'Promotional Creatives', 'Monthly Content Design'] },
  { id: '04', title: 'VIDEO & MOTION', lead: 'Tell your story beyond the static frame.', items: ['Commercial Videos', 'Brand Films', 'Promotional Videos', 'Motion Graphics', '2D Animation', 'Explainer Videos', 'Short-Form Videos', 'Storyboarding'] },
  { id: '05', title: 'CREATIVE DESIGN', lead: 'Design that communicates.', items: ['Graphic Design', 'Brochures', 'Posters', 'Catalogues', 'Presentations', 'Menus', 'Digital Creatives', 'Event Designs'] },
  { id: '06', title: 'VISUAL STORYTELLING', lead: 'Turn imagination into visual experiences.', items: ['Concept Development', 'Concept Art', 'Storyboards', 'Illustration', 'Character Design', 'Campaign Visuals', 'Creative Visualization', 'Art Direction'] },
];

const work = [
  { no: '01', category: 'BRAND IDENTITY', title: 'Built around one strong idea.', type: 'Identity / Art Direction' },
  { no: '02', category: 'CAMPAIGN', title: 'A campaign people notice.', type: 'Advertising / Creative Direction' },
  { no: '03', category: 'DIGITAL', title: 'Designed for the conversation.', type: 'Digital / Social Content' },
  { no: '04', category: 'PACKAGING', title: 'Designed to be remembered.', type: 'Packaging / Visual System' },
];

const process = [
  ['01', 'DISCOVER', 'We understand your business, audience, competition and objectives.'],
  ['02', 'THINK', 'We find the idea behind the communication.'],
  ['03', 'CREATE', 'We transform the idea into powerful visual and verbal communication.'],
  ['04', 'CONNECT', 'We deliver the right message through the right medium.'],
  ['05', 'GROW', 'We build consistent communication that helps your brand evolve.'],
];

const ease = [0.22, 1, 0.36, 1];

function Reveal({ children, className = '', delay = 0, y = 40 }) {
  return <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.8, delay, ease }}>{children}</motion.div>;
}

function MagneticButton({ children, onClick, href, dark = false }) {
  const [hover, setHover] = useState(false);
  const props = { whileHover: { y: -3 }, whileTap: { scale: 0.97 }, onHoverStart: () => setHover(true), onHoverEnd: () => setHover(false), className: `magnetic ${dark ? 'magnetic-dark' : ''}` };
  const inner = <><span>{children}</span><motion.span animate={{ rotate: hover ? 45 : 0 }}><ArrowUpRight size={17} /></motion.span></>;
  return href ? <motion.a {...props} href={href}>{inner}</motion.a> : <motion.button {...props} onClick={onClick}>{inner}</motion.button>;
}

function Nav({ open, setOpen }) {
  const go = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    window.history.pushState({}, '', `#${id}`);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  };
  return <header className="site-nav">
    <button className="brand" onClick={() => go('home')} aria-label="Go to home">VIKARTA</button>
    <nav className={open ? 'nav-links open' : 'nav-links'}>
      {[['ABOUT', 'about'], ['SERVICES', 'services'], ['WORK', 'work'], ['PROCESS', 'process'], ['CONTACT', 'contact']].map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
    </nav>
    <div className="nav-actions"><button className="nav-talk" onClick={() => go('contact')}>LET'S TALK <ArrowUpRight size={15} /></button><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></div>
  </header>;
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.18], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.14], [1, 0.25]);

  return <section id="home" className="hero section-dark">
    <div className="hero-grid" />

    <motion.div className="hero-media" style={{ y, opacity }}
      initial={{ opacity: 0, scale: 1.08 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease }}>
      <div className="hero-media-image hero-media-image-one" />
      <div className="hero-media-image hero-media-image-two" />
      <div className="hero-media-wash" />
      <div className="hero-media-grain" />
      <motion.div className="hero-media-orbit"
        animate={{ rotate: 360 }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}>
        <span />
      </motion.div>
      <motion.div className="hero-media-card"
        initial={{ y: 30, opacity: 0, rotate: -7 }}
        animate={{ y: 0, opacity: 1, rotate: -4 }}
        transition={{ delay: .85, duration: 1, ease }}>
        <span>VIKARTA / 01</span>
        <strong>IDEA<br /><em>IN MOTION.</em></strong>
        <small>BRAND · CAMPAIGN · EXPERIENCE</small>
      </motion.div>
      <div className="hero-media-caption"><i /> VISUAL IDENTITY / CREATIVE DIRECTION</div>
    </motion.div>

    <div className="hero-side-glow" />

    <motion.div className="hero-content"
      initial="hidden" animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } } }}>
      <motion.div className="eyebrow" variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
        <i /> CREATIVE ADVERTISING & BRAND STUDIO
      </motion.div>
      <motion.h1 variants={{ hidden: { opacity: 0, y: 65 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease } } }}>
        WE TURN<br /><span>IDEAS</span><br />INTO IMPACT.
      </motion.h1>
      <motion.p variants={{ hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0 } }}>
        Vikarta is a creative advertising and brand studio built to help businesses become more visible, memorable and meaningful.
      </motion.p>
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="hero-actions">
        <MagneticButton href="#work">EXPLORE OUR WORK</MagneticButton>
        <a className="text-link" href="#services">VIEW SERVICES <ArrowRight size={15} /></a>
      </motion.div>
    </motion.div>

    <div className="hero-meta">
      <span>HYDERABAD · INDIA</span>
      <span>SCROLL TO EXPLORE <ArrowDown size={14} /></span>
      <span>01 / 06</span>
    </div>
    <motion.div className="hero-scroll-line" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.4, duration: 1 }} />
  </section>;
}
function About() {
  return <section id="about" className="about section-light">
    <div className="container"><div className="section-top"><span>01 — WHAT WE BELIEVE</span><span>THE IDEA COMES FIRST</span></div>
      <div className="about-layout"><Reveal><p className="display-statement">Great advertising<br />starts with <em>a great idea.</em></p></Reveal><Reveal delay={0.1}><div className="about-copy"><p>A logo is more than a symbol. A campaign is more than a poster. A video is more than moving images.</p><p>Every visual should have a purpose. Every story should create a connection.</p><p>At Vikarta, we transform ideas into creative experiences that help brands communicate with confidence.</p></div></Reveal></div>
      <div className="belief-strip"><span>STRATEGY</span><span>CREATIVITY</span><span>DESIGN</span><span>STORY</span><span>IMPACT</span></div>
    </div>
  </section>;
}

function Services() {
  const [active, setActive] = useState(0);
  return <section id="services" className="services section-dark"><div className="container"><div className="section-top"><span>02 — SERVICES</span><span>ONE IDEA. MANY POSSIBILITIES.</span></div><div className="services-heading"><Reveal><h2>WHAT<br /><em>WE CREATE.</em></h2></Reveal><Reveal delay={0.1}><p>Strategy and creativity work together across every touchpoint — from the first idea to the final impression.</p></Reveal></div>
    <div className="services-wrap"><div className="service-list">{services.map((s, i) => <motion.button key={s.id} className={active === i ? 'service-row active' : 'service-row'} onClick={() => setActive(i)} whileHover={{ x: 8 }}><span>{s.id}</span><strong>{s.title}</strong><ArrowUpRight size={18} /></motion.button>)}</div>
      <AnimatePresence mode="wait"><motion.div key={active} className="service-detail" initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }} animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }}><div className={`detail-art detail-art-${active}`}>
  <div className="detail-photo" />
  <div className="detail-number">{services[active].id}</div>
  <motion.div className="detail-title" key={active} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease }}>{services[active].title}</motion.div>
  <div className="detail-overlay" />
</div><div className="detail-copy"><p>{services[active].lead}</p><div>{services[active].items.map(item => <span key={item}><Check size={13} />{item}</span>)}</div></div></motion.div></AnimatePresence>
    </div></div></section>;
}

function Marquee() {
  return <div className="marquee" aria-label="Vikarta creative disciplines"><motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>{Array.from({ length: 2 }).flatMap((_, j) => ['STRATEGY', 'BRANDING', 'ADVERTISING', 'DESIGN', 'CONTENT', 'MOTION', 'STORYTELLING'].map((x, i) => <span key={`${j}-${i}`}>{x}<b>✦</b></span>))}</motion.div></div>;
}

function Process() {
  return <section id="process" className="process section-light"><div className="container"><div className="section-top"><span>03 — OUR CREATIVE PROCESS</span><span>FROM IDEA TO IMPACT</span></div><Reveal><h2>DISCOVER.<br />THINK.<br /><em>CREATE.</em></h2></Reveal><div className="process-grid">{process.map(([num, title, text], i) => <Reveal key={num} delay={i * 0.06}><article><div className="process-number">{num}</div><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div></div></section>;
}

function Work() {
  const [selected, setSelected] = useState(null);
  return <section id="work" className="work section-dark"><div className="container"><div className="section-top"><span>04 — SELECTED WORK</span><span>CREATIVE DIRECTION / DESIGN / CONTENT</span></div><Reveal><h2>IDEAS THAT<br /><em>MAKE AN IMPACT.</em></h2></Reveal><div className="work-list">{work.map((item, i) => <Reveal key={item.no} delay={i * 0.06}><button className={`work-item work-${i}`} onClick={() => setSelected(item)}><div className={`work-image work-photo-${i}`}><div className="work-photo" /><span>{item.no}</span><div className="work-shape" /><div className="work-image-overlay" /></div><div className="work-info"><small>{item.category}</small><h3>{item.title}</h3><p>{item.type}</p><span className="case-link">VIEW CASE <ArrowUpRight size={16} /></span></div></button></Reveal>)}</div></div>
    <AnimatePresence>{selected && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><motion.div className="case-modal" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} onClick={e => e.stopPropagation()}><button onClick={() => setSelected(null)} aria-label="Close case"><X /></button><small>{selected.category}</small><h3>{selected.title}</h3><p>This interactive case-study panel is ready for Vikarta's real project imagery, campaign details, deliverables and results. Replace the creative placeholder with the final case study when project assets are available.</p><div className="modal-meta"><span>CREATIVE DIRECTION</span><span>VISUAL IDENTITY</span><span>CAMPAIGN SYSTEM</span></div></motion.div></motion.div>}</AnimatePresence>
  </section>;
}

function Promise() {
  return <section className="promise section-dark"><div className="promise-grid" /><div className="container"><span>05 — OUR PROMISE</span><motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>DON'T JUST LOOK DIFFERENT.</motion.p><motion.h2 initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease }}>BE <em>REMEMBERED.</em></motion.h2></div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = e => { e.preventDefault(); setSent(true); };
  return <section id="contact" className="contact section-light"><div className="container"><div className="section-top"><span>06 — LET'S TALK</span><span>START A CONVERSATION</span></div><div className="contact-grid"><div><Reveal><h2>LET'S CREATE<br />SOMETHING WORTH<br /><em>REMEMBERING.</em></h2></Reveal><p className="contact-intro">Have a brand that needs a fresh perspective? Launching something new? Looking for a creative partner?</p><div className="contact-links"><a href="mailto:[EMAIL]">[EMAIL] <ArrowUpRight size={15} /></a><a href="tel:[PHONE]">[PHONE] <ArrowUpRight size={15} /></a></div></div><form onSubmit={submit}><label>NAME<input required placeholder="Your name" /></label><label>EMAIL<input required type="email" placeholder="you@company.com" /></label><label>PROJECT TYPE<select defaultValue=""><option value="" disabled>Select one</option><option>Branding</option><option>Advertising</option><option>Social Media</option><option>Video & Motion</option><option>Creative Design</option><option>Visual Storytelling</option></select></label><label>MESSAGE<textarea required rows="5" placeholder="Tell us about your idea..." /></label><button className="submit-button" type="submit">{sent ? <>MESSAGE READY <Check size={17} /></> : <>SEND INQUIRY <ArrowUpRight size={17} /></>}</button>{sent && <p className="form-note">Thanks — your inquiry is prepared. Connect the form to your preferred email/backend when the real contact endpoint is available.</p>}</form></div></div></section>;
}

function Footer() {
  const go = id => {
    const target = document.getElementById(id);
    if (!target) return;
    window.history.pushState({}, '', `#${id}`);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return <footer className="footer section-dark"><div className="container footer-grid"><div><button className="footer-logo" onClick={() => go('home')}>VIKARTA</button><p>Creative Advertising & Brand Studio</p></div><div className="footer-nav">{['about', 'services', 'work', 'process', 'contact'].map(id => <button key={id} onClick={() => go(id)}>{id.toUpperCase()}</button>)}</div><div className="footer-right"><p>WE TURN IDEAS INTO IMPACT.</p><span>© 2026 VIKARTA. ALL RIGHTS RESERVED.</span></div></div></footer>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1350);
    const hash = window.location.hash.replace('#', '');
    if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 1450);
    return () => clearTimeout(t);
  }, []);
  return <>
    <motion.div className="scroll-progress" style={{ scaleX: progress }} />
    <AnimatePresence>{loading && <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .65 }}><motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .7 }}>VIKARTA</motion.div><span>CREATIVE ADVERTISING & BRAND STUDIO</span><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .25, duration: .8 }} /></motion.div>}</AnimatePresence>
    <Nav open={menuOpen} setOpen={setMenuOpen} />
    <main><Hero /><About /><Marquee /><Services /><Process /><Work /><Promise /><Contact /></main>
    <Footer />
  </>;
}
