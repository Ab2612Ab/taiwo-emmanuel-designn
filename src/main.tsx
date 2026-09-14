import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Menu, X, Mail, MessageCircle, Github, Linkedin, Figma, Code2, Layers3, Sparkles } from 'lucide-react';
import './styles.css';

type Work = { title: string; category: string; description: string; tone: string };

const work: Work[] = [
  { title: 'TaskFlow', category: 'SaaS · Product Design', description: 'A focused project-management experience designed to make teams move from planning to delivery with less friction.', tone: 'lavender' },
  { title: 'Banking App', category: 'Fintech · UX/UI', description: 'A modern mobile banking concept balancing trust, speed and clarity across everyday money tasks.', tone: 'mint' },
  { title: 'E-commerce Platform', category: 'Commerce · Web', description: 'A conversion-minded shopping experience with cleaner discovery, product detail and checkout flows.', tone: 'peach' },
  { title: 'Healthcare Platform', category: 'Healthcare · UX', description: 'A calm management interface that turns complex healthcare workflows into approachable experiences.', tone: 'blue' },
  { title: 'Analytics Dashboard', category: 'Data · Product', description: 'A structured dashboard system that makes dense operational data easier to scan and act on.', tone: 'sand' },
];

function App() {
  const [open, setOpen] = React.useState(false);
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const go = (to: string) => { window.history.pushState({}, '', to); setPath(to); setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  if (path.startsWith('/work/') && path !== '/work/') return <CaseStudy slug={path.split('/').pop() ?? ''} go={go} />;
  if (path === '/work') return <PageShell go={go}><WorkPage go={go} /></PageShell>;
  if (path === '/about') return <PageShell go={go}><AboutPage /></PageShell>;
  if (path === '/services') return <PageShell go={go}><ServicesPage /></PageShell>;
  if (path === '/contact') return <PageShell go={go}><ContactPage /></PageShell>;

  return <PageShell go={go}><Home go={go} /></PageShell>;

  function PageShell({ children, go }: { children: React.ReactNode; go: (to: string) => void }) {
    return <>
      <header className="nav">
        <button className="brand" onClick={() => go('/')}>TAIWO EMMANUEL</button>
        <nav className={`navlinks ${open ? 'open' : ''}`}>
          <button onClick={() => go('/work')}>Work</button><button onClick={() => go('/about')}>About</button><button onClick={() => go('/services')}>Services</button><button onClick={() => go('/contact')}>Contact</button>
        </nav>
        <div className="navright"><span className="availability"><i /> Available for selected projects</span><button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X size={22}/> : <Menu size={22}/>}</button></div>
      </header>
      <main>{children}</main>
      <footer className="footer"><div><span className="smallcap">TAIWO EMMANUEL</span><p>Designing digital experiences people understand, enjoy, and remember.</p></div><div className="footerlinks"><a href="mailto:taiwoemmanuel693@gmail.com">Email</a><a href="https://www.linkedin.com/in/emmanuel-taiwo-46b309271/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/Ab2612Ab" target="_blank" rel="noreferrer">GitHub</a></div></footer>
    </>;
  }
}

function Home({ go }: { go: (to: string) => void }) { return <>
  <section className="hero wrap"><div className="eyebrow">UI/UX DESIGNER · WEB DEVELOPER · PRODUCT DESIGNER</div><h1>I design digital experiences <em>people understand,</em> enjoy, and remember.</h1><div className="hero-bottom"><p>I bring together product thinking, interface design, and front-end craft to create clear, purposeful digital products.</p><div className="actions"><button className="primary" onClick={() => go('/work')}>View my work <ArrowUpRight size={18}/></button><button className="secondary" onClick={() => go('/contact')}>Let's work together</button></div></div></section>
  <section className="visual wrap"><div className="browser"><div className="dots"><span/><span/><span/></div><div className="browsergrid"><div className="mock-sidebar"><div className="mini-line wide"/><div className="mini-line"/><div className="mini-line"/><div className="mini-line"/></div><div className="mock-main"><div className="mock-heading"/><div className="cards"><div/><div/><div/></div><div className="big-chart"><div className="chartline c1"/><div className="chartline c2"/><div className="chartline c3"/></div></div></div><div className="float-card"><span>01</span><strong>Clear systems<br/>create better products.</strong></div></div>
  <section className="section wrap" id="work"><div className="section-head"><span className="smallcap">SELECTED WORK</span><button className="textlink" onClick={() => go('/work')}>View all work <ArrowUpRight size={17}/></button></div><div className="workgrid">{work.slice(0,3).map((item, i)=><WorkCard key={item.title} item={item} go={go} index={i}/>)}</div></section>
  <section className="statement wrap"><div className="big-label">I SPEAK BOTH<br/><em>DESIGN</em> AND CODE.</div><div className="statement-copy"><p>Good products live where ideas, people, and technology meet. My process is built around that intersection.</p><div className="skillcols"><div><span>DESIGN</span><p><Figma size={15}/> UX Research<br/><Layers3 size={15}/> Design Systems<br/><Sparkles size={15}/> UI & Prototyping</p></div><div><span>DEVELOPMENT</span><p><Code2 size={15}/> React<br/><Code2 size={15}/> JavaScript<br/><Code2 size={15}/> HTML · CSS · Git</p></div></div></div></section>
  <section className="process wrap"><span className="smallcap">FROM IDEA TO INTERFACE</span><div className="processgrid">{[['01','Discover'],['02','Define'],['03','Design'],['04','Build'],['05','Refine']].map(([n,t])=><div key={n}><span>{n}</span><strong>{t}</strong><p>Thoughtful decisions from first question to final interaction.</p></div>)}</div></section>
  <section className="cta wrap"><p className="smallcap">HAVE A PROJECT IN MIND?</p><h2>Let's make something<br/><em>worth using.</em></h2><button className="primary" onClick={() => go('/contact')}>Start a conversation <ArrowUpRight size={18}/></button></section>
</> }

function WorkCard({ item, go, index }: { item: Work; go: (to:string)=>void; index:number }) { const slug=item.title.toLowerCase().replaceAll(' ','-'); return <button className="workcard" onClick={()=>go(`/work/${slug}`)}><div className={`workvisual ${item.tone}`}><div className="workbadge">0{index+1}</div><div className="workwindow"><div/><div/><div/></div></div><div className="workmeta"><div><span>{item.category}</span><h3>{item.title}</h3></div><ArrowUpRight size={20}/></div><p>{item.description}</p></button> }
function PageTitle({ label, title, copy }: {label:string;title:string;copy:string}) { return <section className="pagehead wrap"><span className="smallcap">{label}</span><h1>{title}</h1><p>{copy}</p></section> }
function WorkPage({ go }: { go:(to:string)=>void }) { return <><PageTitle label="SELECTED WORK" title="A selection of product, web, and interface work." copy="Concepts and case-study directions focused on clarity, usability, and a strong visual point of view."/><section className="section wrap"><div className="workgrid full">{work.map((item,i)=><WorkCard item={item} go={go} index={i} key={item.title}/>)}</div></section></> }
function AboutPage() { return <><PageTitle label="ABOUT" title="Designing with intention, building with care." copy="I’m Taiwo Emmanuel, a UI/UX designer, web developer, and product designer focused on digital experiences that feel clear and considered."/><section className="about-grid wrap"><div className="portrait">TE</div><div><h2>Design first. Technology close behind.</h2><p>I enjoy translating ambiguous product ideas into interfaces that people can navigate naturally. From research and information architecture to polished UI and responsive front-end implementation, I like staying close to the full journey.</p><p>My goal is simple: remove friction, create useful systems, and make the final experience feel intentional.</p></div></section></> }
function ServicesPage() { const items=[['Product & UI/UX Design','Research, flows, wireframes, visual systems, prototypes and responsive interface design.'],['Web Design & Development','Marketing sites, product websites and custom front ends built for clarity, speed and maintainability.'],['Design Systems','Reusable components, tokens, patterns and documentation that keep products coherent as they grow.']]; return <><PageTitle label="SERVICES" title="From product thinking to production-ready interfaces." copy="Flexible support for new products, redesigns, and digital experiences that need a sharper point of view."/><section className="service-list wrap">{items.map(([t,p],i)=><div className="service-row" key={t}><span>0{i+1}</span><div><h2>{t}</h2><p>{p}</p></div><ArrowUpRight size={22}/></div>)}</section></> }
function ContactPage() { return <><PageTitle label="CONTACT" title="Have a product, website, or idea to shape?" copy="Tell me what you are working on and what a useful outcome looks like. I’ll get back to you with the clearest next step."/><section className="contact-grid wrap"><a href="mailto:taiwoemmanuel693@gmail.com" className="contact-card"><Mail/><span>Email</span><strong>taiwoemmanuel693@gmail.com</strong></a><a href="https://wa.me/2349045945470" target="_blank" rel="noreferrer" className="contact-card"><MessageCircle/><span>WhatsApp</span><strong>+234 904 594 5470</strong></a><a href="https://www.linkedin.com/in/emmanuel-taiwo-46b309271/" target="_blank" rel="noreferrer" className="contact-card"><Linkedin/><span>LinkedIn</span><strong>emmanuel-taiwo-46b309271</strong></a><a href="https://github.com/Ab2612Ab" target="_blank" rel="noreferrer" className="contact-card"><Github/><span>GitHub</span><strong>Ab2612Ab</strong></a></section></> }
function CaseStudy({ slug, go }: { slug:string; go:(to:string)=>void }) { const item=work.find(w=>w.title.toLowerCase().replaceAll(' ','-')===slug) ?? work[0]; return <PageShell go={go}><section className={`case wrap ${item.tone}`}><button className="back" onClick={()=>go('/work')}>← Back to work</button><span className="smallcap">{item.category}</span><h1>{item.title}</h1><p className="caseintro">{item.description}</p><div className="casevisual"><div className="case-ui"><div/><div/><div/><div/></div></div><div className="casecopy"><div><span className="smallcap">CHALLENGE</span><p>Create a clear experience around the core task while keeping the interface approachable and responsive.</p></div><div><span className="smallcap">APPROACH</span><p>Research, information architecture, user flow, wireframes, visual design, prototyping and front-end implementation.</p></div><div><span className="smallcap">SOLUTION</span><p>A focused system of reusable components and deliberate interactions that support the product's primary goals.</p></div></div><button className="primary" onClick={()=>go('/contact')}>Discuss a similar project <ArrowUpRight size={18}/></button></section></PageShell> }

createRoot(document.getElementById('root')!).render(<App />);
