// Run against a running production server: node tests/site.test.js http://localhost:3111
const base=process.argv[2]||'http://localhost:3111';let fails=0;const titles=new Set();
const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{
 const expectedUrl=process.env.EXPECT_URL||'https://skyball-mt-games.vercel.app';
 const pages=['/','/games','/games/sky-ball','/games/endless-runner','/games/block-puzzle','/games/car-racing','/guides','/awards','/faq','/how-to-play','/levels','/tips','/about','/contact','/privacy','/terms'];const seen=new Set();const descriptions=new Set();const links=new Set();
 for(const p of pages){const r=await fetch(base+p);const h=await r.text();
  ok(r.status===200,`${p} -> ${r.status}`);
  ok(/<title>[^<]{5,}<\/title>/.test(h)&&/<meta name="description" content="[^"]{30,}/.test(h),`${p} has title + meta description`);
  ok(/<h1/.test(h)&&/<html lang="en"/.test(h)&&/rel="canonical"/.test(h),`${p} has h1, lang, canonical`);
  ok(/MT Games/i.test(h),`${p} footer shows MT Games branding`);
  ok(!/\[Site owner|\[Owner|TODO|Lorem/i.test(h),`${p} has no unfinished placeholders`);
  ok(/href="\/privacy"/.test(h)&&/href="\/terms"/.test(h)&&/href="\/contact"/.test(h),`${p} footer links to Privacy, Terms, Contact`);
  const canonical=(h.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)||[])[1];
  ok(canonical===`${expectedUrl}${p==='/'?'':p}`,`${p} canonical uses the production domain`);
  ok(!/name="robots" content="[^"]*noindex/i.test(h),`${p} is not marked noindex`);
  const description=(h.match(/<meta name="description" content="([^"]+)"/)||[])[1];
  ok(!!description&&!descriptions.has(description),`${p} has a unique meta description`);descriptions.add(description);
  if(p.startsWith('/games/'))for(const section of ['Beginner instructions','Advanced strategies','Game-specific tips','Common problems and solutions','Frequently asked questions'])ok(h.includes(section),`${p} includes ${section.toLowerCase()}`);
  if(p==='/awards')ok(h.includes('First Landing')&&h.includes('Cascade Chaser')&&!h.includes('Loading your saved achievements'),`${p} includes server-rendered achievement details`);
  if(p==='/privacy')ok(h.includes('adssettings.google.com')&&h.includes('does not currently show an on-site advertising consent dialog'),`${p} discloses ad personalization controls and current consent state`);
  const tt=(h.match(/<title>([^<]*)<\/title>/)||[])[1];ok(!titles.has(tt),`${p} has a unique title`);titles.add(tt);
  for(const m of h.matchAll(/href="(\/[^"#?]*)/g))links.add(m[1])}
 for(const l of links){if(l.startsWith('/_next')||l.startsWith('/favicon'))continue;const r=await fetch(base+l);ok(r.status===200,`link ${l} -> ${r.status}`)}
 const nf=await fetch(base+'/does-not-exist');const nh=await nf.text();ok(nf.status===404&&/404/.test(nh)&&/Page not found/.test(nh),'Custom 404 page served with status 404');
 const sm=await (await fetch(base+'/sitemap.xml')).text();ok(pages.every(p=>sm.includes('<loc>')&&sm.includes(p==='/'?'<loc>'+expectedUrl+'</loc>':`<loc>${expectedUrl}${p}</loc>`)),'sitemap.xml lists all MT Games pages');
 const rb=await (await fetch(base+'/robots.txt')).text();ok(/User-Agent: \*/i.test(rb)&&/Sitemap: /.test(rb),'robots.txt valid');
 const ads=await (await fetch(base+'/ads.txt')).text();ok(ads.trim()==='google.com, pub-4221940206853514, DIRECT, f08c47fec0942fa0','ads.txt has the preserved AdSense publisher entry');
 const home=await (await fetch(base+'/')).text();ok(home.includes('ca-pub-4221940206853514')&&home.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'),'AdSense verification script and publisher ID are present');
 for(const a of ['/game/skyball.html','/game/cloud-sprint.html','/game/neon-drift.html','/game/three.min.js','/games/prism-pop.svg','/favicon.svg']){const r=await fetch(base+a);ok(r.status===200,`asset ${a} -> ${r.status}`)}
 const g=await (await fetch(base+'/game/skyball.html')).text();ok(!/https?:\/\//.test(g.replace(/<[^>]*xmlns[^>]*>/g,'')),'Game page makes no external requests');
 for(const [path,title] of [['/game/cloud-sprint.html','Cloud Sprint'],['/game/neon-drift.html','Neon Drift']]){
  const response=await fetch(base+path);const html=await response.text();const script=(html.match(/<script>([\s\S]*?)<\/script>/)||[])[1];
  ok(response.status===200&&html.includes(title)&&html.includes('/game/three.min.js'),`${path} is a local Three.js game page`);
  try{new Function(script);ok(true,`${path} inline game script parses`)}catch(error){ok(false,`${path} inline game script parses: ${error.message}`)}
  ok(!/https?:\/\//.test(html),`${path} makes no external requests`);
 }
 const pl=await fetch(base+'/play',{redirect:'manual'});ok(pl.status===307&&pl.headers.get('location')==='/games/sky-ball','Legacy /play route redirects to the canonical Sky Ball page');
 const levelPlay=await fetch(base+'/play?level=12',{redirect:'manual'});ok(levelPlay.status===307&&levelPlay.headers.get('location')==='/games/sky-ball?level=12','Legacy level links preserve the selected course when redirecting');
 const ct=await (await fetch(base+'/contact')).text();console.log('INFO contact page state:',/<form/.test(ct)?'form shown':'placeholder shown (no email configured)');
 console.log(fails?`\n${fails} FAILED`:'\nALL PASSED');process.exit(fails?1:0)})();
