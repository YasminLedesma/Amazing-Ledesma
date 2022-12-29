function upcomingEvents (eventos){
  for (let evento of eventos){
      if(evento.date <= data.currentDate){
          console.log(evento.name)
          console.log(evento.date)
          console.log(evento.description)
          console.log(evento.category)
          console.log(evento.place)
          console.log(evento.capacity)
          console.log(evento.estimate)
          console.log(evento.price)
      }
      console.log(" ")
  }
}
upcomingEvents(data.events)

let where = document.getElementById("cards-section")

function eventsForCards(lists, direction){
    let allCards = ""
        for (let recorrido of lists){
        if (recorrido.date >= data.currentDate){
         let template =
          `<div class="card" style="width: 18rem;">
            <img src="${recorrido.image}" class="card-img-top" alt="${recorrido.name}">
            <div class="card-body">
            <h5 class="card-title">${recorrido.name}</h5>
            <p>${recorrido.date}</p>
            <p class="card-text">${recorrido.description}</p>
            <div class="botcard">
            <p>Price: ${recorrido.price}</p>
            <a href="./details.html" class="card-link">details</a>
            </div>
            </div>
            </div>`
    allCards += template
        }
  }
  console.log(direction)
  direction.innerHTML = allCards
}

eventsForCards(data.events, where)