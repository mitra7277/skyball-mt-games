// Run against a running production server: node tests/site.test.js http://localhost:3111
const base=process.argv[2]||'http://localhost:3111';let fails=0;const titles=new Set();
const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{
 const pages=['/','/play','/how-to-play','/levels','/tips','/about','/contact','/privacy','/terms'];const seen=new Set();const links=new Set();
 for(const p of pages){const r=await fetch(base+p);const h=await r.text();
  ok(r.status===200,`${p} -> ${r.status}`);
  ok(/<title>[^<]{5,}<\/title>/.test(h)&&/<meta name="description" content="[^"]{30,}/.test(h),`${p} has title + meta description`);
  ok(/<h1/.test(h)&&/<html lang="en"/.test(h)&&/rel="canonical"/.test(h),`${p} has h1, lang, canonical`);
  ok(h.includes('Sky Ball: 3D Challenge by MT Games'),`${p} footer shows "Sky Ball: 3D Challenge by MT Games"`);
  ok(!/\[Site owner|\[Owner|TODO|Lorem/i.test(h),`${p} has no unfinished placeholders`);
  ok(/href="\/privacy"/.test(h)&&/href="\/terms"/.test(h)&&/href="\/contact"/.test(h),`${p} footer links to Privacy, Terms, Contact`);
  const tt=(h.match(/<title>([^<]*)<\/title>/)||[])[1];ok(!titles.has(tt),`${p} has a unique title`);titles.add(tt);
  for(const m of h.matchAll(/href="(\/[^"#?]*)/g))links.add(m[1])}
 for(const l of links){if(l.startsWith('/_next')||l.startsWith('/favicon'))continue;const r=await fetch(base+l);ok(r.status===200,`link ${l} -> ${r.status}`)}
 const nf=await fetch(base+'/does-not-exist');const nh=await nf.text();ok(nf.status===404&&/404/.test(nh)&&/Page not found/.test(nh),'Custom 404 page served with status 404');
 const sm=await (await fetch(base+'/sitemap.xml')).text();ok(pages.every(p=>sm.includes('<loc>')&&sm.includes(p==='/'?'<loc>'+(process.env.EXPECT_URL||'https://your-domain.example')+'</loc>':p)),'sitemap.xml lists all 9 pages');
 const rb=await (await fetch(base+'/robots.txt')).text();ok(/User-Agent: \*/i.test(rb)&&/Sitemap: /.test(rb),'robots.txt valid');
 for(const a of ['/game/skyball.html','/game/three.min.js','/favicon.svg']){const r=await fetch(base+a);ok(r.status===200,`asset ${a} -> ${r.status}`)}
 const g=await (await fetch(base+'/game/skyball.html')).text();ok(!/https?:\/\//.test(g.replace(/<[^>]*xmlns[^>]*>/g,'')),'Game page makes no external requests');
 const pl=await (await fetch(base+'/play')).text();ok(/iframe/.test(pl)||/Loading game/.test(pl),'Play page renders game container');
 const ct=await (await fetch(base+'/contact')).text();console.log('INFO contact page state:',/<form/.test(ct)?'form shown':'placeholder shown (no email configured)');
 console.log(fails?`\n${fails} FAILED`:'\nALL PASSED');process.exit(fails?1:0)})();
