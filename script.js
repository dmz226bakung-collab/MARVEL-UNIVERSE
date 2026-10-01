const data = {
  ironman: {name:"IRON MAN", type:"AVENGER", real:"Tony Stark", cls:"ironman", desc:"Jenius, miliarder, playboy, filantropis. Tony Stark menggunakan kecerdasannya untuk menciptakan armor berteknologi tinggi dan menjadi salah satu anggota utama Avengers.", tags:["TECHNOLOGY","AVENGER","GENIUS"]},
  cap: {name:"CAPTAIN AMERICA", type:"AVENGER", real:"Steve Rogers", cls:"cap", desc:"Steve Rogers adalah seorang prajurit yang menjadi simbol keberanian dan kepemimpinan. Setelah menerima serum Super-Soldier, ia menjadi Captain America.", tags:["SUPER SOLDIER","AVENGER","LEADER"]},
  thor: {name:"THOR", type:"GOD OF THUNDER", real:"Thor Odinson", cls:"thor", desc:"Pangeran Asgard yang memiliki kekuatan luar biasa dan kemampuan mengendalikan petir. Thor adalah salah satu anggota terkuat Avengers.", tags:["ASGARD","GOD","AVENGER"]},
  panther: {name:"BLACK PANTHER", type:"WAKANDA", real:"T'Challa", cls:"panther", desc:"Raja Wakanda dan pelindung negaranya. Dengan kekuatan Heart-Shaped Herb dan teknologi vibranium, T'Challa menjadi Black Panther.", tags:["WAKANDA","VIBRANIUM","KING"]},
  spiderman: {name:"SPIDER-MAN", type:"WEB-SLINGER", real:"Peter Parker", cls:"spiderman", desc:"Seorang remaja dari Queens yang mendapatkan kekuatan super setelah digigit laba-laba. Peter berusaha menyeimbangkan kehidupan sehari-hari dengan tanggung jawab sebagai pahlawan.", tags:["SPIDER-SENSE","NEW YORK","HERO"]},
  marvel: {name:"CAPTAIN MARVEL", type:"COSMIC HERO", real:"Carol Danvers", cls:"marvel", desc:"Carol Danvers memperoleh kekuatan luar biasa setelah sebuah kecelakaan yang melibatkan energi Tesseract. Ia kemudian menjadi salah satu pahlawan terkuat di galaksi.", tags:["COSMIC","FLIGHT","AVENGER"]}
};

const nav = document.getElementById("navMenu");
document.getElementById("menuToggle").addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const cards=[...document.querySelectorAll(".character-card")];
const filters=[...document.querySelectorAll(".filter")];
const search=document.getElementById("searchInput");
const empty=document.getElementById("emptyState");

function applyFilters(){
  const term=search.value.toLowerCase().trim();
  const active=document.querySelector(".filter.active").dataset.filter;
  let count=0;
  cards.forEach(card=>{
    const okCat=active==="all" || card.dataset.category.includes(active);
    const okName=card.dataset.name.includes(term);
    card.style.display=okCat && okName ? "" : "none";
    if(okCat && okName) count++;
  });
  empty.classList.toggle("show",count===0);
}
filters.forEach(btn=>btn.addEventListener("click",()=>{
  filters.forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  applyFilters();
}));
search.addEventListener("input",applyFilters);

const modal=document.getElementById("modal");
const modalVisual=document.getElementById("modalVisual");
function openModal(key){
  const x=data[key]; if(!x)return;
  modalVisual.className="modal-visual "+x.cls;
  modalVisual.innerHTML='<div class="symbol">'+(x.cls==="ironman"?"I":x.cls==="cap"?"★":x.cls==="thor"?"⚡":x.cls==="panther"?"♛":"✦")+'</div>';
  document.getElementById("modalType").textContent=x.type;
  document.getElementById("modalName").textContent=x.name;
  document.getElementById("modalReal").textContent=x.real;
  document.getElementById("modalDesc").textContent=x.desc;
  document.getElementById("modalTags").innerHTML=x.tags.map(t=>`<span>${t}</span>`).join("");
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.classList.add("modal-open");
}
document.querySelectorAll(".more").forEach(btn=>btn.addEventListener("click",()=>openModal(btn.dataset.character)));
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open")}
document.getElementById("modalClose").addEventListener("click",closeModal);
document.getElementById("modalBackdrop").addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll("nav a")];
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>observer.observe(s));
