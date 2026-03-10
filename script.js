// ----------------
// FASE DA LUA
// ----------------

function faseLua(){

let hoje = new Date()
let dia = hoje.getDate()

if(dia < 7) return "Lua Nova 🌑"
if(dia < 14) return "Lua Crescente 🌓"
if(dia < 21) return "Lua Cheia 🌕"
return "Lua Minguante 🌗"

}

document.getElementById("lua").innerText = faseLua()


// ----------------
// GPS AUTOMÁTICO
// ----------------

let latitude
let longitude

navigator.geolocation.getCurrentPosition(function(pos){

latitude = pos.coords.latitude
longitude = pos.coords.longitude

document.getElementById("localizacao").innerText =
"Lat: " + latitude.toFixed(2) + " | Lon: " + longitude.toFixed(2)

carregarClima()
carregarSol()

})


// ----------------
// CLIMA
// ----------------

function carregarClima(){

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)

.then(res => res.json())

.then(data => {

let temp = data.current_weather.temperature
let vento = data.current_weather.windspeed

document.getElementById("clima").innerText =
"Temperatura: " + temp + "°C | Vento: " + vento + " km/h"

calcularAtividade(temp,vento)

})

}


// ----------------
// NASCER DO SOL
// ----------------

function carregarSol(){

fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`)

.then(res => res.json())

.then(data => {

let nascer = new Date(data.results.sunrise).toLocaleTimeString()
let por = new Date(data.results.sunset).toLocaleTimeString()

document.getElementById("sol").innerText =
"Nascer: " + nascer + " | Pôr: " + por

})

}


// ----------------
// ALGORITMO PESCA
// ----------------

function calcularAtividade(temp,vento){

let score = 0
let hora = new Date().getHours()

if(hora >=5 && hora <=8) score += 3
if(hora >=17 && hora <=19) score += 3

if(temp >=20 && temp <=30) score += 2

if(vento <=10) score += 2

let resultado

if(score >=7) resultado="🎣 Excelente"
else if(score >=5) resultado="🎣 Muito Boa"
else if(score >=3) resultado="🎣 Boa"
else resultado="🎣 Fraca"

document.getElementById("pesca").innerText = resultado

}


// ----------------
// TABELA SOLUNAR
// ----------------

function tabelaSolunar(){

document.getElementById("minor1").innerText="05:10 - 06:40"
document.getElementById("major1").innerText="11:30 - 13:20"
document.getElementById("minor2").innerText="17:40 - 18:40"
document.getElementById("major2").innerText="23:50 - 01:10"

}

tabelaSolunar()


// ----------------
// REGISTRO DE PESCA
// ----------------

function salvar(){

let peixe = document.getElementById("peixe").value
let isca = document.getElementById("isca").value
let local = document.getElementById("local").value

let item = document.createElement("li")

item.innerText = peixe + " | " + isca + " | " + local

document.getElementById("lista").appendChild(item)

}
