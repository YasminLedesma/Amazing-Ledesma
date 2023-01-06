//enlazo html y js---vienen de html
let homejs = document.getElementById("cards-section")
const search = document.getElementById('search-place')
const check = document.getElementById("category-place")

//funcion para filtrar las cards
const upcoming = data.events.filter(objetoData => objetoData.date > data.currentDate)

//crear cards
function createCards(lista){
    let cardsFunct = ""
    for (let walk of lista){
        
            let template =  
                `
                <div class="card" style="width: 16rem;">
                <img src="${walk.image}" class="card-img-top" alt="${walk.name}">
                    <div class="card-body">
                    <h5 class="card-title">${walk.name}</h5>
                    <p class="card-text">${walk.date}</p>
                    <p class="card-text">${walk.category}</p>
                    <p class="card-text">${walk.place}</p>
                    <div class="abajocard">
                    <p class="card-text">USD ${walk.price}</p>
                    <a href="./details.html?idUrl=${walk._id}" class="btn btn-secondary">View More</a>
                    </div>
                </div>
                </div> `
    cardsFunct += template
        
    }
    return cardsFunct
}
renderTemplate (createCards(upcoming), homejs)

//Funcion para filtrar categorias
const sinRepetir = [] 
const categorias = upcoming.map(events => events.category)

//const
categorias.forEach(categorias => {
    if (!sinRepetir.includes (categorias)){
        sinRepetir.push (categorias)}
    })
    
//Creacion de los checkbox
    function generarCheckbox (categorias){
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
    check.innerHTML = generarCheckbox(sinRepetir)


//funcion para el filtro de los check
    function checkFilter (touchs, categoriesList){
        let valuesCheck = []; 
        for (let touch of touchs){ 
            if (touch.checked)
            valuesCheck.push(touch.value.toLowerCase())
        }
        let filters = categoriesList.filter(pEquis => valuesCheck.includes(pEquis.category.toLowerCase()))
        if (valuesCheck.length === 0){
            return categoriesList
        }
        else{
            return filters
        }
    }
    check.addEventListener('change', filtroCruzado)
    

//funcion para el filtro del search
search.addEventListener( 'input', filtroCruzado)

function searchFilter(inputFind, categoriesList){
    const filterSequis = categoriesList.filter(paramEquis => {
        return paramEquis.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
    });
    return filterSequis
}
// funcion del filtro cruzado
function filtroCruzado(evento){
  let checkbuttons = document.querySelectorAll(".form-check-input")
    const filterPerFind = searchFilter (search, upcoming)
    const filterPerCheack = checkFilter (checkbuttons, filterPerFind)
    if(filterPerCheack.length === 0) {
        let alert = `<h3 class="alert">Is Not Found</h3>`
        renderTemplate(alert, homejs)
    }
    else {
        renderTemplate(createCards(filterPerCheack), homejs)
    }
}
//funcion del rendertemplate
function renderTemplate(template, ubicacion){
    ubicacion.innerHTML = template
}

filtroCruzado()