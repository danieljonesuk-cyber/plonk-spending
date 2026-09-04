(async()=>{
const compressed=window.__SOC_V61_PAYLOAD||'';
if(!compressed||typeof DecompressionStream==='undefined')throw new Error('This preview needs a current browser with gzip stream support.');
const bytes=Uint8Array.from(atob(compressed),character=>character.charCodeAt(0));
const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
const payload=JSON.parse(await new Response(stream).text());
const style=document.createElement('style');
style.id='soc-v61-rendered-css';
style.textContent=payload.css;
document.head.append(style);
function normalize(value){let route=value||'/';if(!route.startsWith('/'))route='/'+route;if(route.length>1)route=route.replace(/\/$/,'');return route;}
function routeFromHash(){return location.hash.startsWith('#!')?normalize(decodeURIComponent(location.hash.slice(2))):'/';}
function buildMenu(){
  const existing=document.querySelector('[data-soc-static-menu]');
  if(existing){existing.remove();return;}
  const links=[...document.querySelectorAll('nav[aria-label="Primary"] a,nav[aria-label="Reader actions"] a')];
  const layer=document.createElement('div');layer.dataset.socStaticMenu='true';layer.style.cssText='position:fixed;inset:0;z-index:10000;background:rgba(17,17,17,.68);display:flex;justify-content:flex-end';
  const panel=document.createElement('div');panel.style.cssText='background:#fbfaf6;color:#111;width:min(440px,calc(100% - 24px));height:100%;overflow:auto;padding:24px 30px;box-shadow:-20px 0 60px rgba(0,0,0,.25)';
  const close=document.createElement('button');close.type='button';close.textContent='Close ×';close.style.cssText='border:1px solid #111;background:#fbfaf6;padding:12px 14px;font-weight:800;float:right';close.onclick=()=>layer.remove();panel.append(close);
  const heading=document.createElement('h2');heading.textContent='Explore South of Chambers';heading.style.cssText='clear:both;padding-top:34px;font-family:Arial Narrow,Arial,sans-serif;font-size:2rem';panel.append(heading);
  const nav=document.createElement('nav');
  for(const original of links){const link=original.cloneNode(true);link.style.cssText='display:block;border-top:1px solid #bdb7ac;padding:14px 0;font-size:1.2rem;font-weight:800;text-decoration:none';link.onclick=()=>layer.remove();nav.append(link);}
  panel.append(nav);layer.append(panel);layer.addEventListener('click',event=>{if(event.target===layer)layer.remove();});document.body.append(layer);
}
function render(route,{scroll=true}={}){
  const normalized=normalize(route);const page=payload.pages[normalized]||payload.pages['/'];
  document.title=page.title;document.body.className=page.bodyClass||'';document.body.innerHTML=page.bodyHtml;
  document.querySelectorAll('button[aria-controls="site-menu"]').forEach(button=>button.addEventListener('click',buildMenu));
  if(scroll)scrollTo({top:0,left:0,behavior:'instant'});
}
document.addEventListener('click',event=>{
  const anchor=event.target.closest?.('a[href]');if(!anchor)return;
  const href=anchor.getAttribute('href')||'';
  if(href.startsWith('#!'))return;
  if(href.startsWith('#')&&href.length>1){const target=document.getElementById(href.slice(1));if(target){event.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}}
});
document.addEventListener('submit',event=>{
  const form=event.target.closest?.('form[data-static-route]');if(!form)return;event.preventDefault();location.hash='!'+form.dataset.staticRoute;
});
addEventListener('hashchange',()=>render(routeFromHash()));
render(routeFromHash());
})().catch(error=>{console.error(error);document.body.innerHTML='<main class="soc-loading"><strong>Preview error</strong><h1>South of Chambers</h1><p>The rendered V61 inspection copy could not be loaded. Refresh in a current version of Safari, Chrome, Edge or Firefox.</p></main>';});
