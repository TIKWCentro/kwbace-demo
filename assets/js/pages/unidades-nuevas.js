const brandData={kenworth:{heroCopy:"Potencia, eficiencia y respaldo para convertir cada kilómetro en una ventaja para tu negocio.",model:"T680",tagline:"La nueva generación del líder.",use:"Larga distancia",strength:"Eficiencia aerodinámica",link:"#kenworth"},daf:{heroCopy:"Ingeniería europea enfocada en eficiencia, seguridad y una experiencia superior para el conductor.",model:"XG",tagline:"Una nueva dimensión en confort.",use:"Larga distancia",strength:"Aerodinámica y confort",link:"#daf"}};
const models={kenworth:[{name:"T480",label:"Un nuevo modelo de negocio",desc:"Versatilidad y eficiencia para distribución, construcción y aplicaciones regionales.",image:"assets/images/U Kenworth/kw-480.jpg",benefits:["Distribución y construcción","Cabina ergonómica","Visibilidad mejorada","Tecnología TruckTech+"]},{name:"T680",label:"La nueva generación del líder",desc:"Aerodinámica, tecnología y rendimiento para hacer más rentable cada recorrido de larga distancia.",image:"assets/images/U Kenworth/kw-680.jpg",benefits:["Larga distancia","Pantalla digital de 15 pulgadas","Motor PACCAR MX-13","Iluminación LED"]},{name:"T880",label:"Poder y durabilidad",desc:"Un vehículo versátil, confiable y resistente para los trabajos más pesados y exigentes.",image:"assets/images/U Kenworth/kw-880.jpg",benefits:["Aplicación vocacional","Construcción y trabajo pesado","Smart Wheel","Diagnóstico remoto"]},{name:"W990",label:"Presencia, poder y estilo",desc:"Potencia, lujo, artesanía y carácter para quienes hacen de la carretera una declaración personal.",image:"assets/images/U Kenworth/kw-990.jpg",benefits:["Experiencia premium","Estilo tradicional","Acabados superiores","Confort para carretera"]}],daf:[{name:"XB",label:"Agilidad para distribución",desc:"Una solución eficiente y maniobrable para distribución urbana y regional.",image:"assets/images/U DAF/daf-xb.jpg",benefits:["Distribución urbana","Maniobrabilidad","Visibilidad","Eficiencia operativa"]},{name:"XF",label:"Eficiencia para carretera",desc:"Rendimiento, seguridad y confort para operaciones regionales y de larga distancia.",image:"assets/images/U DAF/daf-xf.jpg",benefits:["Carretera","Confort del operador","Seguridad","Rendimiento"]},{name:"XG",label:"Una nueva dimensión",desc:"Máximo espacio, aerodinámica y confort para transformar la experiencia de larga distancia.",image:"assets/images/U DAF/daf-xg.jpg",benefits:["Larga distancia","Cabina de gran amplitud","Aerodinámica","Experiencia premium"]}]};
const operations={carretera:{models:"Kenworth T680 · DAF XG",text:"Dos referentes para recorrer largas distancias con eficiencia, seguridad y confort.",link:"#kenworth"},distribucion:{models:"Kenworth T480 · DAF XB",text:"Agilidad, visibilidad y productividad para ciudad, reparto y recorridos regionales.",link:"#kenworth"},vocacional:{models:"Kenworth T880",text:"Fuerza, durabilidad y versatilidad para construcción y los trabajos más exigentes.",link:"#kenworth"},premium:{models:"Kenworth W990 · DAF XG",text:"Dos formas de vivir la carretera con presencia, confort y una identidad inconfundible.",link:"#kenworth"}};
const specializedUses=[
  {name:"Caja seca",short:"Carga protegida",model:"Kenworth T680 · DAF XF",need:"Traslado de mercancía general con protección y eficiencia en carretera.",route:"Carretera y distribución regional",focus:"Rendimiento · autonomía · maniobrabilidad",image:"assets/images/U Kenworth/kw-680.jpg"},
{
  name: "Revolvedora",
  short: "Concreto",
  model: "Kenworth T880",
  need:
    "Configuración vocacional para operación continua, accesos de obra y cargas exigentes.",
  route: "Construcción y obra",
  focus: "Resistencia · tracción · durabilidad",
  image:
    "assets/images/U Aplicaciones/revolvedora.jpg",
  imageClass: "application-image-revolvedora"
},
{
  name: "Volteo",
  short: "Materiales",
  model: "Kenworth T880",
  need:
    "Fuerza y estabilidad para movimiento de agregados, tierra y materiales a granel.",
  route: "Obra, banco de materiales y minería",
  focus: "Capacidad · resistencia · seguridad",
  image:
    "assets/images/U Aplicaciones/volteo daf.jpg",
  imageClass: "application-image-volteo"
},
  {name:"Tolva",short:"Carga a granel",model:"Kenworth T680 · T880",need:"Una base configurable para transportar granos, minerales y materiales descargados por gravedad.",route:"Carretera, campo e industria",focus:"Torque · rendimiento · configuración",image:"assets/images/U Aplicaciones/tolva.webp"},
  {name:"Tanque",short:"Líquidos",model:"Kenworth T680 · DAF XF",need:"Estabilidad y desempeño para traslado especializado de líquidos en recorridos regionales o de larga distancia.",route:"Energía, alimentos y químicos",focus:"Seguridad · estabilidad · eficiencia",image:"assets/images/U Aplicaciones/tanque daf.jpg"},
];
function setBrand(brand){document.querySelectorAll("[data-brand]").forEach(b=>{const active=b.dataset.brand===brand;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});document.querySelectorAll("[data-bg]").forEach(bg=>bg.classList.toggle("is-active",bg.dataset.bg===brand));const d=brandData[brand];document.querySelector("#heroCopy").textContent=d.heroCopy;document.querySelector("#featuredBrand").textContent=brand.toUpperCase();document.querySelector("#featuredModel").textContent=d.model;document.querySelector("#featuredTagline").textContent=d.tagline;document.querySelector("#featuredUse").textContent=d.use;document.querySelector("#featuredStrength").textContent=d.strength;const link=document.querySelector("#featuredLink");link.href=d.link;link.innerHTML=`Conocer el ${d.model} <span>↗</span>`;document.querySelector("#heroModelsLink").href=d.link}
document.querySelectorAll("[data-brand]").forEach(b=>b.addEventListener("click",()=>setBrand(b.dataset.brand)));
document.querySelectorAll("[data-operation]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-operation]").forEach(x=>x.classList.remove("is-active"));b.classList.add("is-active");const d=operations[b.dataset.operation];document.querySelector("#recommendedModels").textContent=d.models;document.querySelector("#recommendationText").textContent=d.text;document.querySelector("#recommendationLink").href=d.link}));
function renderModelStage(brand,index=0){const data=models[brand][index],tabs=document.querySelector(`#${brand}Tabs`),stage=document.querySelector(`#${brand}Stage`);tabs.innerHTML=models[brand].map((m,i)=>`<button type="button" role="tab" aria-selected="${i===index}" class="${i===index?'is-active':''}" data-model-index="${i}">${m.name}</button>`).join("");stage.innerHTML=`<div class="model-stage-media"><span class="model-index">0${index+1} / ${brand.toUpperCase()}</span><img src="${data.image}" alt="${brand.toUpperCase()} ${data.name}"></div><div class="model-stage-copy"><small>${brand.toUpperCase()} · MODELO</small><h3>${data.name}</h3><h4>${data.label}</h4><p>${data.desc}</p><div class="model-benefits">${data.benefits.map(x=>`<span>✓ ${x}</span>`).join("")}</div><div class="model-stage-actions"><a href="index.html#cotizar">Cotizar este modelo</a><a href="#elige">Comparar aplicación</a></div></div>`;tabs.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>renderModelStage(brand,Number(btn.dataset.modelIndex))))}
renderModelStage("kenworth");renderModelStage("daf");
function renderSpecialized(index=0){const data=specializedUses[index],list=document.querySelector("#specializedList"),stage=document.querySelector("#specializedStage");if(!list||!stage)return;list.innerHTML=specializedUses.map((item,i)=>`<button type="button" role="tab" aria-selected="${i===index}" class="${i===index?'is-active':''}" data-use-index="${i}"><span>0${i+1}</span><div><strong>${item.name}</strong><small>${item.short}</small></div><b>↗</b></button>`).join("");stage.innerHTML=`<div class="use-stage-media"><span>APLICACIÓN 0${index+1}</span><img src="${data.image}" alt="Solución para ${data.name}"></div><div class="use-stage-copy"><small>USO ESPECIALIZADO</small><h3 class="use-title use-title-${data.name.toLowerCase()}">
  ${data.name}
</h3><p>${data.need}</p><div class="use-fit"><div><span>PUNTO DE PARTIDA</span><b>${data.model}</b></div><div><span>OPERACIÓN</span><b>${data.route}</b></div><div><span>PRIORIDADES</span><b>${data.focus}</b></div></div><a href="index.html#cotizar">Configurar esta aplicación →</a></div>`;list.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>renderSpecialized(Number(button.dataset.useIndex))))}
renderSpecialized();
const menu=document.querySelector("#unitsMenuButton"),links=document.querySelector("#unitsNavLinks");if(menu&&links)menu.addEventListener("click",()=>{const open=links.classList.toggle("open");menu.textContent=open?"Cerrar":"Menú";menu.setAttribute("aria-expanded",String(open))});
if(links)links.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{links.classList.remove("open");if(menu){menu.textContent="Menú";menu.setAttribute("aria-expanded","false")}}));
const truckmanStory=document.querySelector("#truckmanStory"),truckmanOpen=document.querySelector("#truckmanStoryButton"),truckmanClose=document.querySelector("#closeTruckmanStory");function toggleTruckmanStory(show){if(!truckmanStory)return;truckmanStory.hidden=!show;document.body.style.overflow=show?"hidden":""}if(truckmanOpen)truckmanOpen.addEventListener("click",()=>toggleTruckmanStory(true));if(truckmanClose)truckmanClose.addEventListener("click",()=>toggleTruckmanStory(false));if(truckmanStory)truckmanStory.addEventListener("click",event=>{if(event.target===truckmanStory)toggleTruckmanStory(false)});document.addEventListener("keydown",event=>{if(event.key==="Escape")toggleTruckmanStory(false)});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle("is-visible",e.isIntersecting)),{threshold:.15});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

/* =========================================================
   COTIZADOR DE UNIDADES
   ========================================================= */

const quoteForm = document.querySelector("#unitsQuoteForm");

if (quoteForm) {
  const quoteSteps = Array.from(
    quoteForm.querySelectorAll("[data-quote-step]")
  );

  const quoteBack = document.querySelector("#quoteBack");
  const quoteNext = document.querySelector("#quoteNext");
  const quoteStepNumber =
    document.querySelector("#quoteStepNumber");
  const quoteStepName =
    document.querySelector("#quoteStepName");
  const quoteProgressBar =
    document.querySelector("#quoteProgressBar");
  const quoteNavigation =
    document.querySelector("#quoteNavigation");
  const quoteSuccess =
    document.querySelector("#quoteSuccess");
  const restartQuote =
    document.querySelector("#restartQuote");

  const quoteBrand = document.querySelector("#quoteBrand");
  const quoteModel = document.querySelector("#quoteModel");

  const quoteStepNames = [
    "DATOS DEL CLIENTE",
    "UNIDAD REQUERIDA",
    "OPERACIÓN",
    "FINANCIAMIENTO"
  ];

  const quoteModels = {
    Kenworth: [
      "T480",
      "T680",
      "T880",
      "W990"
    ],

    DAF: [
      "XB",
      "XF",
      "XG"
    ],

    Recomendación: [
      "Deseo una recomendación"
    ]
  };

  let currentQuoteStep = 1;

  function updateQuoteStep() {
    quoteSteps.forEach((step) => {
      const stepNumber = Number(step.dataset.quoteStep);
      const isCurrent = stepNumber === currentQuoteStep;

      step.hidden = !isCurrent;
      step.classList.toggle("is-active", isCurrent);
    });

    quoteStepNumber.textContent =
      `PASO ${currentQuoteStep} DE ${quoteSteps.length}`;

    quoteStepName.textContent =
      quoteStepNames[currentQuoteStep - 1];

    quoteProgressBar.style.width =
      `${(currentQuoteStep / quoteSteps.length) * 100}%`;

    quoteBack.disabled = currentQuoteStep === 1;

    quoteNext.textContent =
      currentQuoteStep === quoteSteps.length
        ? "Enviar solicitud →"
        : "Continuar →";
  }

  function validateCurrentQuoteStep() {
    const currentStep = quoteForm.querySelector(
      `[data-quote-step="${currentQuoteStep}"]`
    );

    const requiredFields = Array.from(
      currentStep.querySelectorAll("[required]")
    );

    let firstInvalidField = null;

    requiredFields.forEach((field) => {
      field.classList.remove("is-invalid");

      let isValid = field.checkValidity();

      if (field.type === "radio") {
        const selectedRadio =
          currentStep.querySelector(
            `input[name="${field.name}"]:checked`
          );

        isValid = Boolean(selectedRadio);
      }

      if (!isValid) {
        field.classList.add("is-invalid");

        if (!firstInvalidField) {
          firstInvalidField = field;
        }
      }
    });

    if (firstInvalidField) {
      firstInvalidField.focus();

      return false;
    }

    return true;
  }

  function updateModelOptions() {
    const selectedBrand = quoteBrand.value;
    const models = quoteModels[selectedBrand] || [];

    quoteModel.innerHTML = "";

    if (!models.length) {
      quoteModel.innerHTML = `
        <option value="">
          Primero selecciona una marca
        </option>
      `;

      return;
    }

    quoteModel.innerHTML = `
      <option value="">
        Selecciona un modelo
      </option>

      ${models
        .map(
          (model) => `
            <option value="${model}">
              ${model}
            </option>
          `
        )
        .join("")}
    `;
  }

  function prepareQuoteResult() {
    const formData = new FormData(quoteForm);

    const quoteData = Object.fromEntries(
      formData.entries()
    );

    console.log(
      "Solicitud de cotización preparada:",
      quoteData
    );

    quoteSteps.forEach((step) => {
      step.hidden = true;
    });

    quoteNavigation.hidden = true;
    quoteSuccess.hidden = false;

    /*
      En este punto se puede conectar el formulario con:

      - WhatsApp
      - Power Automate
      - n8n
      - API de cotización
      - Salesforce
      - Correo electrónico
    */
  }

  quoteBrand.addEventListener(
    "change",
    updateModelOptions
  );

  quoteNext.addEventListener("click", () => {
    if (!validateCurrentQuoteStep()) {
      return;
    }

    if (currentQuoteStep < quoteSteps.length) {
      currentQuoteStep += 1;
      updateQuoteStep();

      quoteForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      return;
    }

    prepareQuoteResult();
  });

  quoteBack.addEventListener("click", () => {
    if (currentQuoteStep > 1) {
      currentQuoteStep -= 1;
      updateQuoteStep();
    }
  });

  restartQuote.addEventListener("click", () => {
    quoteForm.reset();

    currentQuoteStep = 1;

    quoteSuccess.hidden = true;
    quoteNavigation.hidden = false;

    updateModelOptions();
    updateQuoteStep();
  });

  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  updateModelOptions();
  updateQuoteStep();
}

/* =========================================================
   BOTONES DE FINANCIAMIENTO
   ========================================================= */

document
  .querySelectorAll("[data-finance-choice]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.financeChoice;

      const financeValues = {
        paccar: "PACCAR Financial",
        paclease: "PacLease",
        comparar: "Comparar"
      };

      const selectedValue = financeValues[choice];

      const financingRadio = document.querySelector(
        `input[name="financiamiento"][value="${selectedValue}"]`
      );

      if (financingRadio) {
        financingRadio.checked = true;
      }

      document
        .querySelector("#cotizador")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
    });
  });