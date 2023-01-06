//recuperar datos
let homejs = document.getElementById("cards-section")
const search = document.getElementById('search-place')
const check = document.getElementById("category-place")

function createCards(lista){
    let cardsFunct = ""
    for (let walk of lista){
            let template =  `
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

renderTemplate (createCards(data.events), homejs)

//Funcion para filtrar categorias

const sinRepetir = []
const categorias = data.events.map(events => events.category)//siempre olvido q es map

categorias.forEach(categorias => {
    if (!sinRepetir.includes (categorias)){
        sinRepetir.push (categorias)}
    })
    
//Creacion de los botones checkbox
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
    check.innerHTML = generarCheckbox(sinRepetir)
    //inner para pasar checks a pantaia
    let checkbuttons = document.querySelectorAll(".form-check-input")

//funcion para el filtro de los check
    function checkFilter (touchs, categoriesList){
        let values = [];
        for (let touch of touchs){
            if (touch.checked)
            values.push(touch.value.toLowerCase())
        }
        let filters = categoriesList.filter(food => values.includes(food.category.toLowerCase()))
        if (values.length === 0){
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
    const filterEquis = categoriesList.filter(pEquis => {
        return pEquis.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
    });
    return filterEquis
}
// funcion del filtro cruzado
function filtroCruzado(evento){
    const filterPerFind = searchFilter (search, data.events)
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