//enlazo
let cadenaParametroUrl = location.search;//dire de tarjetas
let parametros = new URLSearchParams(cadenaParametroUrl);//para vincular, new palabra reservada crea objeto
let idCard = parametros.get("idUrl");//vincular tarjetas con id unico(c/u)

let contenedor = document.getElementById("detail-place");

let propiedadEvents = data.events;

let cardEncontrada = propiedadEvents.find(
  (propiedadEvents) => propiedadEvents._id == idCard
);


function detailCard(propiedadEvents) {
  contenedor.innerHTML = "";
  let asistencia = "";
  if(propiedadEvents.assistance){
  asistencia= `
    <dt>Assistance:</dt>
      <dd>${propiedadEvents.assistance}</dd>`
  } else {
    asistencia= `
    <dt>Estimate:</dt>
      <dd>${propiedadEvents.estimate}</dd>`
  }
  let template = 
  `<div class="container-img-details">
  <img  class="detailed-img" src="${propiedadEvents.image}" alt="${propiedadEvents.name}">
  </div>
  <div class="container-text-card">
  <section class="detailed-descrip p-4 staylist">
      
      <dl>
      <h2 class="text-center">${propiedadEvents.name}</h2>
          <dt>Date:</dt>
          <dd>${propiedadEvents.date}</dd>

          <dt>Description:</dt>
          <dd>${propiedadEvents.description}</dd>
          <dt>Category:</dt>
          <dd>${propiedadEvents.category}</dd>
          <dt>Place:</dt>
          <dd>${propiedadEvents.place}</dd>
          <div class="d-flex  justify-content-between flex-wrap">
          <div>
          <dt>Capacity:</dt>
          <dd>${propiedadEvents.capacity}</dd>
          </div>
          <div>
          ${asistencia}
          </div>
          <div>
          <dt>Price:</dt>
          <dd>USD ${propiedadEvents.price}</dd>
          </div>
          </div>
      </dl>
  </section>
  </div>`;

  contenedor.innerHTML = template;
}

detailCard(cardEncontrada);