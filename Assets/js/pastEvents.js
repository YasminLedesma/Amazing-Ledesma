//enlazo html y js---vienen de html
let $cards = document.getElementById("cards-section")
const $search = document.getElementById('search-place')
const $check = document.getElementById("category-place")

let pastEvent; //todo, toda la info
let past

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(data => data.json())
.then(data => {
    pastEvent = data
    past = pastEvent.events.filter(objetoData => objetoData.date < pastEvent.currentDate)
    renderTemplate (createCards(past), $cards)
    $check.innerHTML = generarCheckbox(pastEvent.events)
    $search.addEventListener( 'input', filtroCruzado)
    $check.addEventListener('change', filtroCruzado)
})
.catch(err => console.log(err))

//funcion para filtrar las cards
//const pastEvent = data.events.filter(objetoData => objetoData.date > data.currentDate)

//crear cards
function createCards(eventos){
    let cardsFunct = ""
    for (let evento of eventos){
            let template =  
                `<div class="card" style="width: 16rem;">
                <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
                    <div class="card-body">
                    <h5 class="card-title">${evento.name}</h5>
                    <p class="card-text">${evento.date}</p>
                    <p class="card-text">${evento.category}</p>
                    <p class="card-text">${evento.place}</p>
                    <div class="abajocard">
                    <p class="card-text">USD ${evento.price}</p>
                    <a href="./details.html?idUrl=${evento._id}" class="btn btn-secondary">View More</a>
                    </div>
                </div>
                </div> `
    cardsFunct += template
        
    }
    return cardsFunct
}
/*renderTemplate (createCards(pastEvent), $cards)

//Funcion para filtrar categorias
const sinRepetir = [] 
const categorias = pastEvent.map(events => events.category)

//const
categorias.forEach(categorias => {
    if (!sinRepetir.includes (categorias)){
        sinRepetir.push (categorias)}
    })
    */

//Creacion de los checkbox
    function generarCheckbox (info){
        const categorias= new Set(info.map(infoEvent=> infoEvent.category))
        let template = ""
        categorias.forEach(categoria =>{
            template += `<div class="form-check form-check-inline">   
            <label class="form-check-label">${categoria}
            <input class="form-check-input" type="checkbox" value="${categoria}">
            </label>
            </div>`
        })
        return template
    }
    //inner para pasar checks a pantaia
 //   check.innerHTML = generarCheckbox(sinRepetir)


//funcion para el filtro de los check
    function checkFilter (touchs, categoriesList){
        let valuesCheck = []; 
        for (let touch of touchs){ 
            if (touch.checked){
            valuesCheck.push(touch.value.toLowerCase())}
        }
        let filters = categoriesList.filter(evento => valuesCheck.includes(evento.category.toLowerCase()))
        if (valuesCheck.length === 0){
            return categoriesList
        }
        else{
            return filters
        }
    }

//$check.addEventListener('change', filtroCruzado)
//$search.addEventListener( 'input', filtroCruzado)

//funcion para el filtro del search
function searchFilter(inputFind, categoriesList){
    const filterSequis = categoriesList.filter(evento => {
        return evento.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
    });
    return filterSequis
}
// funcion del filtro cruzado
function filtroCruzado(evento){
  let checkbuttons = document.querySelectorAll(".form-check-input")
    const filterPerFind = searchFilter ($search, past)
    const filterPerCheack = checkFilter (checkbuttons, filterPerFind)
    if(filterPerCheack.length === 0) {
        let alert = `<h3 class="alert">Is Not Found</h3>`
        renderTemplate(alert, $cards)
    }
    else {
        renderTemplate(createCards(filterPerCheack), $cards)
    }
}
//funcion del rendertemplate
function renderTemplate(template, ubicacion){
    ubicacion.innerHTML = template
}

//filtroCruzado()