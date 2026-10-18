const dubai=[
 {id:1,t:"Apartment in Nakhlat Jumeira",p:141,r:"5.0"},
 {id:2,t:"Apartment in Dubai",p:101,r:"5.0"},
 {id:3,t:"Condo in Marsa Dubai",p:275,r:"4.95",fav:1},
 {id:4,t:"Apartment in Downtown Dubai",p:547,r:"4.85",fav:1},
 {id:5,t:"Apartment in Marsa Dubai",p:985,r:"4.85"},
 {id:6,t:"Villa in Palm Jumeirah",p:1450,r:"4.9"}];
const hotels=[
 {id:7,t:"Hotel in Rome",p:210,r:"4.8"},{id:8,t:"Hotel in Milan",p:320,r:"4.7"},
 {id:9,t:"Hotel in Florence",p:260,r:"4.9"},{id:10,t:"Hotel in Venice",p:410,r:"4.8"},
 {id:11,t:"Hotel in Naples",p:180,r:"4.6"}];
const img=(id,w=600,h=570)=>`https://picsum.photos/seed/airbnb${id}/${w}/${h}`;
function card(x){
 return `<a class="card" href="listing.html?id=${x.id}">
 <div class="img"><img loading="lazy" src="${img(x.id)}" alt="${x.t}">
 ${x.fav?'<span class="badge">Guest favorite</span>':''}
 <button class="heart" aria-label="save">♥</button></div>
 <h3>${x.t}</h3><p>JD ${x.p} for 2 nights · ★ ${x.r}</p></a>`}
function fill(id,list){const el=document.getElementById(id);if(el)el.innerHTML=list.map(card).join("")}
fill("dubai",dubai);fill("hotels",hotels);
document.addEventListener("click",e=>{
 if(e.target.classList.contains("heart")){e.preventDefault();e.target.classList.toggle("on")}
 const a=e.target.closest("[data-scroll]");
 if(a){const row=document.getElementById(a.dataset.row);row.scrollBy({left:+a.dataset.scroll*row.clientWidth*.8})}
});
// listing page
const q=new URLSearchParams(location.search).get("id");
if(document.getElementById("l-title")){
 const x=[...dubai,...hotels].find(i=>i.id==q)||dubai[0];
 document.title=x.t+" - Airbnb";
 document.getElementById("l-title").textContent=x.t;
 document.getElementById("l-rate").textContent="★ "+x.r;
 document.getElementById("l-price").textContent="JD "+Math.round(x.p/2);
 document.querySelectorAll(".gallery img").forEach((im,i)=>im.src=img(x.id*10+i,800,600));
 const upd=()=>{const a=new Date(ci.value),b=new Date(co.value);
  const n=Math.max(1,Math.round((b-a)/864e5))||2;
  document.getElementById("l-total").textContent="JD "+Math.round(x.p/2)*n;
  document.getElementById("l-nights").textContent=n+" nights"};
 const ci=document.getElementById("ci"),co=document.getElementById("co");
 ci.addEventListener("change",upd);co.addEventListener("change",upd);upd();
 document.querySelector(".reserve").onclick=()=>alert("Reservation demo only 🙂");
}
