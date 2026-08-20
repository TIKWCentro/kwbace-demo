const capabilities=[
{n:"01",title:"Pintura y acabado",sub:"Imagen renovada",copy:"Cabina especializada, igualación de color y acabados para devolver presencia a tu unidad.",img:"https://youngstownkenworth.com/content/uploads/2021/09/body-shop.jpg",tags:["Cambio de color","Pintura de chasis","Franjeado","Acabado profesional"]},
{n:"02",title:"Geometría y chasis",sub:"Precisión estructural",copy:"Medición y enderezado especializado para recuperar alineación, geometría y estabilidad.",img:"https://truckservice.info.pl/wp-content/uploads/2021/06/prostowanie-ram-truck-service-13.jpg",tags:["Banco JOSAM","Medición láser","Ejes y chasis","Calor controlado"]},
{n:"03",title:"Atención a siniestros",sub:"Un proceso, un responsable",copy:"Acompañamos la valoración, presupuesto, reparación y seguimiento con tu aseguradora.",img:"https://www.tlgtrucks.com/Portals/0/adam/Hero/xBE10JZuTkWp2H2daXbl2w/Image/TLG_Semi-Truck-Body-Shop-Hero.jpg?mode=crop&w=1920",tags:["Avalúo","Documentación","Refacciones","Seguimiento"]}];
const damages=[
{name:"Daño estético",icon:"◒",route:"Carrocería y pintura",detail:"Golpes, rayones, piezas exteriores o renovación de imagen."},
{name:"Daño estructural",icon:"◇",route:"Medición y enderezado",detail:"Chasis, ejes, geometría o afectación por impacto."},
{name:"Siniestro",icon:"△",route:"Gestión integral",detail:"Atención con aseguradora y reparación completa."},
{name:"Cambio de imagen",icon:"✦",route:"Proyecto de pintura",detail:"Cambio de color, franjeado o acabado de flotilla."}];
let activeCapability=0,damage=0,step=1,sent=false;
const $=s=>document.querySelector(s);
function renderCapability(){
 const c=capabilities[activeCapability];
 $("#capNav").innerHTML=capabilities.map((x,i)=>`<button class="${i===activeCapability?"active":""}" data-cap="${i}"><span>${x.n}</span><b>${x.title}</b><i>↗</i></button>`).join("");
 $("#capImage").src=c.img;$("#capImage").alt=c.title;$("#capIndex").textContent=c.n+" / 03";$("#capSub").textContent=c.sub;$("#capTitle").textContent=c.title;$("#capCopy").textContent=c.copy;
 $("#capTags").innerHTML=c.tags.map(x=>`<span>✓ ${x}</span>`).join("");
 document.querySelectorAll("[data-cap]").forEach(b=>b.onclick=()=>{activeCapability=Number(b.dataset.cap);renderCapability()});
}
function choices(){return `<div class="choices">${damages.map((x,i)=>`<button class="${i===damage?"active":""}" data-damage="${i}"><i>${x.icon}</i><span>0${i+1}</span><b>${x.name}</b><p>${x.detail}</p><small>Ruta: ${x.route}</small></button>`).join("")}</div>`}
function unitForm(){return `<div class="formGrid"><label>Marca<select><option>Kenworth</option><option>DAF</option><option>Otra marca</option></select></label><label>Modelo<input placeholder="Ej. T680"></label><label>Año<input type="number" placeholder="2022"></label><label>Ubicación<select><option>León / Comanjilla</option><option>Aguascalientes</option><option>Querétaro</option></select></label><label class="full">Descripción<textarea placeholder="Cuéntanos qué ocurrió"></textarea></label></div>`}
function contactForm(){const d=damages[damage];return `<div class="formGrid"><div class="route"><small>RUTA SELECCIONADA</small><b>${d.route}</b><p>${d.name}</p></div><label>Nombre<input placeholder="Tu nombre completo"></label><label>WhatsApp<input type="tel" placeholder="477 000 0000"></label><label>Empresa<input placeholder="Nombre de tu empresa"></label><label>Correo<input type="email" placeholder="correo@empresa.com"></label></div>`}
function renderWizard(){
 $("#stepCount").textContent=`PASO ${step} DE 3`;$("#stepBar").style.width=(step*33.33)+"%";$("#stepName").textContent=["TIPO DE DAÑO","DATOS DE LA UNIDAD","CONTACTO"][step-1];
 $("#wizardContent").innerHTML=step===1?choices():step===2?unitForm():contactForm();
 $("#backButton").style.visibility=step===1?"hidden":"visible";$("#nextButton").textContent=sent?"Solicitud preparada ✓":step===3?"Solicitar contacto →":"Continuar →";
 document.querySelectorAll("[data-damage]").forEach(b=>b.onclick=()=>{damage=Number(b.dataset.damage);renderWizard()});
}
$("#menuButton").onclick=()=>{const n=$("#mainNav");n.classList.toggle("open");$("#menuButton").textContent=n.classList.contains("open")?"×":"☰"};
document.querySelectorAll("#mainNav a").forEach(a=>a.onclick=()=>$("#mainNav").classList.remove("open"));
$("#backButton").onclick=()=>{if(step>1){step--;sent=false;renderWizard()}};
$("#nextButton").onclick=()=>{if(step<3)step++;else sent=true;renderWizard()};
renderCapability();renderWizard();