/* Cinematic layer — runs after app.js has rendered the page */
(()=>{
const D=document,R=D.documentElement,B=D.body,$=(s,c=D)=>[...c.querySelectorAll(s)];
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,hov=matchMedia('(hover:hover)').matches;
if(!localStorage.getItem('wdz-theme'))R.classList.add('dark');
const go=()=>B.classList.add('cine-ready');

// split headlines into words for the rack-focus reveal
function split(el){let i=0;el.setAttribute('aria-label',el.textContent);(function walk(n){[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=D.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(p=>{if(!p)return;if(/^\s+$/.test(p))f.append(' ');else{const s=D.createElement('span');s.className='w';s.style.setProperty('--i',i++);s.textContent=p;f.append(s)}});c.replaceWith(f)}else if(c.nodeType===1)walk(c)})})(el)}
$('.hero-card h1,.chapter-card-hero h1,.page-head h1').forEach(split);

// signature scene on the home page: follow one click down the stack
const JR=[['User','Someone clicks a button.'],['Frontend','The browser collects what they typed.'],['API / HTTP','A request travels to the server.'],['Backend','The server checks the rules.'],['Database','Data is read or written, then the response travels back up.']];
if(B.dataset.page==='home'){
 const j=D.createElement('section');j.className='journey';j.id='journey';
 j.innerHTML=`<div class="j-stick"><div class="j-copy"><h2>Follow one click.</h2><p id="jt">${JR[0][1]}</p></div><div class="j-stage"><i class="j-line"><b class="j-packet"></b></i><ol>${JR.map(x=>`<li><b>${x[0]}</b><small>${x[1]}</small></li>`).join('')}</ol></div></div>`;
 const s=$('.main-inner > section');s[s.length-1].before(j);
}

// overlays
B.insertAdjacentHTML('beforeend','<div class="curtain"><i></i><i></i></div><div id="glow"></div><div id="sp"></div>');
const cv=D.createElement('canvas');cv.id='stars';B.prepend(cv);const cx=cv.getContext('2d');

// title sequence (home, once per session)
function intro(){
 const o=D.createElement('div');o.id='intro';
 o.innerHTML='<i class="bar t"></i><i class="bar b"></i><div class="it"><small>WEB DEVELOPMENT</small><b>From Zero</b></div><div class="ic"><span>0</span>%</div><button>Skip</button>';
 B.append(o);B.classList.add('introing');
 const n=o.querySelector('.ic span'),t0=performance.now();let done=false;
 const end=()=>{if(done)return;done=true;o.classList.add('out');go();setTimeout(()=>{o.remove();B.classList.remove('introing')},1200)};
 const tick=t=>{const p=Math.min(1,(t-t0)/1900);n.textContent=Math.round(p*100);if(done)return;p<1?requestAnimationFrame(tick):setTimeout(end,350)};
 requestAnimationFrame(tick);o.onclick=end;
}
if(B.dataset.page==='home'&&!rm&&!sessionStorage.getItem('wdz-intro')){sessionStorage.setItem('wdz-intro',1);intro()}else go();

// shutters between pages
if(sessionStorage.getItem('wdz-nav')){sessionStorage.removeItem('wdz-nav');B.classList.add('arriving');setTimeout(()=>B.classList.remove('arriving'),1300)}
addEventListener('pageshow',e=>{if(e.persisted)B.classList.remove('leaving')});
D.addEventListener('click',e=>{
 const a=e.target.closest('a[href]');
 if(!a||a.target||e.metaKey||e.ctrlKey||e.shiftKey||e.button||a.protocol!==location.protocol||a.host!==location.host||a.pathname===location.pathname||/\.md$/.test(a.pathname))return;
 e.preventDefault();sessionStorage.setItem('wdz-nav',1);B.classList.add('leaving');setTimeout(()=>location.href=a.href,rm?0:600);
});

// rack-focus reveals + tilt
if(!rm){
 const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
 $('.lesson,.toc,.quiz,.info-chip,.feature-grid>*,.roadmap-list article,.resource-grid article,.lab-gallery article,.glossary-grid article,.dashboard-strip .widget-card').forEach(e=>{e.dataset.r='';io.observe(e)});
}
if(hov&&!rm)$('.course-card,.feature-grid>a,.resource-grid article,.roadmap-list article').forEach(e=>{
 e.dataset.tilt='';
 e.addEventListener('pointermove',v=>{const r=e.getBoundingClientRect();e.style.setProperty('--rx',((v.clientX-r.left)/r.width-.5)*10+'deg');e.style.setProperty('--ry',-((v.clientY-r.top)/r.height-.5)*10+'deg')});
 e.addEventListener('pointerleave',()=>{e.style.setProperty('--rx','0deg');e.style.setProperty('--ry','0deg')});
});

// one render loop: stars (warp on scroll), progress, parallax, journey
let raf,W,H,S=[],mx=0,my=0,v=0,ly=scrollY,ji=-1;
const glow=D.getElementById('glow'),sp=D.getElementById('sp'),P=$('.hero-card,.chapter-art-card,.page-art'),jr=D.getElementById('journey'),lis=jr?$('li',jr):[],jt=D.getElementById('jt');
const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight;S=Array.from({length:Math.min(260,W/5|0)},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*.9+.1}))};rs();addEventListener('resize',rs);
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;glow.style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
function frame(){
 cancelAnimationFrame(raf);v+=((scrollY-ly)-v)*.15;ly=scrollY;cx.clearRect(0,0,W,H);cx.lineCap='round';
 const t=performance.now()/1000;
 for(const s of S){const y=((s.y-scrollY*s.z*.25+t*s.z*6)%H+H)%H,x=s.x-mx*s.z*40;
  cx.strokeStyle=`rgba(200,220,255,${.25+s.z*.7})`;cx.lineWidth=s.z*1.7;cx.beginPath();cx.moveTo(x,y);cx.lineTo(x,y+v*s.z*3+.01);cx.stroke()}
 sp.style.transform=`scaleX(${scrollY/Math.max(1,R.scrollHeight-innerHeight)})`;
 P.forEach(p=>{p.style.setProperty('--mx',mx);p.style.setProperty('--my',my);p.style.setProperty('--sy',scrollY)});
 if(jr){const r=jr.getBoundingClientRect(),p=Math.max(0,Math.min(1,(72-r.top)/(r.height-innerHeight+72)));jr.style.setProperty('--p',p);const i=Math.min(4,p*5|0);
  if(i!==ji){ji=i;lis.forEach((l,k)=>{l.classList.toggle('lit',k<i);l.classList.toggle('now',k===i)});jt.textContent=JR[i][1]}}
 if(!rm&&!D.hidden)raf=requestAnimationFrame(frame);
}
frame();if(rm)addEventListener('scroll',frame,{passive:true});
D.addEventListener('visibilitychange',()=>{if(!D.hidden&&!rm)frame()});
})();
