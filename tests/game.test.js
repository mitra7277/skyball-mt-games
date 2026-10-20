// Headless test: runs the game's real script in a Node VM with a stubbed DOM/THREE (no rendering).
const fs=require('fs'),vm=require('vm');
const file=process.argv[2]||'public/game/skyball.html';
const src=fs.readFileSync(file,'utf8').match(/<script>([\s\S]*)<\/script>/)[1];
function stub(){const st={};return new Proxy(function(){},{get(t,k){if(k===Symbol.toPrimitive)return()=>0;if(typeof k==='symbol')return undefined;if(k in st)return st[k];return st[k]=stub()},set(t,k,v){st[k]=v;return true},apply(){return stub()},construct(){return stub()}})}
class V3{constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z}set(x,y,z){this.x=x;this.y=y;this.z=z;return this}copy(o){return this.set(o.x,o.y,o.z)}addScaledVector(o,s){this.x+=o.x*s;this.y+=o.y*s;this.z+=o.z*s;return this}distanceTo(o){return Math.hypot(this.x-o.x,this.y-o.y,this.z-o.z)}}
class Obj{constructor(){this.position=new V3();this.rotation=new V3();this.visible=true;this.children=[];this.material={color:stub(),emissive:stub()}}add(...a){this.children.push(...a)}clear(){this.children=[]}}
const THREE=new Proxy({Vector3:V3,Mesh:Obj,Group:Obj},{get:(t,k)=>k in t?t[k]:function(){return stub()}});
function makeCtx(store={},extra={}){const els={},L={};let raf=null;
 const sb={THREE,console,Math,JSON,Object,
  document:{getElementById(id){return els[id]||(els[id]=stub(),id==='joy'&&(els[id].getBoundingClientRect=()=>({left:0,top:0})),els[id])}},
  localStorage:{getItem:k=>store[k]??null,setItem:(k,v)=>{store[k]=v}},
  matchMedia:()=>({matches:false}),navigator:{hardwareConcurrency:8},devicePixelRatio:1,innerWidth:1000,innerHeight:700,performance:{now:()=>0},
  requestAnimationFrame:f=>{raf=f},addEventListener:(t,f)=>{(L[t]||(L[t]=[])).push(f)},setTimeout:()=>0,URLSearchParams,...extra};
 sb.window=sb;const ctx=vm.createContext(sb);vm.runInContext(src,ctx);
 return{ctx,els,L,store,frame:t=>raf(t),run:c=>vm.runInContext(c,ctx)}}
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
// --- Bot playthrough of all 40 levels
const botSrc=`(function(){
 const sup=zo=>boxes.some(b=>!b.rot&&Math.abs(p.x-b.x)<=b.hx+.2&&Math.abs(p.z-zo-b.z)<=b.hz&&b.y+b.hy<p.y&&b.y+b.hy>p.y-2.3);
 function ctrl(){let tx=0;for(const b of boxes)if(b.rot&&p.z<b.z+4.8&&p.z>b.z-3.5)tx=3.6;
  inp.x=cl((tx-p.x)*2.5-v.x*1.6,-1,1);
  let wait=false;for(const b of boxes)if(b.rot&&p.z<b.z+5&&p.z>b.z+3.3&&Math.abs(p.x-3.6)>.4)wait=true;
  if(wait)inp.y=cl(-v.z*2,-1,1);else if(!sup(.8+.25*Math.abs(v.z)))inp.y=v.z<-.3?1:0;else inp.y=cl((-4.5-v.z)*1.5,-1,1)}
 return function(i){start(i);let falls=0,steps=0,lastY=p.y;
  while(state==='play'&&steps<120*400){ctrl();step(1/120);steps++;if(p.y-lastY>3)falls++;lastY=p.y}
  return{done:state==='done',time:t,stars:got,total:stars.length,falls,steps,end:[p.x,p.y,p.z].map(n=>n.toFixed(1)).join(','),zs:boxes.filter(b=>b.rot||b.mv).map(b=>(b.rot?'BAR':'MV')+Math.round(b.z)).join(' ')}}})()`;
const G=makeCtx();const bot=G.run(botSrc);
const res=[];for(let i=0;i<40;i++){const r=bot(i);res.push(r);ok(r.done,`Level ${i+1} completed by bot: ${r.time.toFixed(1)}s, stars ${r.stars}/${r.total}, respawns ${r.falls}${r.done?'':' END@'+r.end+' '+r.zs}`)}
// --- Unlocking + saved progress
ok(G.run('save.unlocked')===40,'All levels unlocked after sequential completion (unlocked='+G.run('save.unlocked')+')');
const saved=JSON.parse(G.store.sb);ok(saved.unlocked===40&&Object.keys(saved.best).length===40&&Object.keys(saved.completed).length===40,'Progress, completion & best times written to localStorage');
const G2=makeCtx({sb:G.store.sb});ok(/data-l=39 >/.test(G2.els.ov.innerHTML)||!/data-l=39 disabled/.test(G2.els.ov.innerHTML),'Reloaded game shows level 40 unlocked from saved progress');
const G3=makeCtx();ok(/data-l=1 disabled/.test(G3.els.ov.innerHTML)&&!/data-l=0 disabled/.test(G3.els.ov.innerHTML),'Fresh save: only level 1 unlocked');
const GB=makeCtx({sb:JSON.stringify({unlocked:99,best:{0:'oops'},completed:{0:'yes'}})});ok(GB.run('save.unlocked')===1&&!GB.els.ov.innerHTML.includes('oops'),'Invalid stored progress safely falls back to level 1');
// --- Collisions, falling, checkpoints
const T=G3.run(`(function(){start(1);const out={};
 p.set(0,3,-3);v.set(0,0,0);inp.x=0;inp.y=0;for(let i=0;i<240;i++)step(1/120);out.rest=p.y;out.grounded=grounded;
 // checkpoint activation
 const c=cps[0];p.set(c.x,c.y,c.z);step(1/120);out.cpOn=c.on&&spawn===c;
 p.set(0,minY-1,-50);step(1/120);out.resp=Math.hypot(p.x-c.x,p.z-c.z)<.5&&p.y>0;
 // side wall of a bridge: roll off the edge -> falls and respawns
 start(0);p.set(0,1,-30);inp.x=1;let fell=false;for(let i=0;i<120*6;i++){step(1/120);if(p.y<-1&&p.y>-20){fell=true;break}if(p.y>0.4&&Math.abs(p.x)<4&&false)break}out.fell=fell||p.y<0;
 // rotating bar pushes the ball
 start(3);const bar=boxes.find(b=>b.rot);p.set(bar.x+1.5,bar.y+.9,bar.z);v.set(0,0,0);inp.x=0;inp.y=0;let moved=0;for(let i=0;i<240;i++){step(1/120);moved=Math.max(moved,Math.hypot(v.x,v.z))}out.barPush=moved;
 // star collection
 start(0);const s=stars[0];p.set(s.m.position.x,s.m.position.y,s.m.position.z);step(1/120);out.star=got===1&&!s.on;
 return out})()`);
ok(Math.abs(T.rest-0.5)<0.02&&T.grounded,'Ball rests on platform top (y='+T.rest.toFixed(3)+')');
ok(T.cpOn,'Checkpoint activates');ok(T.resp,'Falling respawns at latest checkpoint');ok(T.fell,'Rolling off a bridge edge leads to a fall');
ok(T.barPush>1,'Rotating bar pushes ball (peak speed '+T.barPush.toFixed(1)+')');ok(T.star,'Star collected on contact');
// --- Keyboard
const K=makeCtx();K.run('start(0)');const key=(t,k)=>K.L[t].forEach(f=>f({key:k,preventDefault(){},repeat:false}));
const x0=K.run('p.x');key('keydown','d');for(let i=0;i<60;i++)K.frame(i*16);ok(K.run('p.x')>x0+.1,'Keyboard D moves ball right');key('keyup','d');
const z0=K.run('p.z');key('keydown','ArrowUp');for(let i=60;i<120;i++)K.frame(i*16);ok(K.run('p.z')<z0-.1,'Arrow Up moves ball forward');key('keyup','ArrowUp');
key('keydown','p');ok(K.run('state')==='pause','P pauses');key('keydown','p');ok(K.run('state')==='play','P resumes');
key('keydown',' ');ok(K.run('state')==='pause','Space pauses');key('keydown',' ');ok(K.run('state')==='play','Space resumes');
K.L.blur.forEach(f=>f());ok(K.run('state')==='pause','Window blur auto-pauses');
// --- Touch joystick
const J=makeCtx();J.run('start(0)');const joy=J.els.joy;let prevented=false;
joy.onpointerdown({clientX:130,clientY:65,pointerId:1,preventDefault(){prevented=true}});
const jx0=J.run('p.x');for(let i=0;i<60;i++)J.frame(i*16);ok(J.run('p.x')>jx0+.1&&prevented,'Touch joystick push right moves ball (default prevented)');
joy.onpointerup();ok(J.run('jx')===0&&J.run('jy')===0,'Joystick releases to zero');
joy.onpointerdown({clientX:65,clientY:0,pointerId:1,preventDefault(){}});const jz0=J.run('p.z');for(let i=60;i<120;i++)J.frame(i*16);ok(J.run('p.z')<jz0-.1,'Touch joystick push up moves ball forward');
const D1=makeCtx({},{location:{search:'?level=2'}});ok(D1.run('state')==='menu','Deep link to locked level is ignored (shows menu)');
const D2=makeCtx({sb:JSON.stringify({unlocked:3})},{location:{search:'?level=2'}});ok(D2.run('state')==='play'&&D2.run('n')===1,'Deep link ?level=2 starts level 2 when unlocked');
console.log(fails?`\n${fails} FAILED`:'\nALL PASSED');process.exit(fails?1:0);
