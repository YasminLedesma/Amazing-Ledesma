//enlazar
let $stat1 = document.getElementById("body1")//frankenstein 
let $stat2 = document.getElementById("body2")//upcom
let $stat3 = document.getElementById("body3")//past

let data; //info

fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then(data => data.json())
.then(datos => {
    data = datos
    generadorDeTRPast (data, $stat3) //tabla past (colum)
    generadorDeTRUpcoming (data, $stat2) //tabla upcom (colum)
    mayorCapacity(data.events) 
    let filtro = armadoDeNuevaLista(data)
    imprimirMayorPorcentaje(filtro)
    imprimirMenorPorcentaje(filtro)
})
.catch(err => err.message)

// Generar los TR del past-----
function generadorDeTRPast(losDatos, ubicacion){
    let pastEvents = losDatos.events.filter(evento => evento.date < losDatos.currentDate)
    let template2 = ""
    for (let past of pastEvents){
        template2 += 
    `<tr>
        <td>${past.category}</td>
        <td>$ ${multiplicacion(past.assistance, past.price)}</td>
        <td>${porcentaje(past.capacity, past.assistance)}%</td>
    </tr>`
    }
    ubicacion.innerHTML = template2
}

// GENERAR TR---> UPCOMING
function generadorDeTRUpcoming(losDatos, ubicacion){
        let upcomingEvents = losDatos.events.filter(evento => evento.date > losDatos.currentDate)
        let template1 = ""
        for (let up of upcomingEvents){
            template1 += 
        `<tr>
            <td>${up.category}</td>
            <td>$ ${multiplicacion(up.estimate, up.price)}</td>
            <td>${porcentaje(up.capacity, up.estimate)}%</td>
        </tr>`
        }
        ubicacion.innerHTML = template1
}

//FUNCTION MULTIPLICAR
// dato1= capacidad
// dato2= asistencia
function multiplicacion(dato1, dato2){
    return (dato1 * dato2).toLocaleString()
}

//FUNCTION PORCENTAJE %
// dato1= capacidad
// dato2= asistencia
function porcentaje(dato1, dato2){
    return ( dato2 / (dato1/100) ).toFixed(2)
}

//FRANKENSTEIN= evento mayor capacidad (SIEMPRE b mayor q a)
function mayorCapacity (eventos){
    let mayorCapacity = eventos.sort((a,b) => b.capacity - a.capacity) //ordene con sort mayor a menor capacidad
    document.getElementById ("eventomayor").innerHTML = mayorCapacity[0].name 
}

//Frankenstein= formula de todo--- porcentaje
function armadoDeNuevaLista(datos){
let nuevaLista = [];
    for (let i = 0; i < datos.events.length; i++) { //for xq no sabemos cuantos son
        nuevaLista.push(datos.events[i]);
        nuevaLista[i].percentage = porcentaje(nuevaLista[i].capacity, (nuevaLista[i].assistance ?? nuevaLista[i].estimate));
    }
    console.log(nuevaLista)//no necesary
    return nuevaLista.sort((a,b) => b.percentage - a.percentage)
}

//FRANKENSTEIN
//imprimir mayor porcentaje
function imprimirMayorPorcentaje(nuevoEvento){
    document.getElementById("mayorporcentaje").innerHTML = `${nuevoEvento[0].name} ${nuevoEvento[0].percentage}`
}
//imprimir menor porcentaje
function imprimirMenorPorcentaje(nuevoEvento){
    document.getElementById("menorporcentaje").innerHTML = `${nuevoEvento[nuevoEvento.length-1].name} ${nuevoEvento[nuevoEvento.length-1].percentage}`
}