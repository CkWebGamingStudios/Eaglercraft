function nav(active){
  return `<div class="nav">
    <a ${active==='home'?'class="active"':''} href="index.html">Home</a>
    <a ${active==='play'?'class="active"':''} href="pages/play.html">Play</a>
    <a ${active==='install'?'class="active"':''} href="pages/installations.html">Installations</a>
    <a ${active==='skins'?'class="active"':''} href="pages/skins.html">Skins</a>
    <a ${active==='tools'?'class="active"':''} href="pages/tools.html">Tools</a>
  </div>`;
}
function card(title,sub,buttons){
  const el=document.createElement('div'); el.className='card';
  el.innerHTML=`<h3>${title}</h3><div class='muted'>${sub||''}</div>`;
  const row=document.createElement('div'); row.className='row'; buttons.forEach(b=>row.appendChild(b)); el.appendChild(row); return el;
}
function btn(t,fn,cls='ghost'){const b=document.createElement('button');b.className=cls;b.textContent=t;b.onclick=fn;return b;}
