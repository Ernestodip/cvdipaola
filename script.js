document.addEventListener('DOMContentLoaded', () => {
  // ===== Theme (light/dark) =====
  const root = document.documentElement;
  const THEME = 'cv_theme';
  const savedTheme = localStorage.getItem(THEME);
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  const setTheme = (m) => { root.setAttribute('data-theme', m); localStorage.setItem(THEME, m); };
  const toggleTheme = () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');

  // ===== Paleta (default / vino) =====
  const PALETTE = 'cv_palette';
  const savedPalette = localStorage.getItem(PALETTE) || 'default';
  root.setAttribute('data-palette', savedPalette);
  const setPalette = (p) => { root.setAttribute('data-palette', p); localStorage.setItem(PALETTE, p); };
  const togglePalette = () => setPalette(root.getAttribute('data-palette') === 'default' ? 'vino' : 'default');

  // ===== FX on/off =====
  const FX = 'cv_fx';
  const savedFx = localStorage.getItem(FX) || 'on';
  if (savedFx === 'off') document.body.classList.add('fx-off');
  const toggleFx = () => {
    const off = document.body.classList.toggle('fx-off');
    localStorage.setItem(FX, off ? 'off' : 'on');
  };

  // ===== i18n (ES/EN) =====
  const I18N_KEY = 'cv_lang';
  const i18n = {
    es: {
      nav:{about:'Sobre mí',skills:'Habilidades',exp:'Experiencia',edu:'Formación'},
      ui:{theme:'Tema',download:'Descargar CV', palette:'Paleta', fx:'FX'},
      hero:{role:'Desarrollador Full Stack · Analista de Datos', cta:'Disponible para oportunidades '},
      metrics:{m1:'↓ tiempo de entrega<br>con reportes automatizados', m2:'alertas en Grafana<br>para picos de demanda', m3:'+50 informes<br>mensuales/diarios'},
      about:{title:'Sobre mí',body:'Soy un apasionado de la tecnología y del aprendizaje continuo. Trabajo como analista de datos en el área de Reportes Técnica de Claro/APEX, donde estandarizo procesos y automatizo reportes para acelerar la toma de decisiones. Cuento con una Diplomatura en Desarrollo Full Stack y estoy por finalizar la Tecnicatura en Desarrollo de Software. Mi objetivo es aportar soluciones que generen impacto real en los usuarios y en la organización.'},
      skills:{title:'Habilidades',tech:'Técnicas',soft:'Blandas'},
      exp:{title:'Experiencia',present:'Presente',e1_1:'Monitoreo y análisis de herramientas de detección de fallas (móvil, fija e IPTV).',e1_2:'Intervención en incidentes y escalamiento de fallas masivas, mitigando impacto en usuarios.',e1_3:'Automatización de tableros e informes en <strong>Power BI</strong>; monitoreo en <strong>Grafana</strong> y alertas en tiempo real.',e1_4:'Reportes de rendimiento diarios/semanales/mensuales y análisis de problemáticas recurrentes.',e1_5:'Diseño de instructivos y capacitaciones a equipos de soporte.',e1_6:'Atención a clientes referidos con soporte especializado y datos para escalamiento.',e2:'Atención técnica, ventas y análisis de métricas de performance.',r3:'Encargado',e3_1:'Gestión de stock y compras; atención al público; community management.',e3_2:'Coordinación de equipo y caja.',r4:'Administrativo',e4_1:'Relaciones públicas, control de personal y facturación.',r5:'Administrativo',e5_1:'Cobro de alquileres, depósitos y facturación.'},
      edu:{title:'Formación Académica',it:'Tecnicatura en Desarrollo de Software',ds:'Diplomatura · Desarrollador Full Stack',hs:'Secundario · Bachiller en Cs. Sociales',i1:'Instituto Superior Blas Pascal · 2021 – cursando último semestre',i2:'Ícaro – FCEFyN · 2022 – 2023',i3:'E.N.C.J.A · 2009 – 2014'},
      footer:{updated:'Última actualización'}
    },
    en: {
      nav:{about:'About',skills:'Skills',exp:'Experience',edu:'Education'},
      ui:{theme:'Theme',download:'Download PDF', palette:'Palette', fx:'FX'},
      hero:{role:'Full-Stack Developer · Data Analyst', cta:'Open to opportunities '},
      metrics:{m1:'↓ delivery time<br>via automated reports', m2:'24/7 Grafana alerts<br>for demand spikes', m3:'+50 monthly/daily reports'},
      about:{title:'About Me',body:'I am passionate about technology and continuous learning. I work as a data analyst in Claro/APEX Technical Reports, where I standardize processes and automate reports to speed up decision-making. I hold a Full-Stack diploma and I am finishing a Software Development degree. I focus on delivering solutions with real impact on users and the organization.'},
      skills:{title:'Skills',tech:'Technical',soft:'Soft'},
      exp:{title:'Experience',present:'Present',e1_1:'Monitoring and analysis of fault-detection tools (mobile, fixed and IPTV).',e1_2:'Incident response and major outage escalation, reducing user impact.',e1_3:'Automated dashboards and reports in <strong>Power BI</strong>; metrics monitoring in <strong>Grafana</strong> with real-time alerts.',e1_4:'Daily/weekly/monthly performance reports and recurring issue analysis.',e1_5:'Playbooks and training for support teams.',e1_6:'Support to referred customers with specialized data for escalation.',e2:'Technical support, sales and performance metrics analysis.',r3:'Store Manager',e3_1:'Inventory & purchasing; customer service; community management.',e3_2:'Team coordination and cash desk.',r4:'Administrative',e4_1:'Public relations, staff control and invoicing.',r5:'Administrative',e5_1:'Rent collection, deposits and invoicing.'},
      edu:{title:'Education',it:'Software Development Technician',ds:'Diploma · Full-Stack Developer',hs:'High School · Social Sciences',i1:'Instituto Superior Blas Pascal · 2021 – last semester',i2:'Ícaro – FCEFyN · 2022 – 2023',i3:'E.N.C.J.A · 2009 – 2014'},
      footer:{updated:'Last updated'}
    }
  };

  const setLang = (lng) => {
    localStorage.setItem(I18N_KEY, lng);
    document.documentElement.lang = lng === 'en' ? 'en' : 'es';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const path = el.getAttribute('data-i18n').split('.');
      let val = i18n[lng];
      path.forEach(k => val = val?.[k]);
      if (typeof val === 'string') el.innerHTML = val;
    });
    document.getElementById('date').textContent =
      new Date().toLocaleDateString(document.documentElement.lang === 'en' ? 'en-US' : 'es-AR',
        { year:'numeric', month:'long' });
  };
  const toggleLang = () => setLang((localStorage.getItem(I18N_KEY) || 'es') === 'es' ? 'en' : 'es');
  setLang(localStorage.getItem(I18N_KEY) || 'es'); // init

  // ===== Drawer =====
  const drawer = document.getElementById('drawer');
  const btnHamb = document.getElementById('btn-hamb');
  const closeDrawer = () => {
    drawer?.classList.remove('open');
    btnHamb?.setAttribute('aria-expanded','false');
    document.body.classList.remove('no-scroll');
  };
  btnHamb?.addEventListener('click', () => {
    const isOpen = drawer?.classList.contains('open');
    drawer?.classList.toggle('open', !isOpen);
    btnHamb?.setAttribute('aria-expanded', String(!isOpen));
    document.body.classList.toggle('no-scroll', !isOpen);
  });
  drawer?.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });
  drawer?.querySelectorAll('a.drawer-item').forEach(a => a.addEventListener('click', closeDrawer));

  // ===== Botones =====
  document.getElementById('btn-theme')?.addEventListener('click', toggleTheme);
  document.getElementById('btn-palette')?.addEventListener('click', togglePalette);
  document.getElementById('btn-fx')?.addEventListener('click', toggleFx);
  document.getElementById('btn-lang')?.addEventListener('click', toggleLang);

  document.getElementById('btn-lang-m')?.addEventListener('click', () => { toggleLang(); closeDrawer(); });
  document.getElementById('btn-theme-m')?.addEventListener('click', () => { toggleTheme(); closeDrawer(); });
  document.getElementById('btn-palette-m')?.addEventListener('click', () => { togglePalette(); closeDrawer(); });
  document.getElementById('btn-fx-m')?.addEventListener('click', () => { toggleFx(); closeDrawer(); });

  // ===== Descargar CV (desktop + mobile) =====
  const goCV = () => { window.location.href = 'cv-a4.html'; };
  document.getElementById('btn-pdf')?.addEventListener('click', goCV);
  document.getElementById('btn-pdf-m')?.addEventListener('click', () => { goCV(); closeDrawer(); });

  // ===== PDF: 1 sola hoja (si usás print desde este index) =====
  const printCV = (ultra = false) => {
    document.documentElement.classList.add('force-onepage');
    if (ultra) document.documentElement.classList.add('ultra-compact');
    const cleanup = () => {
      document.documentElement.classList.remove('force-onepage', 'ultra-compact');
    };
    window.addEventListener('afterprint', cleanup, { once: true });
    window.print();
  };

  // ===== Fecha footer =====
  document.getElementById('date').textContent =
    new Date().toLocaleDateString(document.documentElement.lang === 'en' ? 'en-US' : 'es-AR',
      { year:'numeric', month:'long' });

  // ===== Reveal =====
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); }});
    }, {threshold: .12});
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('on'));
  }

  // ===== Progreso =====
  const progress = document.getElementById('progress');
  const updateProgress = () => {
    const h = document.documentElement;
    const sc = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progress.style.width = (sc * 100) + '%';
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, {passive:true});

  // ===== Scrollspy =====
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const sections = links.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  const spy = () => {
    let idx = 0;
    const y = window.scrollY + 150;
    sections.forEach((sec,i)=>{
      const atEnd = (i === sections.length - 1) && (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2);
      if (sec.offsetTop <= y || atEnd) idx = i;
    });
    links.forEach((l,i)=> l.classList.toggle('active', i===idx));
  };
  spy();
  window.addEventListener('scroll', spy, {passive:true});

  // ===== Atajos =====
  window.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (k === 't') toggleTheme();
    if (k === 'p') togglePalette();
    if (k === 'f') toggleFx();
  });
});
