const state = {
  all: [], rows: [], search: '', category: 'all', checked: 'all',
  sort: { key: 'id', dir: 'asc' }, page: 1, pageSize: 12, lang: localStorage.getItem('nvatlas-lang') || 'en'
};

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const copy = {
  en: {
    navExplore:'Explore',navReport:'Learning report',navMethod:'Method & codebook',navCodebook:'Codebook',navAI:'AI use',
    projectTag:'2026R1 Translation Technology',heroTitleA:'When nouns',heroTitleB:'become verbs.',heroText:'A 500-entry corpus exploring how English nominal vocabulary is rendered as action in Chinese subtitles.',startExploring:'Explore the corpus',readReport:'Read the report',
    researchQuestion:'Research question',questionText:'Which nominal forms are most often realised as Chinese verbs, and how much variation lies beneath those choices?',entries:'entries',terms:'terms',renderings:'renderings',
    corpusExplorer:'Corpus explorer',searchAndSee:'Search the evidence. See the pattern.',explorerIntro:'Every view below responds to the same search and category filters. Select any term or row to inspect its sentence pair.',search:'Search',searchPlaceholder:'Search English, Chinese, or key term…',category:'Category',allCategories:'All categories',catAction:'Action nominalisation',catResult:'Result nominalisation',catState:'State / quality nominalisation',verification:'Verification',allEntries:'All entries',checkedYes:'Human checked',checkedNo:'Awaiting check',reset:'Reset',entriesFound:'entries in view',
    networkLabel:'01 · Relational',networkTitle:'Term → verbal rendering network',networkDesc:'English nominals radiate toward their Chinese verbal renderings. Thicker links mean repeated pairs.',networkTip:'Click a node to filter the corpus.',hierarchyLabel:'02 · Hierarchical',treeTitle:'Nominalisation profile',treeTip:'Area = number of entries. Click to filter.',distributionLabel:'03 · Distributional',heatTitle:'Term frequency × category',heatTip:'Darker cells hold more entries. Click to inspect.',tableLabel:'04 · Tabular',tableTitle:'Sentence pairs',exportCsv:'Export CSV',thTerm:'Key term',thRendering:'Chinese rendering',thSource:'English source',thCategory:'Category',thChecked:'Checked',
    takeaways:'What the corpus suggests',takeawaysTitle:'The pattern is not just grammatical.',fullAnalysis:'Read the full analysis',takeaway1Title:'Action dominates the derivational field.',takeaway1Text:'Words ending in -tion or -sion make up the largest share, reflecting the corpus’s selection of deverbal abstract nouns.',takeaway2Title:'One noun rarely means one verb.',takeaway2Text:'Ninety-one English terms have more than one Chinese rendering, showing that word-level equivalence hides contextual choice.',takeaway3Title:'Provenance remains the limit.',takeaway3Text:'The supplied CSV lacks a documented sampling seed, so this prototype reports the gap instead of inventing methodological certainty.',footerText:'A student-built translation and linguistics corpus explorer.',
    action:'Action',result:'Result',state:'State',yes:'Yes',no:'No',page:'Page',of:'of',noResults:'No entries match these filters.',filteredBy:'Filtered by',clear:'Clear',term:'Key term',rendering:'Chinese verb',source:'Source',sourceText:'English sentence',targetText:'Chinese subtitle',categoryLabel:'Category',checkedLabel:'Human checked',unit:'Unit',notes:'Annotation note',all:'All',networkMost:'Showing up to 30 strongest links.',networkEmpty:'No links in this view.'
  },
  zh: {
    navExplore:'探索語料',navReport:'學習報告',navMethod:'方法與編碼簿',navCodebook:'編碼簿',navAI:'AI 使用聲明',
    projectTag:'2026R1 人工智能時代的翻譯科技',heroTitleA:'當名詞',heroTitleB:'化作動詞。',heroText:'一個包含 500 條紀錄的語料庫，探索英語名詞詞彙如何在中文字幕中被呈現為動作。',startExploring:'探索語料庫',readReport:'閱讀報告',
    researchQuestion:'研究問題',questionText:'哪些名詞形式最常被譯為中文動詞？在這些選擇背後，又存在多少變化？',entries:'條紀錄',terms:'個詞項',renderings:'種譯法',
    corpusExplorer:'語料庫探索器',searchAndSee:'搜尋證據，看見規律。',explorerIntro:'以下每個視圖都會跟隨同一組搜尋與分類篩選。點擊詞項或表格列，即可查看句子配對。',search:'搜尋',searchPlaceholder:'搜尋英文、中文或關鍵詞…',category:'分類',allCategories:'全部分類',catAction:'動作名詞化',catResult:'結果名詞化',catState:'狀態／性質名詞化',verification:'人工核查',allEntries:'全部紀錄',checkedYes:'已人工核查',checkedNo:'待核查',reset:'重設',entriesFound:'條符合紀錄',
    networkLabel:'01 · 關係',networkTitle:'詞項 → 動詞譯法網絡',networkDesc:'英語名詞連向其漢語動詞譯法。連線越粗，代表同一配對重複越多。',networkTip:'點擊節點以篩選語料。',hierarchyLabel:'02 · 層級',treeTitle:'名詞化類型分佈',treeTip:'面積代表紀錄數量。點擊可篩選。',distributionLabel:'03 · 分佈',heatTitle:'詞頻 × 分類',heatTip:'顏色越深，紀錄越多。點擊可查看。',tableLabel:'04 · 表格',tableTitle:'句子配對',exportCsv:'匯出 CSV',thTerm:'關鍵詞',thRendering:'中文譯法',thSource:'英文原句',thCategory:'分類',thChecked:'核查',
    takeaways:'語料顯示甚麼',takeawaysTitle:'這不只是語法現象。',fullAnalysis:'閱讀完整分析',takeaway1Title:'動作類主導派生詞場。',takeaway1Text:'以 -tion 或 -sion 結尾的詞佔最大比例，反映語料集中收錄由動詞派生的抽象名詞。',takeaway2Title:'一個名詞往往不止一個動詞。',takeaway2Text:'91 個英語詞項有多於一種中文譯法，說明詞級對等掩蓋了語境中的選擇。',takeaway3Title:'來源仍是主要限制。',takeaway3Text:'提供的 CSV 沒有記錄抽樣種子，因此本原型如實報告這個缺口，而不虛構方法上的確定性。',footerText:'學生製作的翻譯與語言學語料庫探索器。',
    action:'動作',result:'結果',state:'狀態',yes:'是',no:'否',page:'第',of:'／',noResults:'沒有紀錄符合此篩選。',filteredBy:'篩選：',clear:'清除',term:'關鍵詞',rendering:'中文動詞',source:'來源',sourceText:'英文原句',targetText:'中文字幕',categoryLabel:'分類',checkedLabel:'人工核查',unit:'單位',notes:'標註說明',all:'全部',networkMost:'顯示最多 30 條最強連結。',networkEmpty:'此視圖沒有連結。'
  }
};
const catName = c => copy[state.lang][c] || c;
const t = k => copy[state.lang][k] || k;

async function init(){
  if (!document.querySelector('#explore')) return;
  try {
    const response = await fetch('data/corpus.json');
    if (!response.ok) throw new Error(`Could not load corpus (${response.status})`);
    state.all = await response.json();
    state.rows = [...state.all];
    applyLang();
    bindEvents();
    update();
  } catch (err) {
    $('#resultCount').textContent = '0';
    $('#tableBody').innerHTML = `<tr><td colspan="5" class="td">${esc(err.message)}</td></tr>`;
  }
}

function applyLang(){
  state.lang = localStorage.getItem('nvatlas-lang') || 'en';
  document.documentElement.lang = state.lang === 'zh' ? 'zh-Hant' : 'en';
  document.body.classList.toggle('zh', state.lang === 'zh');
  $$('[data-i18n]').forEach(el => { const v = copy[state.lang][el.dataset.i18n]; if (v) el.textContent = v; });
  $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = copy[state.lang][el.dataset.i18nPlaceholder]; });
  $$('.lang-switch button').forEach(b => b.classList.toggle('active', b.dataset.lang === state.lang));
  const search = $('#search'); if (search) search.placeholder = t('searchPlaceholder');
  if (state.all.length) update();
}

function normalize(s){ return String(s || '').toLocaleLowerCase().normalize('NFKC'); }
function filtered(){
  const q = normalize(state.search);
  return state.all.filter(r => {
    const matchesSearch = !q || normalize([r.source_text,r.target_text,r.key_term,r.target_key_term,r.id].join(' ')).includes(q);
    return matchesSearch && (state.category === 'all' || r.category === state.category) && (state.checked === 'all' || r.human_checked === state.checked);
  });
}
function update(){
  state.rows = filtered();
  state.page = Math.min(state.page, Math.max(1, Math.ceil(state.rows.length / state.pageSize)));
  $('#resultCount').textContent = state.rows.length;
  const parts = [];
  if (state.search) parts.push(`“${state.search}”`);
  if (state.category !== 'all') parts.push(catName(state.category));
  if (state.checked !== 'all') parts.push(t(state.checked === 'yes' ? 'checkedYes' : 'checkedNo'));
  $('#activeFilters').textContent = parts.length ? `${t('filteredBy')} ${parts.join(' · ')}` : '';
  renderNetwork(); renderTreemap(); renderHeat(); renderTable();
}
function bindEvents(){
  $('#search').addEventListener('input', e => { state.search = e.target.value; state.page = 1; update(); });
  $('#category').addEventListener('change', e => { state.category = e.target.value; state.page = 1; update(); });
  $('#checked').addEventListener('change', e => { state.checked = e.target.value; state.page = 1; update(); });
  $('#reset').addEventListener('click', () => {
    state.search=''; state.category='all'; state.checked='all'; state.page=1; state.sort={key:'id',dir:'asc'};
    $('#search').value=''; $('#category').value='all'; $('#checked').value='all'; update();
  });
  $$('.sort').forEach(btn => btn.addEventListener('click', () => {
    if (state.sort.key === btn.dataset.sort) state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
    else state.sort = { key:btn.dataset.sort, dir:'asc' };
    state.page=1; renderTable();
  }));
  $('#prevPage').addEventListener('click', () => { if(state.page>1){state.page--;renderTable();} });
  $('#nextPage').addEventListener('click', () => { if(state.page<Math.ceil(state.rows.length/state.pageSize)){state.page++;renderTable();} });
  $('#export').addEventListener('click', exportCsv);
  $$('.lang-switch button').forEach(b => b.addEventListener('click', () => { localStorage.setItem('nvatlas-lang', b.dataset.lang); applyLang(); }));
  $$('[data-close]').forEach(el => el.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', e => { if(e.key==='Escape') closeDrawer(); });
}
function openEntry(id){
  const r = state.all.find(x => x.id === Number(id)); if(!r) return;
  $('#drawerId').textContent = `#${r.id} · ${catName(r.category)}`;
  $('#drawerTitle').textContent = r.key_term;
  $('#drawerBody').innerHTML = `<p class="target">${esc(r.target_key_term)}</p>
    <dl><dt>${t('sourceText')}</dt><dd>${esc(r.source_text)}</dd>
    <dt>${t('targetText')}</dt><dd>${esc(r.target_text)}</dd>
    <dt>${t('categoryLabel')}</dt><dd>${esc(catName(r.category))}</dd>
    <dt>${t('checkedLabel')}</dt><dd>${esc(t(r.human_checked === 'yes' ? 'yes' : 'no'))}</dd>
    <dt>${t('source')}</dt><dd>${esc(r.source)}</dd>
    <dt>${t('unit')}</dt><dd>${esc(r.unit)}</dd>
    <dt>${t('notes')}</dt><dd>${esc(r.notes)}</dd></dl>`;
  $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden','false');
  $('#drawer .drawer-close').focus();
}
function closeDrawer(){ const d=$('#drawer'); if(d){d.classList.remove('open');d.setAttribute('aria-hidden','true');} }

const catColors = {action:'#1c5b45',result:'#c18c35',state:'#765c7d'};
function renderNetwork(){
  const box = $('#network'); if(!box) return;
  const pairs = new Map(), termCount = new Map(), transCount = new Map();
  state.rows.forEach(r => {
    const k = `${r.key_term}\u0000${r.target_key_term}`;
    pairs.set(k,(pairs.get(k)||0)+1);
    termCount.set(r.key_term,(termCount.get(r.key_term)||0)+1);
    transCount.set(r.target_key_term,(transCount.get(r.target_key_term)||0)+1);
  });
  const links = [...pairs].map(([k,w]) => { const [source,target]=k.split('\u0000'); return {source,target,w}; }).sort((a,b)=>b.w-a.w).slice(0,30);
  if(!links.length){ box.innerHTML = `<p class="viz-help">${t('networkEmpty')}</p>`; $('#networkMeta').textContent=''; return; }
  const terms = [...new Set(links.map(l=>l.source))], trans = [...new Set(links.map(l=>l.target))];
  const width=1000, height=420, cx=width/2, cy=height/2;
  const maxW=Math.max(...links.map(l=>l.w));
  const termPos = new Map(), transPos = new Map();
  terms.forEach((d,i)=>{ const a=-Math.PI/2 + i*2*Math.PI/terms.length; termPos.set(d,[cx+Math.cos(a)*125,cy+Math.sin(a)*125]); });
  trans.forEach((d,i)=>{ const a=-Math.PI/2 + i*2*Math.PI/trans.length; transPos.set(d,[cx+Math.cos(a)*185,cy+Math.sin(a)*185]); });
  let svg=`<svg viewBox="0 0 ${width} ${height}" role="img"><g>`;
  links.forEach(l=>{let [x1,y1]=termPos.get(l.source),[x2,y2]=transPos.get(l.target);svg+=`<line class="link" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="${1+4*l.w/maxW}"/>`;});
  terms.forEach(d=>{const [x,y]=termPos.get(d);svg+=`<g class="network-node term" data-term="${esc(d)}" transform="translate(${x},${y})"><circle r="5" fill="#1c5b45"/><text class="term-label" x="0" y="-10" text-anchor="middle">${esc(d.length>22?d.slice(0,20)+'…':d)}</text></g>`;});
  trans.forEach(d=>{const [x,y]=transPos.get(d);svg+=`<g class="network-node" data-term="${esc(d)}" transform="translate(${x},${y})"><circle r="4" fill="#d6a74f"/><text x="0" y="17" text-anchor="middle">${esc(d)}</text></g>`;});
  box.innerHTML=svg+'</g></svg>'; $('#networkMeta').textContent = t('networkMost');
  $$('.network-node',box).forEach(n=>n.addEventListener('click',()=>{state.search=n.dataset.term;state.page=1;$('#search').value=n.dataset.term;update();}));
}
function renderTreemap(){
  const box=$('#treemap'); if(!box)return;
  const groups = ['action','result','state'].map(c=>({category:c,count:state.rows.filter(r=>r.category===c).length})).filter(x=>x.count);
  if(!groups.length){box.innerHTML=`<p class="viz-help">${t('noResults')}</p>`;return;}
  const total=groups.reduce((s,g)=>s+g.count,0), W=540,H=280; let x=0;
  box.innerHTML=`<svg class="treemap" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${groups.map(g=>{const w=W*g.count/total; const cell=`<g class="treemap-cell" data-category="${g.category}"><rect x="${x}" y="0" width="${w-2}" height="${H}" fill="${catColors[g.category]}"/><text class="count" x="${x+14}" y="42">${g.count}</text><text class="big" x="${x+14}" y="${H-47}">${esc(catName(g.category))}</text><text class="small" x="${x+14}" y="${H-25}">${Math.round(g.count/total*100)}%</text></g>`;x+=w;return cell;}).join('')}</svg>`;
  $$('.treemap-cell',box).forEach(n=>n.addEventListener('click',()=>{state.category=n.dataset.category;$('#category').value=state.category;state.page=1;update();}));
}
function renderHeat(){
  const box=$('#heatmap'); if(!box)return;
  const counts=new Map();
  state.rows.forEach(r=>counts.set(r.key_term,(counts.get(r.key_term)||0)+1));
  const top=[...counts].sort((a,b)=>b[1]-a[1]).slice(0,9);
  if(!top.length){box.innerHTML=`<p class="viz-help">${t('noResults')}</p>`;return;}
  const cats=['action','result','state'], max=Math.max(1,...top.map(x=>x[1]));
  let html=`<div class="heat-grid"><div></div>${cats.map(c=>`<div class="heat-head">${esc(catName(c))}</div>`).join('')}`;
  top.forEach(([term,total])=>{
    html+=`<div class="heat-label" title="${esc(term)}">${esc(term)}</div>`;
    cats.forEach(c=>{const n=state.rows.filter(r=>r.key_term===term&&r.category===c).length;const opacity=n?0.18+0.8*n/max:0;html+=`<button class="heat-cell" data-term="${esc(term)}" data-category="${c}" style="background:${n?`rgba(28,91,69,${opacity})`:'#f1f1ec'};color:${n&&opacity>.55?'#fff':'#52635b'}">${n||'·'}</button>`;});
    html+='</div>';
  });
  html+=`</div><div class="heat-legend"><span>0</span><span class="heat-gradient"></span><span>${max}</span><span>entries</span></div>`;
  box.innerHTML=html;
  $$('.heat-cell',box).forEach(b=>b.addEventListener('click',()=>{if(b.textContent==='·')return;state.search=b.dataset.term;state.category=b.dataset.category;$('#search').value=state.search;$('#category').value=state.category;state.page=1;update();}));
}
function renderTable(){
  const body=$('#tableBody'); if(!body)return;
  const rows=[...state.rows].sort((a,b)=>{let av=a[state.sort.key],bv=b[state.sort.key];av=typeof av==='number'?av:normalize(av);bv=typeof bv==='number'?bv:normalize(bv);return (av>bv?1:av<bv?-1:0)*(state.sort.dir==='asc'?1:-1);});
  const pages=Math.max(1,Math.ceil(rows.length/state.pageSize)), start=(state.page-1)*state.pageSize, view=rows.slice(start,start+state.pageSize);
  body.innerHTML=view.length?view.map(r=>`<tr><td class="td"><button class="term-cell" data-id="${r.id}">${esc(r.key_term)}</button></td><td class="td zh-cell">${esc(r.target_key_term)}</td><td class="td source-cell">${esc(r.source_text)}</td><td class="td"><span class="pill ${r.category}">${esc(catName(r.category))}</span></td><td class="td"><span class="pill ${r.human_checked==='no'?'no':''}">${esc(t(r.human_checked==='yes'?'yes':'no'))}</span></td></tr>`).join(''):`<tr><td colspan="5" class="td">${t('noResults')}</td></tr>`;
  $$('.term-cell',body).forEach(b=>b.addEventListener('click',()=>openEntry(b.dataset.id)));
  $('#pageInfo').textContent=`${t('page')} ${state.page} ${t('of')} ${pages} · ${rows.length}`;
  $('#prevPage').disabled=state.page<=1;$('#nextPage').disabled=state.page>=pages;
}
function exportCsv(){
  const fields=['id','source_text','target_text','source','category','human_checked','unit','key_term','target_key_term','english_nominal','chinese_verb','notes'];
  const quote=v=>`"${String(v??'').replaceAll('"','""')}"`;
  const csv=[fields.join(','),...state.rows.map(r=>fields.map(f=>quote(r[f])).join(','))].join('\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}));a.download='nvatlas-filtered.csv';a.click();URL.revokeObjectURL(a.href);
}
init();
